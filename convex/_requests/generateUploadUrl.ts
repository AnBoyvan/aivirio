import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const generateUploadUrl = mutation({
	args: {
		internalKey: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);
		return await ctx.storage.generateUploadUrl();
	},
});
