import { config } from 'dotenv';
config();

import '@/ai/flows/chatbot-qualify-leads.ts';
import '@/ai/flows/chatbot-answer-questions.ts';
import '@/ai/flows/chatbot-initial-prompt.ts';