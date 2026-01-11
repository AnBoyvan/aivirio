import { Kbd } from '@/components/ui/kbd';
import { Spinner } from '@/components/ui/spinner';

import { useProjectsPartial } from '../hooks/use-projects-partial';
import { ContinueCard } from './continue-card';
import { ProjectItem } from './project-item';

interface ProjectsListProps {
	onViewAll: () => void;
}

export const ProjectsList = ({ onViewAll }: ProjectsListProps) => {
	const projects = useProjectsPartial(6);

	if (projects === undefined) {
		return <Spinner className="size-4 text-ring" />;
	}

	const [mostRecent, ...rest] = projects;

	return (
		<div className="flex flex-col gap-4">
			{mostRecent ? <ContinueCard data={mostRecent} /> : null}
			{rest.length > 0 && (
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between gap-2">
						<span className="text-muted-foreground text-xs">
							Recent projects
						</span>
						<button
							onClick={onViewAll}
							className="flex items-center gap-2 text-muted-foreground text-xs transition-colors hover:text-foreground"
						>
							<span>View all</span>
							<Kbd className="border bg-accent">ctrl+K</Kbd>
						</button>
					</div>
					<ul>
						{rest.map(project => (
							<ProjectItem key={project._id} data={project} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
