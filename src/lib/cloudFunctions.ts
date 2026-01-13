/**
 * API Helpers for Cloud Functions
 * Use these functions to interact with Calendar, Sheets, and Audio APIs
 */

const FUNCTIONS_BASE_URL = process.env.NEXT_PUBLIC_FUNCTIONS_URL || 'https://us-central1-cb-vempreender.cloudfunctions.net';

// ============================================
// CALENDAR API
// ============================================

export interface CalendarEvent {
    userId?: string;
    title: string;
    description?: string;
    start: string; // ISO 8601 format
    end: string; // ISO 8601 format
    attendees?: Array<{ email: string }>;
    calendarId?: string;
}

export interface AvailableSlot {
    start: string;
    end: string;
    startTime: string;
    endTime: string;
}

/**
 * Create a calendar event
 */
export async function createCalendarEvent(eventData: CalendarEvent) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/calendarManager/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Get available time slots for a specific date
 */
export async function getAvailableSlots(date: string, duration: number = 60, calendarId?: string): Promise<AvailableSlot[]> {
    const params = new URLSearchParams({ date, duration: duration.toString() });
    if (calendarId) params.append('calendarId', calendarId);

    const response = await fetch(`${FUNCTIONS_BASE_URL}/calendarManager/available?${params}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch available slots: ${response.statusText}`);
    }

    const data = await response.json();
    return data.availableSlots || [];
}

/**
 * Update an existing calendar event
 */
export async function updateCalendarEvent(eventId: string, updates: Partial<CalendarEvent>) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/calendarManager/update/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error(`Failed to update event: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Cancel a calendar event
 */
export async function cancelCalendarEvent(eventId: string, userId?: string, calendarId?: string) {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (calendarId) params.append('calendarId', calendarId);

    const response = await fetch(`${FUNCTIONS_BASE_URL}/calendarManager/cancel/${eventId}?${params}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to cancel event: ${response.statusText}`);
    }

    return await response.json();
}

// ============================================
// SHEETS API
// ============================================

export interface SpreadsheetData {
    spreadsheetId: string;
    range: string;
    values: any[][];
}

export interface CalculationItem {
    product: string;
    quantity: number;
}

/**
 * Create a new spreadsheet
 */
export async function createSpreadsheet(title: string, userId?: string) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/sheetsManager/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, userId }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create spreadsheet: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Read data from a spreadsheet range
 */
export async function readSheetRange(spreadsheetId: string, range: string) {
    const params = new URLSearchParams({ spreadsheetId, range });
    const response = await fetch(`${FUNCTIONS_BASE_URL}/sheetsManager/read?${params}`);

    if (!response.ok) {
        throw new Error(`Failed to read spreadsheet: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Append a row to a spreadsheet
 */
export async function appendToSheet(spreadsheetId: string, range: string, values: any[]) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/sheetsManager/append`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadsheetId, range, values }),
    });

    if (!response.ok) {
        throw new Error(`Failed to append to spreadsheet: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Update cells in a spreadsheet
 */
export async function updateSheetCells(spreadsheetId: string, range: string, values: any[][]) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/sheetsManager/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadsheetId, range, values }),
    });

    if (!response.ok) {
        throw new Error(`Failed to update spreadsheet: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Calculate order total from price table
 */
export async function calculateOrder(spreadsheetId: string, pricesRange: string, items: CalculationItem[]) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/sheetsManager/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadsheetId, pricesRange, items }),
    });

    if (!response.ok) {
        throw new Error(`Failed to calculate order: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Save lead to user's spreadsheet
 */
export async function saveLead(userId: string, leadData: {
    name?: string;
    contact?: string;
    focus?: string;
    characteristic?: string;
}) {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/sheetsManager/saveLead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, leadData }),
    });

    if (!response.ok) {
        throw new Error(`Failed to save lead: ${response.statusText}`);
    }

    return await response.json();
}

// ============================================
// AUDIO TRANSCRIPTION API
// ============================================

/**
 * Transcribe audio file to text
 */
export async function transcribeAudio(audioFile: File, userId?: string): Promise<string> {
    const formData = new FormData();
    formData.append('audio', audioFile);
    if (userId) formData.append('userId', userId);

    const response = await fetch(`${FUNCTIONS_BASE_URL}/audioTranscription/transcribe`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to transcribe audio: ${response.statusText}`);
    }

    const data = await response.json();
    return data.transcription;
}

/**
 * Check audio transcription service status
 */
export async function checkAudioServiceStatus() {
    const response = await fetch(`${FUNCTIONS_BASE_URL}/audioTranscription/status`);

    if (!response.ok) {
        throw new Error(`Failed to check service status: ${response.statusText}`);
    }

    return await response.json();
}
