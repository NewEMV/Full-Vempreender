import * as functions from 'firebase-functions';
import { google } from 'googleapis';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';

const corsHandler = cors({ origin: true });
const app = express();
app.use(corsHandler);
app.use(express.json());

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp();
}

// Initialize Google Sheets API
const sheets = google.sheets('v4');

/**
 * Get authenticated Sheets client using Service Account
 */
async function getSheetsAuth() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return await auth.getClient();
}

/**
 * POST /sheets/create
 * Create a new spreadsheet
 * Body: { title, userId }
 */
app.post('/create', async (req, res) => {
    try {
        const { title, userId } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Missing required field: title' });
        }

        const auth = await getSheetsAuth();

        const response = await sheets.spreadsheets.create({
            auth: auth as any,
            requestBody: {
                properties: {
                    title,
                },
                sheets: [
                    {
                        properties: {
                            title: 'Leads',
                            gridProperties: {
                                rowCount: 1000,
                                columnCount: 10,
                            },
                        },
                        data: [
                            {
                                startRow: 0,
                                startColumn: 0,
                                rowData: [
                                    {
                                        values: [
                                            { userEnteredValue: { stringValue: 'Nome' } },
                                            { userEnteredValue: { stringValue: 'Contato' } },
                                            { userEnteredValue: { stringValue: 'Foco' } },
                                            { userEnteredValue: { stringValue: 'Característica' } },
                                            { userEnteredValue: { stringValue: 'Data' } },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        });

        const spreadsheetId = response.data.spreadsheetId!;

        // Save spreadsheet reference in Firestore
        if (userId) {
            await admin.firestore()
                .collection('users')
                .doc(userId)
                .update({
                    spreadsheetId,
                    spreadsheetUrl: response.data.spreadsheetUrl,
                });
        }

        return res.status(200).json({
            success: true,
            spreadsheetId,
            spreadsheetUrl: response.data.spreadsheetUrl,
        });
    } catch (error: any) {
        console.error('Error creating spreadsheet:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * GET /sheets/read
 * Read data from a specific range
 * Query params: spreadsheetId, range (e.g., "Precos!A2:C50")
 */
app.get('/read', async (req, res) => {
    try {
        const { spreadsheetId, range } = req.query;

        if (!spreadsheetId || !range) {
            return res.status(400).json({ error: 'Missing required parameters: spreadsheetId, range' });
        }

        const auth = await getSheetsAuth();

        const response = await sheets.spreadsheets.values.get({
            auth: auth as any,
            spreadsheetId: spreadsheetId as string,
            range: range as string,
        });

        return res.status(200).json({
            success: true,
            range: response.data.range,
            values: response.data.values || [],
            rowCount: response.data.values?.length || 0,
        });
    } catch (error: any) {
        console.error('Error reading spreadsheet:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * POST /sheets/append
 * Append a row to a spreadsheet
 * Body: { spreadsheetId, range, values }
 */
app.post('/append', async (req, res) => {
    try {
        const { spreadsheetId, range, values } = req.body;

        if (!spreadsheetId || !range || !values) {
            return res.status(400).json({ error: 'Missing required fields: spreadsheetId, range, values' });
        }

        const auth = await getSheetsAuth();

        const response = await sheets.spreadsheets.values.append({
            auth: auth as any,
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [values],
            },
        });

        return res.status(200).json({
            success: true,
            updates: response.data.updates,
        });
    } catch (error: any) {
        console.error('Error appending to spreadsheet:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * PATCH /sheets/update
 * Update specific cells in a spreadsheet
 * Body: { spreadsheetId, range, values }
 */
app.patch('/update', async (req, res) => {
    try {
        const { spreadsheetId, range, values } = req.body;

        if (!spreadsheetId || !range || !values) {
            return res.status(400).json({ error: 'Missing required fields: spreadsheetId, range, values' });
        }

        const auth = await getSheetsAuth();

        const response = await sheets.spreadsheets.values.update({
            auth: auth as any,
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values,
            },
        });

        return res.status(200).json({
            success: true,
            updatedCells: response.data.updatedCells,
            updatedRows: response.data.updatedRows,
        });
    } catch (error: any) {
        console.error('Error updating spreadsheet:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * POST /sheets/calculate
 * Calculate values based on spreadsheet data (e.g., order total)
 * Body: { spreadsheetId, pricesRange, items: [{ product, quantity }] }
 */
app.post('/calculate', async (req, res) => {
    try {
        const { spreadsheetId, pricesRange, items } = req.body;

        if (!spreadsheetId || !pricesRange || !items) {
            return res.status(400).json({
                error: 'Missing required fields: spreadsheetId, pricesRange, items'
            });
        }

        const auth = await getSheetsAuth();

        // Fetch price table
        const pricesResponse = await sheets.spreadsheets.values.get({
            auth: auth as any,
            spreadsheetId,
            range: pricesRange,
        });

        const priceTable = pricesResponse.data.values || [];

        // Build price map (assuming format: [Product Name, Price])
        const priceMap = new Map<string, number>();
        priceTable.forEach((row: any[]) => {
            if (row.length >= 2) {
                const product = row[0]?.toString().toLowerCase().trim();
                const price = parseFloat(row[1]?.toString().replace(',', '.') || '0');
                if (product && !isNaN(price)) {
                    priceMap.set(product, price);
                }
            }
        });

        // Calculate totals
        const calculations = items.map((item: any) => {
            const productName = item.product?.toString().toLowerCase().trim();
            const quantity = parseInt(item.quantity) || 0;
            const unitPrice = priceMap.get(productName) || 0;
            const total = unitPrice * quantity;

            return {
                product: item.product,
                quantity,
                unitPrice,
                total,
                found: priceMap.has(productName),
            };
        });

        const grandTotal = calculations.reduce((sum, calc) => sum + calc.total, 0);

        return res.status(200).json({
            success: true,
            calculations,
            grandTotal,
            currency: 'BRL',
        });
    } catch (error: any) {
        console.error('Error calculating from spreadsheet:', error);
        return res.status(500).json({ error: error.message });
    }
});

/**
 * POST /sheets/saveLead
 * Save lead to user's spreadsheet (triggered by chatbot)
 * Body: { userId, leadData: { name, contact, focus, characteristic } }
 */
app.post('/saveLead', async (req, res) => {
    try {
        const { userId, leadData } = req.body;

        if (!userId || !leadData) {
            return res.status(400).json({ error: 'Missing required fields: userId, leadData' });
        }

        // Get user's spreadsheet ID from Firestore
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        const spreadsheetId = userDoc.data()?.spreadsheetId;

        if (!spreadsheetId) {
            return res.status(404).json({ error: 'User does not have a spreadsheet configured' });
        }

        const auth = await getSheetsAuth();

        // Append lead to Leads sheet
        const values = [
            leadData.name || 'Não informado',
            leadData.contact || 'Não informado',
            leadData.focus || '',
            leadData.characteristic || '',
            new Date().toLocaleString('pt-BR'),
        ];

        await sheets.spreadsheets.values.append({
            auth: auth as any,
            spreadsheetId,
            range: 'Leads!A:E',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [values],
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Lead saved successfully',
        });
    } catch (error: any) {
        console.error('Error saving lead:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Export as Firebase Cloud Function
export const sheetsManager = functions.https.onRequest(app);
