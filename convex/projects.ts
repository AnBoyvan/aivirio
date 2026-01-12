import { createProject } from './projects/handlers/createProject';
import { getProjectById } from './projects/handlers/getProjectById';
import { getProjects } from './projects/handlers/getProjects';
import { getProjectsPartial } from './projects/handlers/getProjectsPartial';
import { renameProject } from './projects/handlers/renameProject';

export const create = createProject;
export const get = getProjects;
export const getPartial = getProjectsPartial;
export const getById = getProjectById;
export const rename = renameProject;
