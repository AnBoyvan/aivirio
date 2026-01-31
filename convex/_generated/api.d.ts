/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _conversations_create from "../_conversations/create.js";
import type * as _conversations_getById from "../_conversations/getById.js";
import type * as _conversations_getByProject from "../_conversations/getByProject.js";
import type * as _conversations_getMessages from "../_conversations/getMessages.js";
import type * as _files_createFile from "../_files/createFile.js";
import type * as _files_createFolder from "../_files/createFolder.js";
import type * as _files_getFile from "../_files/getFile.js";
import type * as _files_getFilePath from "../_files/getFilePath.js";
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
import type * as _projects_updateSettings from "../_projects/updateSettings.js";
import type * as _requests_cleanup from "../_requests/cleanup.js";
import type * as _requests_createBinaryFile from "../_requests/createBinaryFile.js";
import type * as _requests_createFile from "../_requests/createFile.js";
import type * as _requests_createFiles from "../_requests/createFiles.js";
import type * as _requests_createFolder from "../_requests/createFolder.js";
import type * as _requests_createMessage from "../_requests/createMessage.js";
import type * as _requests_createProject from "../_requests/createProject.js";
import type * as _requests_createProjectWithConversation from "../_requests/createProjectWithConversation.js";
import type * as _requests_generateUploadUrl from "../_requests/generateUploadUrl.js";
import type * as _requests_getConversationById from "../_requests/getConversationById.js";
import type * as _requests_getFileById from "../_requests/getFileById.js";
import type * as _requests_getProcessingMessages from "../_requests/getProcessingMessages.js";
import type * as _requests_getProjectFiles from "../_requests/getProjectFiles.js";
import type * as _requests_getProjectFilesWithUrls from "../_requests/getProjectFilesWithUrls.js";
import type * as _requests_getRecentMessages from "../_requests/getRecentMessages.js";
import type * as _requests_removeFile from "../_requests/removeFile.js";
import type * as _requests_renameFile from "../_requests/renameFile.js";
import type * as _requests_updateConversationTitle from "../_requests/updateConversationTitle.js";
import type * as _requests_updateExportStatus from "../_requests/updateExportStatus.js";
import type * as _requests_updateFile from "../_requests/updateFile.js";
import type * as _requests_updateImportStatus from "../_requests/updateImportStatus.js";
import type * as _requests_updateMessageContent from "../_requests/updateMessageContent.js";
import type * as _requests_updateMessageStatus from "../_requests/updateMessageStatus.js";
import type * as _requests_validateInternalKey from "../_requests/validateInternalKey.js";
import type * as auth from "../auth.js";
import type * as conversations from "../conversations.js";
import type * as files from "../files.js";
import type * as projects from "../projects.js";
import type * as requests from "../requests.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "_conversations/create": typeof _conversations_create;
  "_conversations/getById": typeof _conversations_getById;
  "_conversations/getByProject": typeof _conversations_getByProject;
  "_conversations/getMessages": typeof _conversations_getMessages;
  "_files/createFile": typeof _files_createFile;
  "_files/createFolder": typeof _files_createFolder;
  "_files/getFile": typeof _files_getFile;
  "_files/getFilePath": typeof _files_getFilePath;
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
  "_projects/updateSettings": typeof _projects_updateSettings;
  "_requests/cleanup": typeof _requests_cleanup;
  "_requests/createBinaryFile": typeof _requests_createBinaryFile;
  "_requests/createFile": typeof _requests_createFile;
  "_requests/createFiles": typeof _requests_createFiles;
  "_requests/createFolder": typeof _requests_createFolder;
  "_requests/createMessage": typeof _requests_createMessage;
  "_requests/createProject": typeof _requests_createProject;
  "_requests/createProjectWithConversation": typeof _requests_createProjectWithConversation;
  "_requests/generateUploadUrl": typeof _requests_generateUploadUrl;
  "_requests/getConversationById": typeof _requests_getConversationById;
  "_requests/getFileById": typeof _requests_getFileById;
  "_requests/getProcessingMessages": typeof _requests_getProcessingMessages;
  "_requests/getProjectFiles": typeof _requests_getProjectFiles;
  "_requests/getProjectFilesWithUrls": typeof _requests_getProjectFilesWithUrls;
  "_requests/getRecentMessages": typeof _requests_getRecentMessages;
  "_requests/removeFile": typeof _requests_removeFile;
  "_requests/renameFile": typeof _requests_renameFile;
  "_requests/updateConversationTitle": typeof _requests_updateConversationTitle;
  "_requests/updateExportStatus": typeof _requests_updateExportStatus;
  "_requests/updateFile": typeof _requests_updateFile;
  "_requests/updateImportStatus": typeof _requests_updateImportStatus;
  "_requests/updateMessageContent": typeof _requests_updateMessageContent;
  "_requests/updateMessageStatus": typeof _requests_updateMessageStatus;
  "_requests/validateInternalKey": typeof _requests_validateInternalKey;
  auth: typeof auth;
  conversations: typeof conversations;
  files: typeof files;
  projects: typeof projects;
  requests: typeof requests;
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
