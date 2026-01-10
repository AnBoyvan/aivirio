import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { createProject } from './projects/handlers/createProject';
import { getProjects } from './projects/handlers/getProjects';

export const create = mutation({
	args: {
		name: v.string(),
	},
	handler: createProject,
});

export const get = query({
	args: {},
	handler: getProjects,
});
