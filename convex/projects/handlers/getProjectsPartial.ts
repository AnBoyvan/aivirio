import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { query } from '../../_generated/server';

export const getProjectsPartial = query({
	args: {
		limit: v.number(),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		return await ctx.db
			.query('projects')
			.withIndex('by_owner', q => q.eq('ownerId', identity.subject))
			.order('desc')
			.take(args.limit);
	},
});
