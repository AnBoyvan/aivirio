/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _files_createFile from "../_files/createFile.js";
import type * as _files_createFolder from "../_files/createFolder.js";
import type * as _files_getFile from "../_files/getFile.js";
import type * as _files_getFiles from "../_files/getFiles.js";
import type * as _files_getFolderContents from "../_files/getFolderContents.js";
import type * as _files_remove from "../_files/remove.js";
import type * as _files_rename from "../_files/rename.js";
import type * as _files_update from "../_files/update.js";
import type * as _projects_create from "../_projects/create.js";
import type * as _projects_get from "../_projects/get.js";
import type * as _projects_getById from "../_projects/getById.js";
import type * as _projects_getPartial from "../_projects/getPartial.js";
import type * as _projects_rename from "../_projects/rename.js";
import type * as auth from "../auth.js";
import type * as files from "../files.js";
import type * as projects from "../projects.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "_files/createFile": typeof _files_createFile;
  "_files/createFolder": typeof _files_createFolder;
  "_files/getFile": typeof _files_getFile;
  "_files/getFiles": typeof _files_getFiles;
  "_files/getFolderContents": typeof _files_getFolderContents;
  "_files/remove": typeof _files_remove;
  "_files/rename": typeof _files_rename;
  "_files/update": typeof _files_update;
  "_projects/create": typeof _projects_create;
  "_projects/get": typeof _projects_get;
  "_projects/getById": typeof _projects_getById;
  "_projects/getPartial": typeof _projects_getPartial;
  "_projects/rename": typeof _projects_rename;
  auth: typeof auth;
  files: typeof files;
  projects: typeof projects;
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
