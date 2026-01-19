import { z } from 'zod';

export const suggestionRequestSchema = z.object({
	fileName: z.string(),
	code: z.string(),
	currentLine: z.string(),
	previousLines: z.string(),
	textBeforeCursor: z.string(),
	textAfterCursor: z.string(),
	nextLines: z.string(),
	lineNumber: z.number(),
});

export type SuggestionRequest = z.infer<typeof suggestionRequestSchema>;
