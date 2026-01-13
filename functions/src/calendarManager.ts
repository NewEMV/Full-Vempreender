import * as functions from 'firebase-functions';
import { google } from 'googleapis';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';

const corsHandler = cors({ origin: true });
const app = express();
app.use(corsHandler);

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp();
}

// Initialize Google Calendar API
const calendar = google.calendar('v3');

/**
 * Get authenticated Calendar client using Service Account
 */
async function getCalendarAuth() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    return await auth.getClient();
}

/**
 * POST /calendar/create
 * Create a new calendar event
 * Body: { userId, title, description, start, end, attendees }
 */
app.post('/create', async (req, res) => {
    try {
        const { userId, title, description, start, end, attendees, calendarId } = req.body;

        if (!title || !start || !end) {
            return res.status(400).json({ error: 'Missing required fields: title, start, end' });
        }

        const auth = await getCalendarAuth();
        const targetCalendar = calendarId || process.env.DEFAULT_CALENDAR_ID || 'primary';

        const event = {
            summary: title,
            description: description || '',
            start: {
                dateTime: start,
                timeZone: 'America/Sao_Paulo',
            },
            end: {
                dateTime: end,
                timeZone: 'America/Sao_Paulo',
            },
            attendees: attendees || [],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'popup', minutes: 30 },
                ],
            },
        };

        const response = await calendar.events.insert({
            auth: auth as any,
            calendarId: targetCalendar,
            requestBody: event,
            sendUpdates: 'all',
        });

        // Save event reference in Firestore
        if (userId) {
            await admin.firestore()
                .collection('users')
                .doc(userId)
                .collection('calendarEvents')
                .doc(response.data.id!)
                .set({
                    eventId: response.data.id,
                    title,
                    start,
                    end,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });
        }

        return res.status(200).json({
            success: true,
            eventId: response.data.id,
            htmlLink: response.data.htmlLink,
            event: response.data,
        });
    } catch (error: any) {
        console.error('Error creating calendar event:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * GET /calendar/available
 * List available time slots
 * Query params: date (YYYY-MM-DD), duration (minutes), calendarId
 */
app.get('/available', async (req, res) => {
    try {
        const { date, duration = 60, calendarId } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Missing required parameter: date' });
        }

        const auth = await getCalendarAuth();
        const targetCalendar = (calendarId as string) || process.env.DEFAULT_CALENDAR_ID || 'primary';

        // Define time range for the day (9 AM - 6 PM)
        const startOfDay = new Date(`${date}T09:00:00-03:00`);
        const endOfDay = new Date(`${date}T18:00:00-03:00`);

        // Get existing events
        const response = await calendar.events.list({
            auth: auth as any,
            calendarId: targetCalendar,
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const busySlots = response.data.items?.map((event) => ({
            start: event.start?.dateTime,
            end: event.end?.dateTime,
        })) || [];

        // Calculate available slots
        const slotDuration = parseInt(duration as string);
        const availableSlots = [];
        let currentTime = startOfDay;

        while (currentTime < endOfDay) {
            const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);

            if (slotEnd > endOfDay) break;

            // Check if slot conflicts with busy times
            const isAvailable = !busySlots.some((busy) => {
                const busyStart = new Date(busy.start!);
                const busyEnd = new Date(busy.end!);
                return (
                    (currentTime >= busyStart && currentTime < busyEnd) ||
                    (slotEnd > busyStart && slotEnd <= busyEnd) ||
                    (currentTime <= busyStart && slotEnd >= busyEnd)
                );
            });

            if (isAvailable) {
                availableSlots.push({
                    start: currentTime.toISOString(),
                    end: slotEnd.toISOString(),
                    startTime: currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                    endTime: slotEnd.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                });
            }

            // Move to next slot (30 min intervals)
            currentTime = new Date(currentTime.getTime() + 30 * 60000);
        }

        return res.status(200).json({
            success: true,
            date,
            availableSlots,
            totalSlots: availableSlots.length,
        });
    } catch (error: any) {
        console.error('Error fetching available slots:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * PATCH /calendar/update/:eventId
 * Update an existing calendar event
 * Body: { title, description, start, end }
 */
app.patch('/update/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const { title, description, start, end, calendarId } = req.body;

        const auth = await getCalendarAuth();
        const targetCalendar = calendarId || process.env.DEFAULT_CALENDAR_ID || 'primary';

        // Get existing event
        const existingEvent = await calendar.events.get({
            auth: auth as any,
            calendarId: targetCalendar,
            eventId,
        });

        // Update event
        const updatedEvent = {
            ...existingEvent.data,
            summary: title || existingEvent.data.summary,
            description: description || existingEvent.data.description,
            start: start ? { dateTime: start, timeZone: 'America/Sao_Paulo' } : existingEvent.data.start,
            end: end ? { dateTime: end, timeZone: 'America/Sao_Paulo' } : existingEvent.data.end,
        };

        const response = await calendar.events.update({
            auth: auth as any,
            calendarId: targetCalendar,
            eventId,
            requestBody: updatedEvent,
            sendUpdates: 'all',
        });

        return res.status(200).json({
            success: true,
            event: response.data,
        });
    } catch (error: any) {
        console.error('Error updating calendar event:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * DELETE /calendar/cancel/:eventId
 * Cancel (delete) a calendar event
 */
app.delete('/cancel/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const { calendarId, userId } = req.query;

        const auth = await getCalendarAuth();
        const targetCalendar = (calendarId as string) || process.env.DEFAULT_CALENDAR_ID || 'primary';

        await calendar.events.delete({
            auth: auth as any,
            calendarId: targetCalendar,
            eventId,
            sendUpdates: 'all',
        });

        // Remove from Firestore if userId provided
        if (userId) {
            await admin.firestore()
                .collection('users')
                .doc(userId as string)
                .collection('calendarEvents')
                .doc(eventId)
                .delete();
        }

        return res.status(200).json({
            success: true,
            message: 'Event cancelled successfully',
        });
    } catch (error: any) {
        console.error('Error cancelling calendar event:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Export as Firebase Cloud Function
export const calendarManager = functions.https.onRequest(app);
