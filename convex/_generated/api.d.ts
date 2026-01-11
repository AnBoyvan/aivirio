/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as projects from "../projects.js";
import type * as projects_handlers_createProject from "../projects/handlers/createProject.js";
import type * as projects_handlers_getProjects from "../projects/handlers/getProjects.js";
import type * as projects_handlers_getProjectsPartial from "../projects/handlers/getProjectsPartial.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  projects: typeof projects;
  "projects/handlers/createProject": typeof projects_handlers_createProject;
  "projects/handlers/getProjects": typeof projects_handlers_getProjects;
  "projects/handlers/getProjectsPartial": typeof projects_handlers_getProjectsPartial;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
