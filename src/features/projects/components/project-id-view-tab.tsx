import { cn } from '@/lib/utils/cn';

interface ProjectIdViewTabProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

export const ProjectIdViewTab = ({
	label,
	isActive,
	onClick,
}: ProjectIdViewTabProps) => {
	return (
		<div
			onClick={onClick}
			className={cn(
				'flex h-full cursor-pointer items-center gap-2 border-r px-3 text-muted-foreground hover:bg-accent/30',
				isActive && 'bg-background text-foreground',
			)}
		>
			<span className="text-sm">{label}</span>
		</div>
	);
};
