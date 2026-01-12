import type { Id } from '@/convex/_generated/dataModel';
import { ProjectIdLayout } from '@/features/projects/components/project-id-layout';

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ projectId: Id<'projects'> }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
	const { projectId } = await params;

	return <ProjectIdLayout projectId={projectId}>{children}</ProjectIdLayout>;
};

export default Layout;
