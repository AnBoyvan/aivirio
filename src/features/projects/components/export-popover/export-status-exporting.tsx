import ky from 'ky';
import { LoaderIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Id } from '@/convex/_generated/dataModel';

interface ExportStatusExportingProps {
	projectId: Id<'projects'>;
}

export const ExportStatusExporting = ({
	projectId,
}: ExportStatusExportingProps) => {
	const handleCancelExport = async () => {
		await ky.post('/api/github/export/cancel', {
			json: { projectId },
		});
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<LoaderIcon className="size-6 animate-spin text-muted-foreground" />
			<p className="text-muted-foreground text-sm">Exporting to GitHub...</p>
			<Button
				size="sm"
				variant="outline"
				className="w-full"
				onClick={handleCancelExport}
			>
				Cancel
			</Button>
		</div>
	);
};
