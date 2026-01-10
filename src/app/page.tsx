'use client';

import { useMutation, useQuery } from 'convex/react';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';

const Page = () => {
	const projects = useQuery(api.projects.get);
	const createProject = useMutation(api.projects.create);

	return (
		<div className="flex flex-col gap-2 p-4">
			<Button
				onClick={() =>
					createProject({
						name: 'New project2',
					})
				}
			>
				Add new
			</Button>
			{projects?.map(project => (
				<div className="flex flex-col rounded border p-2" key={project._id}>
					<p>{project.name}</p>
					<p>Owner Id: {project.ownerId}</p>
				</div>
			))}
		</div>
	);
};

export default Page;
