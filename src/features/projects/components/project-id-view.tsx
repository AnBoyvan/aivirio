'use client';

import { useState } from 'react';

import { Allotment } from 'allotment';
import { FaGithub } from 'react-icons/fa';

import type { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils/cn';

import { ProjectIdViewTab } from './project-id-view-tab';

import 'allotment/dist/style.css';

import { FileExplorer } from '../../files/components/file-explorer';

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_SIDEBAR_WIDTH = 350;
const DEFAULT_MAIN_SIZE = 1000;

interface ProjectIdViewProps {
	projectId: Id<'projects'>;
}

export const ProjectIdView = ({ projectId }: ProjectIdViewProps) => {
	const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');

	return (
		<div className="flex h-full flex-col">
			<nav className="flex h-8.75 items-center border-b bg-sidebar">
				<ProjectIdViewTab
					label="Code"
					isActive={activeView === 'editor'}
					onClick={() => setActiveView('editor')}
				/>
				<ProjectIdViewTab
					label="Preview"
					isActive={activeView === 'preview'}
					onClick={() => setActiveView('preview')}
				/>
				<div className="flex h-full flex-1 justify-end">
					<div className="flex h-full cursor-pointer items-center gap-1.5 border-l px-3 text-muted-foreground hover:bg-accent/30">
						<FaGithub className="size-3.5" />
						<span className="text-sm">Export</span>
					</div>
				</div>
			</nav>
			<div className="relative flex-1">
				<div
					className={cn(
						'absolute inset-0',
						activeView === 'editor' ? 'visible' : 'invisible',
					)}
				>
					<Allotment defaultSizes={[DEFAULT_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}>
						<Allotment.Pane
							snap
							minSize={MIN_SIDEBAR_WIDTH}
							maxSize={MAX_SIDEBAR_WIDTH}
							preferredSize={DEFAULT_SIDEBAR_WIDTH}
						>
							<FileExplorer projectId={projectId} />
						</Allotment.Pane>
						<Allotment.Pane>
							<p>Editor view</p>
						</Allotment.Pane>
					</Allotment>
				</div>
				<div
					className={cn(
						'absolute inset-0',
						activeView === 'preview' ? 'visible' : 'invisible',
					)}
				>
					<div>Preview</div>
				</div>
			</div>
		</div>
	);
};
