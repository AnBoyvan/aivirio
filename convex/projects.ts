import { createProject } from './projects/handlers/createProject';
import { getProjects } from './projects/handlers/getProjects';
import { getProjectsPartial } from './projects/handlers/getProjectsPartial';

export const create = createProject;
export const get = getProjects;
export const getPartial = getProjectsPartial;
