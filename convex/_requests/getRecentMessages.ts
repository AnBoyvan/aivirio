import { v } from 'convex/values';

import { query } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const getRecentMessages = query({
	args: {
		internalKey: v.string(),
		conversationId: v.id('conversations'),
		limit: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const messages = await ctx.db
			.query('messages')
			.withIndex('by_conversation', q =>
				q.eq('conversationId', args.conversationId),
			)
			.order('asc')
			.collect();

		const limit = args.limit ?? 10;
		return messages.slice(-limit);
	},
});
