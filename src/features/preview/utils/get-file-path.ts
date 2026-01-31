import type { Doc, Id } from '@/convex/_generated/dataModel';

type FileDoc = Doc<'files'>;

// Get full path for a file by traversing parent chain
export const getFilePath = (
	file: FileDoc,
	filesMap: Map<Id<'files'>, FileDoc>,
): string => {
	const parts: string[] = [file.name];
	let parentId = file.parentId;

	while (parentId) {
		const parent = filesMap.get(parentId);
		if (!parent) break;
		parts.unshift(parent.name);
		parentId = parent.parentId;
	}

	return parts.join('/');
};
