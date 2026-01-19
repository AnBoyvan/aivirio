import z from 'zod';

export const suggestionSchema = z.object({
	suggestion: z
		.string()
		.describe(
			'The code to insert at cursor or empty string if no completion needed',
		),
});
