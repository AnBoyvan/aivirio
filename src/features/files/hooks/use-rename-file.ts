import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useRenameFile = () => {
	return useMutation(api.files.rename);
};
