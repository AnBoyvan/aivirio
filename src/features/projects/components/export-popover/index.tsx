import { useState } from 'react';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import type { Id } from '@/convex/_generated/dataModel';

import { useProject } from '../../hooks/use-project';
import { ExportPopoverForm } from './export-popover-form';
import { ExportStatusCompleted } from './export-status-completed';
import { ExportStatusExporting } from './export-status-exporting';
import { ExportStatusFailed } from './export-status-failed';
import { ExportStatusIcon } from './export-status-icon';

interface ExportPopoverProps {
	projectId: Id<'projects'>;
}

export const ExportPopover = ({ projectId }: ExportPopoverProps) => {
	const project = useProject(projectId);
	const [open, setOpen] = useState(false);

	const exportStatus = project?.exportStatus;
	const exportRepoUrl = project?.exportRepoUrl;

	const renderContent = () => {
		if (exportStatus === 'exporting') {
			return <ExportStatusExporting projectId={projectId} />;
		}

		if (exportStatus === 'completed' && exportRepoUrl) {
			return (
				<ExportStatusCompleted
					projectId={projectId}
					exportRepoUrl={exportRepoUrl}
					onOpen={setOpen}
				/>
			);
		}

		if (exportStatus === 'failed') {
			return <ExportStatusFailed projectId={projectId} onOpen={setOpen} />;
		}

		return (
			<ExportPopoverForm
				projectId={projectId}
				name={project?.name}
				onOpen={setOpen}
			/>
		);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div className="flex h-full cursor-pointer items-center gap-1.5 border-l px-3 text-muted-foreground hover:bg-accent/30">
					<ExportStatusIcon exportStatus={exportStatus} />
					<span className="text-sm">Export</span>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-80" align="start">
				{renderContent()}
			</PopoverContent>
		</Popover>
	);
};
