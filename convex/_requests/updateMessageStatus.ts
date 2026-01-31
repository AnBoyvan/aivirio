import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const updateMessageStatus = mutation({
	args: {
		internalKey: v.string(),
		messageId: v.id('messages'),
		status: v.union(
			v.literal('processing'),
			v.literal('completed'),
			v.literal('cancelled'),
		),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		await ctx.db.patch(args.messageId, {
			status: args.status,
		});
	},
});
