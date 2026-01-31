import { v } from 'convex/values';

import { mutation } from '../_generated/server';
import { validateInternalKey } from './validateInternalKey';

export const removeFile = mutation({
	args: {
		internalKey: v.string(),
		fileId: v.id('files'),
	},
	handler: async (ctx, args) => {
		validateInternalKey(args.internalKey);

		const file = await ctx.db.get(args.fileId);

		if (!file) {
			throw new Error('File not found');
		}

		const deleteRecursive = async (fileId: typeof args.fileId) => {
			const item = await ctx.db.get(fileId);

			if (!item) {
				return;
			}

			if (item.type === 'folder') {
				const children = await ctx.db
					.query('files')
					.withIndex('by_project_parent', q =>
						q.eq('projectId', item.projectId).eq('parentId', fileId),
					)
					.collect();

				for (const child of children) {
					await deleteRecursive(child._id);
				}
			}

			if (item.storageId) {
				await ctx.storage.delete(item.storageId);
			}

			await ctx.db.delete(fileId);
		};

		await deleteRecursive(args.fileId);

		return args.fileId;
	},
});
