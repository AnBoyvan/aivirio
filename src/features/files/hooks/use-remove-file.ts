import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useRemoveFile = ({
	projectId,
	parentId,
}: {
	projectId: Id<'projects'>;
	parentId?: Id<'files'>;
}) => {
	return useMutation(api.files.remove).withOptimisticUpdate(
		(localStore, args) => {
			const existingFiles = localStore.getQuery(api.files.getFolderContents, {
				projectId,
				parentId,
			});

			if (existingFiles !== undefined) {
				localStore.setQuery(
					api.files.getFolderContents,
					{ projectId, parentId },
					existingFiles.filter(file => file._id !== args.id),
				);
			}
		},
	);
};
