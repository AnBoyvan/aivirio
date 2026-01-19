import z from 'zod';

export const editRequestSchema = z.object({
	selectedCode: z.string(),
	fullCode: z.string(),
	instruction: z.string(),
});

export type EditRequest = z.infer<typeof editRequestSchema>;
