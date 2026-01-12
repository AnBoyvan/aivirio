'use client';

import { useState } from 'react';

import { FaGithub } from 'react-icons/fa';

import type { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils/cn';

import { ProjectIdViewTab } from './project-id-view-tab';

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
					<div>Editor</div>
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
