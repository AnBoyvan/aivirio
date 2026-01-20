import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';

export const useMessages = (conversationId: Id<'conversations'> | null) => {
	return useQuery(
		api.conversations.getMessages,
		conversationId ? { conversationId } : 'skip',
	);
};
