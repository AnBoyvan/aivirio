import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const createMessage = mutation({
	args: {
		internalKey: v.string(),
		conversationId: v.id('conversations'),
		projectId: v.id('projects'),
		role: v.union(v.literal('user'), v.literal('assistant')),
		content: v.string(),
		status: v.optional(
			v.union(
				v.literal('processing'),
				v.literal('completed'),
				v.literal('cancelled'),
			),
		),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const messageId = await ctx.db.insert('messages', {
			conversationId: args.conversationId,
			projectId: args.projectId,
			role: args.role,
			content: args.content,
			status: args.status,
		});

		await ctx.db.patch(args.conversationId, {
			updatedAt: Date.now(),
		});

		return messageId;
	},
});
