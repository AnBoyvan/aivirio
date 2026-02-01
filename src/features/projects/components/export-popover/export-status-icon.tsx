import { CheckCheckIcon, LoaderIcon, XCircleIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ExportStatusIconProps {
	exportStatus: 'exporting' | 'completed' | 'failed' | 'cancelled' | undefined;
}

export const ExportStatusIcon = ({ exportStatus }: ExportStatusIconProps) => {
	if (exportStatus === 'exporting') {
		return <LoaderIcon className="size-3.5 animate-spin" />;
	}

	if (exportStatus === 'completed') {
		return <CheckCheckIcon className="size-3.5 text-emerald-500" />;
	}

	if (exportStatus === 'failed') {
		return <XCircleIcon className="size-3.5 text-red-500" />;
	}

	return <FaGithub className="size-3.5" />;
};
