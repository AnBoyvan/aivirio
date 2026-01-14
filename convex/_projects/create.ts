import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import { mutation } from '../_generated/server';

export const create = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const projectId = await ctx.db.insert('projects', {
			name: args.name,
			ownerId: identity.subject,
			updatedAt: Date.now(),
		});

		return projectId;
	},
});
