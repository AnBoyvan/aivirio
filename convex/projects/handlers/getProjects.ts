import type { QueryCtx } from '../../_generated/server';

export const getProjects = async (ctx: QueryCtx) => {
	const identity = await ctx.auth.getUserIdentity();

	if (!identity) {
		return [];
	}

	const projects = await ctx.db
		.query('projects')
		.withIndex('by_owner', q => q.eq('ownerId', identity.subject))
		.collect();

	return projects;
};
