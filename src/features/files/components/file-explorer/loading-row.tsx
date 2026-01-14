import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils/cn';

import { getItemPadding } from '../../utils/get-item-padding';

interface LoadingRowProps {
	level?: number;
	className?: string;
}

export const LoadingRow = ({ level = 0, className }: LoadingRowProps) => {
	return (
		<div
			className={cn('flex h-5.5 items-center text-muted', className)}
			style={{ paddingLeft: getItemPadding(level, true) }}
		>
			<Spinner className="ml-0.5 size-4 text-ring" />
		</div>
	);
};
