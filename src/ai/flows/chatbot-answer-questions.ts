'use server';

/**
 * @fileOverview Implements a chatbot flow that answers user questions about the service.
 *
 * - chatbotAnswerQuestions - A function that handles the chatbot question answering process.
 * - ChatbotAnswerQuestionsInput - The input type for the chatbotAnswerQuestions function.
 * - ChatbotAnswerQuestionsOutput - The return type for the chatbotAnswerQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAnswerQuestionsInputSchema = z.object({
  question: z.string().describe('The user\u0027s question about the service.'),
});

export type ChatbotAnswerQuestionsInput = z.infer<
  typeof ChatbotAnswerQuestionsInputSchema
>;

const ChatbotAnswerQuestionsOutputSchema = z.object({
  answer: z.string().describe('The chatbot\u0027s answer to the question.'),
});

export type ChatbotAnswerQuestionsOutput = z.infer<
  typeof ChatbotAnswerQuestionsOutputSchema
>;

export async function chatbotAnswerQuestions(
  input: ChatbotAnswerQuestionsInput
): Promise<ChatbotAnswerQuestionsOutput> {
  return chatbotAnswerQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAnswerQuestionsPrompt',
  input: {schema: ChatbotAnswerQuestionsInputSchema},
  output: {schema: ChatbotAnswerQuestionsOutputSchema},
  prompt: `You are a chatbot designed to answer questions about our service.

  Question: {{{question}}}

  Answer:`,
});

const chatbotAnswerQuestionsFlow = ai.defineFlow(
  {
    name: 'chatbotAnswerQuestionsFlow',
    inputSchema: ChatbotAnswerQuestionsInputSchema,
    outputSchema: ChatbotAnswerQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
