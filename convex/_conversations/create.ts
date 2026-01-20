import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { verifyAuth } from '../auth';

export const create = mutation({
	args: {
		projectId: v.id('projects'),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const project = await ctx.db.get('projects', args.projectId);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		const now = Date.now();

		const conversationId = await ctx.db.insert('conversations', {
			projectId: args.projectId,
			title: args.title,
			updatedAt: now,
		});

		return conversationId;
	},
});
