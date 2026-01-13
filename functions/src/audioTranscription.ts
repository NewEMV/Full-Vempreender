import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import { SpeechClient } from '@google-cloud/speech';
import * as busboy from 'busboy';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

const corsHandler = cors({ origin: true });
const app = express();
app.use(corsHandler);

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp();
}

// Initialize Speech-to-Text client
const speechClient = new SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

/**
 * POST /audio/transcribe
 * Transcribe audio file to text
 * Accepts: multipart/form-data with audio file
 */
app.post('/transcribe', (req, res) => {
    const bb = busboy({ headers: req.headers });
    const tmpdir = os.tmpdir();
    const uploads: { [key: string]: any } = {};
    const fields: { [key: string]: string } = {};

    // Handle file upload
    bb.on('file', (fieldname, file, info) => {
        const { filename } = info;
        const filepath = path.join(tmpdir, filename);
        uploads[fieldname] = { filepath, filename };

        file.pipe(fs.createWriteStream(filepath));
    });

    // Handle form fields
    bb.on('field', (fieldname, value) => {
        fields[fieldname] = value;
    });

    // Process after upload completes
    bb.on('finish', async () => {
        try {
            const audioFile = uploads['audio'];

            if (!audioFile) {
                return res.status(400).json({ error: 'No audio file provided' });
            }

            // Read audio file
            const audioBytes = fs.readFileSync(audioFile.filepath);

            // Determine encoding based on file extension
            const ext = path.extname(audioFile.filename).toLowerCase();
            let encoding: any = 'WEBM_OPUS';

            if (ext === '.mp3') encoding = 'MP3';
            else if (ext === '.wav') encoding = 'LINEAR16';
            else if (ext === '.ogg') encoding = 'OGG_OPUS';

            // Configure speech-to-text request
            const request = {
                audio: {
                    content: audioBytes.toString('base64'),
                },
                config: {
                    encoding,
                    sampleRateHertz: 16000,
                    languageCode: process.env.SPEECH_LANGUAGE_CODE || 'pt-BR',
                    enableAutomaticPunctuation: true,
                    model: 'default',
                },
            };

            // Perform transcription
            const [response] = await speechClient.recognize(request);

            const transcription = response.results
                ?.map((result) => result.alternatives?.[0]?.transcript)
                .join('\n') || '';

            // Clean up temp file
            fs.unlinkSync(audioFile.filepath);

            if (!transcription) {
                return res.status(400).json({
                    error: 'Could not transcribe audio. Please ensure audio is clear and in Portuguese.'
                });
            }

            // Save transcription to Firestore if userId provided
            if (fields.userId) {
                await admin.firestore()
                    .collection('users')
                    .doc(fields.userId)
                    .collection('transcriptions')
                    .add({
                        transcription,
                        filename: audioFile.filename,
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });
            }

            return res.status(200).json({
                success: true,
                transcription,
                confidence: response.results?.[0]?.alternatives?.[0]?.confidence || 0,
            });
        } catch (error: any) {
            console.error('Error transcribing audio:', error);

            // Clean up temp files on error
            Object.values(uploads).forEach((upload: any) => {
                if (fs.existsSync(upload.filepath)) {
                    fs.unlinkSync(upload.filepath);
                }
            });

            return res.status(500).json({ error: error.message });
        }
    });

    bb.end(req.rawBody || req.body);
});

/**
 * GET /audio/status
 * Health check endpoint
 */
app.get('/status', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'Audio Transcription',
        status: 'online',
        supportedFormats: ['mp3', 'wav', 'ogg', 'webm'],
    });
});

// Export as Firebase Cloud Function
export const audioTranscription = functions.https.onRequest(app);
