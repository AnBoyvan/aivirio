import { z } from 'zod';

export const suggestionResponseSchema = z.object({
	suggestion: z.string(),
});

export type SuggestionResponse = z.infer<typeof suggestionResponseSchema>;
