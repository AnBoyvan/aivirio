import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';

export const useUpdateProjectSettings = () => {
	return useMutation(api.projects.updateSettings);
};
