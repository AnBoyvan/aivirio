import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

import { sortFiles } from '../utils/sort-files';

export const useRenameFile = ({
	projectId,
	parentId,
}: {
	projectId: Id<'projects'>;
	parentId?: Id<'files'>;
}) => {
	return useMutation(api.files.rename).withOptimisticUpdate(
		(localStore, args) => {
			const existingFiles = localStore.getQuery(api.files.getFolderContents, {
				projectId,
				parentId,
			});

			if (existingFiles !== undefined) {
				const updatedFiles = existingFiles.map(file =>
					file._id === args.id ? { ...file, name: args.newName } : file,
				);

				localStore.setQuery(
					api.files.getFolderContents,
					{ projectId, parentId },
					sortFiles(updatedFiles),
				);
			}
		},
	);
};
