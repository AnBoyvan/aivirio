import { v } from 'convex/values';

import { query } from '../_generated/server';
import { verifyAuth } from '../auth';

export const getById = query({
	args: {
		id: v.id('conversations'),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const conversation = await ctx.db.get('conversations', args.id);

		if (!conversation) {
			throw new Error('Conversation not found');
		}

		const project = await ctx.db.get('projects', conversation.projectId);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		return conversation;
	},
});
