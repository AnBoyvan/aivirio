import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const createProjectWithConversation = mutation({
	args: {
		internalKey: v.string(),
		projectName: v.string(),
		conversationTitle: v.string(),
		ownerId: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const now = Date.now();

		const projectId = await ctx.db.insert('projects', {
			name: args.projectName,
			ownerId: args.ownerId,
			updatedAt: now,
		});

		const conversationId = await ctx.db.insert('conversations', {
			projectId,
			title: args.conversationTitle,
			updatedAt: now,
		});

		return { projectId, conversationId };
	},
});
