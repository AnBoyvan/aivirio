import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const renameFile = mutation({
	args: {
		internalKey: v.string(),
		fileId: v.id('files'),
		newName: v.string(),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const file = await ctx.db.get(args.fileId);

		if (!file) {
			throw new Error('File not found');
		}

		const siblings = await ctx.db
			.query('files')
			.withIndex('by_project_parent', q =>
				q.eq('projectId', file.projectId).eq('parentId', file.parentId),
			)
			.collect();

		const existing = siblings.find(
			sibling =>
				sibling.name === args.newName &&
				sibling.type === file.type &&
				sibling._id !== args.fileId,
		);

		if (existing) {
			throw new Error(`A ${file.type} named "${args.newName}" already exists`);
		}

		await ctx.db.patch(args.fileId, {
			name: args.newName,
			updatedAt: Date.now(),
		});

		return args.fileId;
	},
});
