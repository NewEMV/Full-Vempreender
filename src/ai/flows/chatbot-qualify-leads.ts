// chatbot-qualify-leads.ts
'use server';

/**
 * @fileOverview A chatbot flow to qualify leads by asking key questions.
 *
 * - chatbotQualifyLeads - A function that handles the lead qualification process.
 * - ChatbotQualifyLeadsInput - The input type for the chatbotQualifyLeads function.
 * - ChatbotQualifyLeadsOutput - The return type for the chatbotQualifyLeads function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotQualifyLeadsInputSchema = z.object({
  userInput: z.string().describe('The user input to the chatbot.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'bot']),
    content: z.string(),
  })).optional().describe('The conversation history between the user and the bot.'),
});

export type ChatbotQualifyLeadsInput = z.infer<typeof ChatbotQualifyLeadsInputSchema>;

const ChatbotQualifyLeadsOutputSchema = z.object({
  chatbotResponse: z.string().describe('The response from the chatbot.'),
  isLeadQualified: z.boolean().optional().describe('Whether the lead is qualified or not.'),
  qualificationReason: z.string().optional().describe('The reason for the lead qualification status.'),
});

export type ChatbotQualifyLeadsOutput = z.infer<typeof ChatbotQualifyLeadsOutputSchema>;

export async function chatbotQualifyLeads(input: ChatbotQualifyLeadsInput): Promise<ChatbotQualifyLeadsOutput> {
  return chatbotQualifyLeadsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotQualifyLeadsPrompt',
  input: {schema: ChatbotQualifyLeadsInputSchema},
  output: {schema: ChatbotQualifyLeadsOutputSchema},
  prompt: `You are a chatbot designed to qualify leads for our services. Your goal is to engage the user in a conversation, ask key questions to understand their needs, and determine if they are a qualified lead for our sales team.

  Here are some example questions to guide the conversation:
  - What are your specific needs or pain points that our services could address?
  - What is your budget for this type of service?
  - What is your timeline for implementing a solution?

  Based on the conversation, determine if the lead is qualified. If the lead is qualified, provide a reason for the qualification. If not, explain why the lead is not qualified.

  The current user input is: {{{userInput}}}

  Here's the conversation history so far:
  {{#each conversationHistory}}
    {{#if (eq role "user")}}
      User: {{{content}}}
    {{else}}
      Chatbot: {{{content}}}
    {{/if}}
  {{/each}}

  Response:
  `, 
});

const chatbotQualifyLeadsFlow = ai.defineFlow(
  {
    name: 'chatbotQualifyLeadsFlow',
    inputSchema: ChatbotQualifyLeadsInputSchema,
    outputSchema: ChatbotQualifyLeadsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
