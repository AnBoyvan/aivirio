'use client';

import { Allotment } from 'allotment';

import type { Id } from '@/convex/_generated/dataModel';

import { Navbar } from './navbar';

import 'allotment/dist/style.css';

interface ProjectIdLayoutProps {
	children: React.ReactNode;
	projectId: Id<'projects'>;
}

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 800;
const DEFAULT_CONVERSATION_SIDEBAR_WIDTH = 400;
const DEFAULT_MAIN_SIZE = 1000;

export const ProjectIdLayout = ({
	children,
	projectId,
}: ProjectIdLayoutProps) => {
	return (
		<div className="flex h-screen w-full flex-col">
			<Navbar projectId={projectId} />
			<div className="flex flex-1 overflow-hidden">
				<Allotment
					defaultSizes={[DEFAULT_CONVERSATION_SIDEBAR_WIDTH, DEFAULT_MAIN_SIZE]}
					className="flex-1"
				>
					<Allotment.Pane
						snap
						minSize={MIN_SIDEBAR_WIDTH}
						maxSize={MAX_SIDEBAR_WIDTH}
						preferredSize={DEFAULT_CONVERSATION_SIDEBAR_WIDTH}
					>
						<div>Conversation sidebar</div>
					</Allotment.Pane>
					<Allotment.Pane>{children}</Allotment.Pane>
				</Allotment>
			</div>
		</div>
	);
};
