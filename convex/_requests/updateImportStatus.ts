import { v } from 'convex/values';
import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const updateImportStatus = mutation({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
		status: v.optional(
			v.union(
				v.literal('importing'),
				v.literal('completed'),
				v.literal('failed'),
			),
		),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		await ctx.db.patch('projects', args.projectId, {
			importStatus: args.status,
			updatedAt: Date.now(),
		});
	},
});
