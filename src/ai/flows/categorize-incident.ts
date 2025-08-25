'use server';

/**
 * @fileOverview Categorizes incident reports using GenAI.
 *
 * - categorizeIncident - A function to categorize incident reports.
 * - CategorizeIncidentInput - The input type for the categorizeIncident function.
 * - CategorizeIncidentOutput - The return type for the categorizeIncident function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeIncidentInputSchema = z.object({
  reportDescription: z
    .string()
    .describe('The description of the incident report.'),
});

export type CategorizeIncidentInput = z.infer<typeof CategorizeIncidentInputSchema>;

const CategorizeIncidentOutputSchema = z.object({
  category: z
    .enum(['Bullying', 'Theft', 'Medical Emergency', 'Other'])
    .describe('The category of the incident report.'),
});

export type CategorizeIncidentOutput = z.infer<typeof CategorizeIncidentOutputSchema>;

export async function categorizeIncident(input: CategorizeIncidentInput): Promise<CategorizeIncidentOutput> {
  return categorizeIncidentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeIncidentPrompt',
  input: {schema: CategorizeIncidentInputSchema},
  output: {schema: CategorizeIncidentOutputSchema},
  prompt: `Categorize the following incident report into one of the following categories: Bullying, Theft, Medical Emergency, Other.\n\nIncident Report Description: {{{reportDescription}}}`,
});

const categorizeIncidentFlow = ai.defineFlow(
  {
    name: 'categorizeIncidentFlow',
    inputSchema: CategorizeIncidentInputSchema,
    outputSchema: CategorizeIncidentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
