import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { UserButton } from '@clerk/nextjs';
import { CloudCheckIcon, LoaderIcon } from 'lucide-react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils/cn';
import { formatTimestamp } from '@/lib/utils/format-timestamp';

import { useProject } from '../hooks/use-project';
import { useRenameProject } from '../hooks/use-rename-project';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

interface NavbarProps {
	projectId: Id<'projects'>;
}

export const Navbar = ({ projectId }: NavbarProps) => {
	const project = useProject(projectId);
	const renameProject = useRenameProject(projectId);

	const [isRenaming, setIsRenaming] = useState(false);
	const [name, setName] = useState('');

	const handleStartRename = () => {
		if (!project) return;
		setName(project.name);
		setIsRenaming(true);
	};

	const handleSubmit = () => {
		if (!project) return;
		setIsRenaming(false);

		const trimmedName = name.trim();
		if (!trimmedName || trimmedName === project.name) return;

		renameProject({ id: projectId, name: trimmedName });
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSubmit();
		} else if (e.key === 'Escape') {
			setIsRenaming(false);
		}
	};

	return (
		<nav className="flex items-center justify-between gap-x-2 border-b bg-sidebar p-2">
			<div className="flex items-center gap-x-2">
				<Breadcrumb>
					<BreadcrumbList className="gap-0!">
						<BreadcrumbItem>
							<BreadcrumbLink asChild className="flex items-center gap-1.5">
								<Button variant="ghost" asChild className="h-7! w-fit! p-1.5!">
									<Link href="/">
										<Image src="/logo.svg" alt="Logo" width={20} height={20} />
										<span
											className={cn(
												'font-medium text-sky-600 text-sm',
												poppins.className,
											)}
										>
											Aivirio
										</span>
									</Link>
								</Button>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className="mr-1! ml-0!" />
						<BreadcrumbItem>
							{isRenaming ? (
								<input
									type="text"
									autoFocus
									value={name}
									onChange={e => setName(e.target.value)}
									onFocus={e => e.currentTarget.select()}
									onBlur={handleSubmit}
									onKeyDown={handleKeyDown}
									className="max-w-40 truncate bg-transparent font-medium text-foreground text-sm outline-none focus:ring-1 focus:ring-ring focus:ring-inset"
								/>
							) : (
								<BreadcrumbPage
									onClick={handleStartRename}
									className="max-w-40 cursor-pointer truncate font-medium text-sm hover:text-primary"
								>
									{project?.name ?? 'Loading...'}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{project?.importStatus === 'importing' ? (
					<Tooltip>
						<TooltipTrigger>
							<LoaderIcon className="size-4 animate-spin text-muted-foreground" />
						</TooltipTrigger>
						<TooltipContent>Importing...</TooltipContent>
					</Tooltip>
				) : (
					<Tooltip>
						<TooltipTrigger>
							<CloudCheckIcon className="size-4 text-muted-foreground" />
						</TooltipTrigger>
						<TooltipContent>
							Saved{' '}
							{project?.updatedAt ? formatTimestamp(project.updatedAt) : ''}
						</TooltipContent>
					</Tooltip>
				)}
			</div>
			<div className="flex items-center gap-2">
				<UserButton />
			</div>
		</nav>
	);
};
