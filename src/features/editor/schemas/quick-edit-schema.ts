import z from 'zod';

export const quickEditSchema = z.object({
	editedCode: z
		.string()
		.describe(
			'The edited version of the selected code based on the instruction',
		),
});
