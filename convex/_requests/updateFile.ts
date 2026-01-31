import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const updateFile = mutation({
	args: {
		internalKey: v.string(),
		fileId: v.id('files'),
		content: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const file = await ctx.db.get(args.fileId);

		if (!file) {
			throw new Error('File not found');
		}

		await ctx.db.patch(args.fileId, {
			content: args.content,
			updatedAt: Date.now(),
		});

		return args.fileId;
	},
});
