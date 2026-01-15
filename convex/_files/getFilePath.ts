import { v } from 'convex/values';

import { verifyAuth } from '@/convex/auth';

import type { Doc, Id } from '../_generated/dataModel';
import { query } from '../_generated/server';

export const getFilePath = query({
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

		const path: { _id: string; name: string }[] = [];

		let currentId: Id<'files'> | undefined = args.id;

		while (currentId) {
			const file = (await ctx.db.get('files', currentId)) as
				| Doc<'files'>
				| undefined;

			if (!file) break;

			path.unshift({ _id: file._id, name: file.name });
			currentId = file.parentId;
		}

		return path;
	},
});
