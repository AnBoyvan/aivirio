import { verifyAuth } from '@/convex/auth';

import { query } from '../_generated/server';

export const get = query({
	args: {},
	handler: async ctx => {
		const identity = await verifyAuth(ctx);

		return await ctx.db
			.query('projects')
			.withIndex('by_owner', q => q.eq('ownerId', identity.subject))
			.order('desc')
			.collect();
	},
});
