import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { verifyAuth } from '../auth';

export const updateSettings = mutation({
	args: {
		id: v.id('projects'),
		settings: v.object({
			installCommand: v.optional(v.string()),
			devCommand: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const project = await ctx.db.get('projects', args.id);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		await ctx.db.patch('projects', args.id, {
			settings: args.settings,
			updatedAt: Date.now(),
		});
	},
});
