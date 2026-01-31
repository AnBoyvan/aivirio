import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const updateExportStatus = mutation({
	args: {
		internalKey: v.string(),
		projectId: v.id('projects'),
		status: v.optional(
			v.union(
				v.literal('exporting'),
				v.literal('completed'),
				v.literal('failed'),
				v.literal('cancelled'),
			),
		),
		repoUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		await ctx.db.patch('projects', args.projectId, {
			exportStatus: args.status,
			exportRepoUrl: args.repoUrl,
			updatedAt: Date.now(),
		});
	},
});
