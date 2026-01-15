import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useFilePath = (fileId: Id<'files'> | null) => {
	return useQuery(api.files.getFilePath, fileId ? { id: fileId } : 'skip');
};
