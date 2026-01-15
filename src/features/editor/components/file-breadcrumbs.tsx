import React from 'react';

import { FileIcon } from '@react-symbols/icons/utils';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { Id } from '@/convex/_generated/dataModel';
import { useFilePath } from '@/features/files/hooks/use-file-path';

import { useEditor } from '../hooks/use-editor';

interface FileBreadcrumbsProps {
	projectId: Id<'projects'>;
}

export const FileBreadcrumbs = ({ projectId }: FileBreadcrumbsProps) => {
	const { activeTabId } = useEditor(projectId);
	const filePath = useFilePath(activeTabId);

	if (filePath === undefined || !activeTabId) {
		return (
			<div className="border-b bg-background p-2 pl-4">
				<Breadcrumb>
					<BreadcrumbList className="gap-0.5 sm:gap-0.5">
						<BreadcrumbItem className="text-sm">
							<BreadcrumbPage>&nbsp;</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		);
	}

	return (
		<div className="border-b bg-background p-2 pl-4">
			<Breadcrumb>
				<BreadcrumbList className="gap-0.5 sm:gap-0.5">
					{filePath.map((item, idx) => {
						const isLast = idx === filePath.length - 1;

						return (
							<React.Fragment key={item._id}>
								<BreadcrumbItem className="text-sm">
									{isLast ? (
										<BreadcrumbPage className="flex items-center gap-1">
											<FileIcon
												fileName={item.name}
												autoAssign
												className="size-4"
											/>
											{item.name}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink
											href="#"
											className="flex items-center gap-1"
										>
											{item.name}
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};
