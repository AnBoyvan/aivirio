import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const cleanup = mutation({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const files = await ctx.db
			.query('files')
			.withIndex('by_project', q => q.eq('projectId', args.projectId))
			.collect();

		for (const file of files) {
			if (file.storageId) {
				await ctx.storage.delete(file.storageId);
			}

			await ctx.db.delete(file._id);
		}

		return { deleted: files.length };
	},
});
