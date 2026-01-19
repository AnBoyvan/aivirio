import z from 'zod';

export const editResponseSchema = z.object({
	editedCode: z.string(),
});

export type EditResponse = z.infer<typeof editResponseSchema>;
