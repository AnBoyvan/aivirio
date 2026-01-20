import { serve } from 'inngest/next';

import { processMessage } from '@/features/conversations/inngest/process-message';
import { inngest } from '@/lib/inngest/client';
import { demoGenerate } from '@/lib/inngest/functions';

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [demoGenerate, processMessage],
});
