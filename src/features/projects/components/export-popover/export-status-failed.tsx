import ky from 'ky';
import { XCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Id } from '@/convex/_generated/dataModel';

interface ExportStatusFailedProps {
	projectId: Id<'projects'>;
	onOpen: (open: boolean) => void;
}

export const ExportStatusFailed = ({
	projectId,
	onOpen,
}: ExportStatusFailedProps) => {
	const handleResetExport = async () => {
		await ky.post('/api/github/export/reset', {
			json: { projectId },
		});
		onOpen(false);
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<XCircleIcon className="size-6 text-rose-500" />
			<p className="font-medium text-sm">Unable to export</p>
			<p className="text-center text-muted-foreground text-xs">
				Something went wrong. Please try again.
			</p>
			<Button
				size="sm"
				variant="outline"
				className="w-full"
				onClick={handleResetExport}
			>
				Retry
			</Button>
		</div>
	);
};
