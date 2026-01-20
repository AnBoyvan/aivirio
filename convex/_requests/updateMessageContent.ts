import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const updateMessageContent = mutation({
	args: {
		internalKey: v.string(),
		messageId: v.id('messages'),
		content: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		await ctx.db.patch(args.messageId, {
			content: args.content,
			status: 'completed' as const,
		});
	},
});
