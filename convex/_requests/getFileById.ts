import { v } from 'convex/values';

import { query } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const getFileById = query({
	args: {
		internalKey: v.string(),
		fileId: v.id('files'),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		return await ctx.db.get(args.fileId);
	},
});
