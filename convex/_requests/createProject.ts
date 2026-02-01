import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const createProject = mutation({
	args: {
		internalKey: v.string(),
		name: v.string(),
		ownerId: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const projectId = await ctx.db.insert('projects', {
			name: args.name,
			ownerId: args.ownerId,
			updatedAt: Date.now(),
			importStatus: 'importing',
		});

		return projectId;
	},
});
