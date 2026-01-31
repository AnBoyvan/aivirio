import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const updateConversationTitle = mutation({
	args: {
		internalKey: v.string(),
		conversationId: v.id('conversations'),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		await ctx.db.patch(args.conversationId, {
			title: args.title,
			updatedAt: Date.now(),
		});
	},
});
