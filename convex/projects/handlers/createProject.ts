import type { MutationCtx } from '../../_generated/server';

type Args = {
	name: string;
};

export const createProject = async (ctx: MutationCtx, args: Args) => {
	const identity = await ctx.auth.getUserIdentity();

	if (!identity) {
		throw new Error('Unauthorized');
	}

	await ctx.db.insert('projects', {
		name: args.name,
		ownerId: identity.subject,
	});
};
