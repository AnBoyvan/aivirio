'use client';

import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';

import { SparkleIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from 'unique-names-generator';

import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { cn } from '@/lib/utils/cn';

import { useCreateProject } from '../hooks/use-create-project';
import { ImportGithubDialog } from './import-github-dialog';
import { ProjectsCommandDialog } from './projects-command-dialog';
import { ProjectsList } from './projects-list';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export const ProjectsView = () => {
	const createProject = useCreateProject();

	const [commandDialogOpen, setCommandDialogOpen] = useState(false);
	const [importDialogOpen, setImportDialogOpen] = useState(false);

	const handleCreateProject = () => {
		const projectName = uniqueNamesGenerator({
			dictionaries: [adjectives, animals, colors],
			separator: '-',
			length: 3,
		});

		createProject({
			name: projectName,
		});
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.metaKey || e.ctrlKey) {
				if (e.key === 'J' || e.key === 'j' || e.key === 'О' || e.key === 'о') {
					e.preventDefault();
					handleCreateProject();
				}

				if (e.key === 'I' || e.key === 'i' || e.key === 'Ш' || e.key === 'ш') {
					e.preventDefault();
					setImportDialogOpen(true);
				}

				if (e.key === 'K' || e.key === 'k' || e.key === 'Л' || e.key === 'л') {
					e.preventDefault();
					setCommandDialogOpen(true);
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<>
			<ProjectsCommandDialog
				open={commandDialogOpen}
				onOpenChange={setCommandDialogOpen}
			/>
			<ImportGithubDialog
				open={importDialogOpen}
				onOpenChange={setImportDialogOpen}
			/>
			<div className="flex min-h-screen flex-col items-center justify-center bg-sidebar p-6 md:p-16">
				<div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
					<div className="flex w-full items-center justify-between gap-4">
						<div className="group/logo flex w-full items-center gap-2">
							<img
								src="/logo.svg"
								alt="Aivirio"
								className="size-[32px] md:size-[46px]"
							/>
							<h1
								className={cn(
									'font-semibold text-4xl text-sky-600 md:text-5xl',
									poppins.className,
								)}
							>
								Aivirio
							</h1>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="grid grid-cols-2 gap-2">
							<Button
								variant="outline"
								onClick={() => handleCreateProject()}
								className="flex h-full flex-col items-start justify-start gap-6 rounded-none border bg-background p-4"
							>
								<div className="flex w-full items-center justify-between">
									<SparkleIcon className="size-4" />
									<Kbd className="border bg-accent">ctrl+J</Kbd>
								</div>
								<div>
									<span className="text-sm">New</span>
								</div>
							</Button>
							<Button
								variant="outline"
								onClick={() => setImportDialogOpen(true)}
								className="flex h-full flex-col items-start justify-start gap-6 rounded-none border bg-background p-4"
							>
								<div className="flex w-full items-center justify-between">
									<FaGithub className="size-4" />
									<Kbd className="border bg-accent">ctrl+I</Kbd>
								</div>
								<div>
									<span className="text-sm">Import</span>
								</div>
							</Button>
						</div>
						<ProjectsList onViewAll={() => setCommandDialogOpen(true)} />
					</div>
				</div>
			</div>
		</>
	);
};
