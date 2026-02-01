import Link from 'next/link';

import ky from 'ky';
import { CheckCircle2Icon, ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { Id } from '@/convex/_generated/dataModel';

interface ExportStatusCompletedProps {
	projectId: Id<'projects'>;
	exportRepoUrl: string;
	onOpen: (open: boolean) => void;
}

export const ExportStatusCompleted = ({
	projectId,
	exportRepoUrl,
	onOpen,
}: ExportStatusCompletedProps) => {
	const handleResetExport = async () => {
		await ky.post('/api/github/export/reset', {
			json: { projectId },
		});
		onOpen(false);
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<CheckCircle2Icon className="size-6 text-emerald-500" />
			<p className="font-medium text-sm">Repository created</p>
			<p className="text-center text-muted-foreground text-xs">
				Your project has been exported to GitHub.
			</p>
			<div className="flex w-full flex-col gap-2">
				<Button size="sm" className="w-full" asChild>
					<Link href={exportRepoUrl} target="_blank" rel="noopener noreferrer">
						<ExternalLinkIcon className="mr-1 size-4" />
						View on GitHub
					</Link>
				</Button>
				<Button
					size="sm"
					variant="outline"
					className="w-full"
					onClick={handleResetExport}
				>
					Close
				</Button>
			</div>
		</div>
	);
};
