import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { Id } from '@/convex/_generated/dataModel';

import { useEditor } from '../hooks/use-editor';
import { Tab } from './tab';

interface TopNavigationProps {
	projectId: Id<'projects'>;
}

export const TopNavigation = ({ projectId }: TopNavigationProps) => {
	const { openTabs } = useEditor(projectId);

	return (
		<ScrollArea className="flex-1">
			<nav className="flex h-8.75 items-center border-b bg-sidebar">
				{openTabs.map((fileId, index) => (
					<Tab
						key={fileId}
						fileId={fileId}
						isFirst={index === 0}
						projectId={projectId}
					/>
				))}
			</nav>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};
