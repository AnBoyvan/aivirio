import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

interface UseFolderContentsProps {
	projectId: Id<'projects'>;
	parentId?: Id<'files'>;
	enabled?: boolean;
}

export const useFolderContents = ({
	projectId,
	parentId,
	enabled = true,
}: UseFolderContentsProps) => {
	return useQuery(
		api.files.getFolderContents,
		enabled ? { projectId, parentId } : 'skip',
	);
};
