'use server';

/**
 * @fileOverview Initial prompt for the chatbot to greet new users and provide options.
 *
 * - chatbotInitialPrompt - A function that generates the initial chatbot greeting.
 * - ChatbotInitialPromptInput - The input type for the chatbotInitialPrompt function.
 * - ChatbotInitialPromptOutput - The return type for the chatbotInitialPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotInitialPromptInputSchema = z.object({
  userName: z.string().describe('The name of the user interacting with the chatbot.'),
});
export type ChatbotInitialPromptInput = z.infer<typeof ChatbotInitialPromptInputSchema>;

const ChatbotInitialPromptOutputSchema = z.object({
  greeting: z.string().describe('The initial greeting message from the chatbot.'),
});
export type ChatbotInitialPromptOutput = z.infer<typeof ChatbotInitialPromptOutputSchema>;

export async function chatbotInitialPrompt(input: ChatbotInitialPromptInput): Promise<ChatbotInitialPromptOutput> {
  return chatbotInitialPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotInitialPromptPrompt',
  input: {schema: ChatbotInitialPromptInputSchema},
  output: {schema: ChatbotInitialPromptOutputSchema},
  prompt: `Hello {{userName}}, welcome to Vempreender AI! I'm here to help you understand how our AI solutions can benefit your business.

To get started, you can:

1.  Ask me about our services.
2.  Inquire about pricing.
3.  Request a demo.
4.  Learn more about our AI technology.

How can I assist you today?`,
});

const chatbotInitialPromptFlow = ai.defineFlow(
  {
    name: 'chatbotInitialPromptFlow',
    inputSchema: ChatbotInitialPromptInputSchema,
    outputSchema: ChatbotInitialPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
