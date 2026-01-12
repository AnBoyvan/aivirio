import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useRenameProject = (projectId: Id<'projects'>) => {
	return useMutation(api.projects.rename).withOptimisticUpdate(
		(localStore, args) => {
			const existingProject = localStore.getQuery(api.projects.getById, {
				id: projectId,
			});

			if (existingProject !== undefined && existingProject !== null) {
				localStore.setQuery(
					api.projects.getById,
					{
						id: projectId,
					},
					{
						...existingProject,
						name: args.name,
						updatedAt: Date.now(),
					},
				);
			}

			const existingProjects = localStore.getQuery(api.projects.get);

			if (existingProjects !== undefined) {
				localStore.setQuery(
					api.projects.get,
					{},
					existingProjects.map(project => {
						return project._id === args.id
							? { ...project, name: args.name, updatedAt: Date.now() }
							: project;
					}),
				);
			}
		},
	);
};
