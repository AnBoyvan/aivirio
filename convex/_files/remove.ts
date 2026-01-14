import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import type { Id } from '../_generated/dataModel';
import { mutation } from '../_generated/server';

export const remove = mutation({
	args: {
		id: v.id('files'),
	},
	handler: async (ctx, args) => {
		const identity = await verifyAuth(ctx);

		const file = await ctx.db.get('files', args.id);

		if (!file) {
			throw new Error('File not found');
		}

		const project = await ctx.db.get('projects', file.projectId);

		if (!project) {
			throw new Error('Project not found');
		}

		if (project.ownerId !== identity.subject) {
			throw new Error('Unauthorized access to this project');
		}

		const deleteRecursive = async (fileId: Id<'files'>) => {
			const item = await ctx.db.get('files', fileId);

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

			await ctx.db.delete('files', fileId);
		};

		await deleteRecursive(args.id);

		await ctx.db.patch('projects', file.projectId, {
			updatedAt: Date.now(),
		});
	},
});
