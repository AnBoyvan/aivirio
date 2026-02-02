# Aivirio

**An AI-powered full-stack web development platform for creating, editing, and deploying projects directly in the browser.**

Aivirio is a modern web application that combines cloud-based project management with real-time collaborative editing and AI-assisted code generation. It enables developers to import GitHub repositories, edit code with AI suggestions, manage project files, and preview live environments—all within a unified browser interface.

## Tech Stack

### Core Framework & Runtime
- **Next.js 16** — Full-stack React framework with App Router
- **React 19** — UI library with server and client components
- **TypeScript 5** — Type-safe JavaScript development
- **Node.js** — Backend runtime

### Backend & Database
- **Convex** — Backend-as-a-Service platform for queries, mutations, and real-time subscriptions
- **Clerk** — Authentication and user identity management
- **Inngest** — Background job orchestration and event-driven workflows

### AI & Content Processing
- **Anthropic Claude API** (Haiku, Sonnet, Opus models) — AI-powered code generation and editing
- **Firecrawl** — URL scraping and content extraction
- **Octokit** — GitHub API integration for repository import/export

### Editor & Code Management
- **CodeMirror 6** — Advanced code editor with syntax highlighting and extensions
- **Shiki** — Syntax highlighting engine
- **Tailwind CSS 4** — Utility-first CSS framework
- **Radix UI** — Unstyled component primitives
- **React Hook Form** — Form state management

### Frontend Runtime & Preview
- **WebContainer API** — Browser-based runtime environment for live project execution
- **xterm** — Terminal emulation for command-line access

### Development & Quality
- **Biome** — Linter and code formatter
- **Sentry** — Error tracking and performance monitoring
- **Zod** — Runtime schema validation
- **TanStack React Form** — Advanced form handling
- **Zustand** — Lightweight state management

## Key Features

### Project Management
- **Create & Import Projects** — Initialize new projects or import existing GitHub repositories
- **File System** — Full nested folder and file structure with create, read, update, delete operations
- **Project Settings** — Configure install and development commands per project
- **Import/Export Status Tracking** — Monitor project synchronization with GitHub

### AI-Assisted Development
- **Conversational Interface** — Multi-turn conversations with AI agents within project context
- **Code Generation** — AI-powered tool for creating new code files and folders based on natural language descriptions
- **Code Editing** — Quick inline code edits with AI suggestions (Cmd+J in editor)
- **Code Suggestions** — Real-time AI-driven suggestions while editing (Cmd+Shift+I)
- **Web Scraping** — Fetch and analyze web content to inform code generation

### Code Editor
- **Multi-language Support** — Syntax highlighting for JavaScript, TypeScript, HTML, CSS, Python, JSON, Markdown
- **CodeMirror Integration** — Advanced editor with autocomplete, linting, and search
- **Quick Edit UI** — Inline editor for rapid code modifications
- **File Tree Navigation** — Browse and open files from nested project structure

### Live Preview & Execution
- **WebContainer Runtime** — Execute Node.js applications directly in the browser
- **Terminal Integration** — xterm-based terminal for running commands
- **Responsive Layout** — Split-pane interface with resizable editor and preview panels

### GitHub Integration
- **Repository Import** — Clone entire GitHub repositories into projects
- **Repository Export** — Push project files back to GitHub
- **Branch Support** — Automatic main/master branch detection and fallback
- **Binary File Handling** — Proper handling of text and binary files

### Authentication & Security
- **Clerk Authentication** — Secure user authentication and session management
- **Convex Auth** — JWT-based authorization with Clerk integration
- **Internal Key Validation** — Server-side authentication for background jobs and API routes
- **Ownership Verification** — User-based access control for projects

### Message & Conversation Management
- **Message Status Tracking** — Processing, completed, and cancelled states
- **Auto-title Generation** — AI generates conversation titles on first message
- **Recent Messages** — Quick access to recent conversation history
- **Message Cancellation** — Stop processing of long-running AI tasks

## Architecture Overview

### Directory Structure

```
├── convex/                    # Backend server (Convex)
│   ├── auth.config.ts        # Clerk authentication configuration
│   ├── schema.ts              # Database schema (projects, files, conversations, messages)
│   ├── conversations.ts       # Conversation query/mutation exports
│   ├── projects.ts            # Project query/mutation exports
│   ├── files.ts               # File operation exports
│   ├── requests.ts            # Internal request mutations with validation
│   ├── _conversations/        # Conversation handlers (create, getById, getByProject, getMessages)
│   ├── _projects/             # Project handlers (create, get, getById, rename, updateSettings)
│   ├── _files/                # File operation handlers (CRUD operations)
│   ├── _requests/             # Internal mutation handlers (cleanup, createMessage, import/export status)
│   └── _generated/            # Auto-generated Convex types and API

├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page (projects view)
│   │   ├── projects/[projectId]/  # Dynamic project workspace
│   │   ├── api/
│   │   │   ├── messages/      # Message creation and processing
│   │   │   ├── github/        # GitHub import/export endpoints
│   │   │   ├── projects/      # Project creation with prompt
│   │   │   ├── suggestion/    # AI code suggestions
│   │   │   ├── quick-edit/    # Quick edit AI endpoint
│   │   │   └── inngest/       # Inngest webhook receiver
│   │   └── globals.css        # Global styles
│   │
│   ├── components/
│   │   ├── providers.tsx      # Root providers (Clerk, Convex, Theme)
│   │   ├── ui/                # Radix UI component wrappers (button, dialog, input, etc.)
│   │   └── ai-elements/       # AI-specific UI (conversation, message, prompt input)
│   │
│   ├── features/              # Feature modules
│   │   ├── auth/              # Authentication UI (loading, unauthenticated views)
│   │   ├── projects/
│   │   │   ├── components/    # Project views and panels
│   │   │   ├── inngest/       # Background jobs (import-github-repo, export-to-github)
│   │   │   ├── schemas/       # Request validation schemas
│   │   │   └── utils/         # Helper functions
│   │   ├── conversations/
│   │   │   ├── components/    # Conversation UI
│   │   │   ├── inngest/       # Message processing with agent kit
│   │   │   ├── prompts/       # System prompts for AI agents
│   │   │   ├── schemas/       # Message validation schemas
│   │   │   └── constants.ts   # Configuration constants
│   │   ├── editor/
│   │   │   ├── components/    # Editor UI component
│   │   │   ├── extension/     # CodeMirror extensions (syntax, suggestions, quick-edit)
│   │   │   ├── hooks/         # Editor state management hook
│   │   │   ├── prompts/       # AI prompts for editing
│   │   │   ├── schemas/       # Request/response validation
│   │   │   └── store/         # Zustand editor state store
│   │   ├── files/
│   │   │   ├── components/    # File tree and operations UI
│   │   │   ├── hooks/         # File operations hooks
│   │   │   └── utils/         # Path manipulation utilities
│   │   └── preview/
│   │       ├── components/    # Preview and terminal UI
│   │       ├── hooks/         # WebContainer integration
│   │       └── utils/         # File tree conversion for WebContainer
│   │
│   ├── lib/
│   │   ├── constants.ts       # AI model constants
│   │   ├── convex/            # Convex client instances
│   │   ├── firecrawl/         # Firecrawl API client
│   │   ├── inngest/           # Inngest client and middleware
│   │   └── utils/             # Utility functions
│   │
│   ├── hooks/                 # Global React hooks
│   ├── instrumentation.ts     # Sentry initialization
│   └── proxy.ts               # Clerk middleware routing
│
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration with Sentry
├── biome.json                # Code formatter and linter config
├── postcss.config.mjs         # PostCSS configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

### Core Modules & Responsibilities

#### Convex Backend
- **Schema**: Defines `projects`, `files`, `conversations`, and `messages` tables with indexes
- **Auth**: Clerk JWT validation for authenticated requests
- **Queries**: Fetch projects, files, conversations, and messages with ownership verification
- **Mutations**: Create, update, and delete operations with internal key validation
- **Requests**: Internal mutations for background jobs to bypass auth checks

#### Next.js App & API Routes
- **Root Layout**: Integrates Clerk, Convex, Themes, and Toast providers
- **Projects Page**: Displays user's projects with creation/import options
- **Workspace**: Dynamic project editor with file tree, code editor, and preview
- **API Routes**:
  - `/api/messages` — Create messages and trigger AI processing
  - `/api/messages/cancel` — Cancel processing messages
  - `/api/github/import` — Trigger GitHub repository import
  - `/api/github/export` — Trigger GitHub repository export
  - `/api/projects/create-with-prompt` — Create project from natural language prompt
  - `/api/suggestion` — Generate AI code suggestions
  - `/api/quick-edit` — Quick inline code editing
  - `/api/inngest` — Webhook receiver for background jobs

#### Inngest Background Jobs
- **import-github-repo**: Fetches repository tree, processes files, and updates project
- **export-to-github**: Creates/updates GitHub repository with project files
- **process-message**: Runs AI agent with code generation and editing tools

#### AI Agent Tools
Available within message processing context:
- `create-files` — Generate new code files
- `create-folder` — Create directory structure
- `read-files` — Access project file content
- `update-file` — Modify existing files
- `list-files` — Browse file structure
- `remove-files` — Delete files
- `rename-file` — Rename files
- `scrape-urls` — Fetch web content

#### Editor Extensions
- **Syntax Highlighting** — Multi-language support via CodeMirror language packs
- **Code Suggestions** — Real-time AI suggestions (Cmd+Shift+I)
- **Quick Edit** — Inline code editing with AI assistance (Cmd+J)
- **Selection Tooltip** — Context menu for selected code

## Installation

### Prerequisites
- Node.js 18+ with npm or yarn
- Git
- Clerk account (for authentication)
- Convex account (for backend services)
- Anthropic API key (for Claude AI models)
- GitHub OAuth app credentials (for GitHub integration)
- Firecrawl API key (for web scraping)
- Inngest account (for background jobs)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/aivirio.git
   cd aivirio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment files**
   - Copy `.env.local.example` (if available) or create `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```

4. **Initialize Convex**
   ```bash
   npx convex init
   ```
   - Follow prompts to link your Convex project
   - Generate authentication configuration

5. **Configure environment variables** (see [Environment Variables](#environment-variables))

6. **Run database migrations** (if any pending)
   ```bash
   npx convex migrate
   ```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | `https://xxx.convex.cloud` |
| `CONVEX_INTERNAL_KEY` | Internal key for backend mutations | `[generated by Convex]` |
| `CLERK_PUBLISHABLE_KEY` | Clerk public key for frontend | `pk_live_xxx` |
| `CLERK_SECRET_KEY` | Clerk secret key for backend | `sk_live_xxx` |
| `CLERK_JWT_ISSUER_DOMAIN` | Clerk JWT issuer domain | `https://your-org.clerk.accounts.com` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | URL for Clerk sign-in | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in | `/` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude models | Required for AI features |
| `FIRECRAWL_API_KEY` | Firecrawl API key for web scraping | Required for scraping tool |
| `INNGEST_EVENT_KEY` | Inngest event key for background jobs | Required for job processing |
| `INNGEST_SIGNING_KEY` | Inngest signing key for webhook validation | Required for job processing |
| `SENTRY_AUTH_TOKEN` | Sentry token for error tracking | Optional, enables Sentry |
| `BASE_URL` | Base URL for metadata | `http://localhost:3000` (dev) |

### GitHub Integration
To enable GitHub import/export, configure GitHub OAuth:
- Create a GitHub OAuth application in your organization settings
- Set authorization callback URL to `https://your-domain.com/api/github/callback`
- Store credentials securely in your environment

## Available Scripts

All scripts are defined in `package.json`:

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start development server on http://localhost:3000 with hot reload |
| **build** | `npm run build` | Compile TypeScript and build Next.js production bundle |
| **start** | `npm run start` | Start production server (requires prior build) |
| **lint** | `npm run lint` | Check code with Biome linter and formatter |
| **format** | `npm run format` | Auto-format code with Biome |

### Convex-specific Commands

| Command | Description |
|---------|-------------|
| `npx convex dev` | Start Convex dev server with live sync |
| `npx convex deploy` | Deploy Convex backend to production |
| `npx convex migrate` | Create and apply database migrations |
| `npx convex logs` | View real-time server logs |
| `npx convex dashboard` | Open Convex dashboard in browser |

## How to Run Locally

### Development Mode

1. **Start the development server**
   ```bash
   npm run dev
   ```
   - Next.js dev server runs on `http://localhost:3000`
   - Convex syncs schema changes automatically
   - Hot reload enabled for code changes

2. **In a separate terminal, start Convex dev server** (if not running)
   ```bash
   npx convex dev
   ```

3. **In another terminal, start Inngest dev server** (for background jobs)
   ```bash
   npx inngest-cli@latest dev
   ```
   - Listens for background job events
   - Required for GitHub import/export and AI message processing
   - Displays function execution logs

4. **Access the application**
   - Open http://localhost:3000 in your browser
   - Sign in with Clerk authentication
   - Create your first project or import from GitHub

### Development Workflow

```bash
# Watch for code changes
npm run dev

# Lint and format code
npm run lint
npm run format

# View Convex logs
npx convex logs

# Debug messages and backend interactions
# Check browser DevTools Console and Network tabs
```

## How to Build and Deploy

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```
   - Compiles TypeScript
   - Optimizes React components
   - Generates Convex types
   - Creates `.next` directory with production artifacts

2. **Test the production build locally**
   ```bash
   npm run start
   ```
   - Runs the production-optimized server
   - Verify all features work as expected

### Deployment Options

#### Deploy to Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Vercel automatically detects Next.js and configures build

# Push to main branch triggers automatic deployment
git push origin main
```

#### Deploy to Other Platforms
Ensure your platform supports:
- Node.js 18+
- Build command: `npm run build`
- Start command: `npm run start`
- Environment variables configuration

#### Deploy Convex Backend
```bash
# Deploy Convex to production
npx convex deploy
```

### Environment Configuration for Production
- Use secure environment variable storage (Vercel, AWS Secrets Manager, etc.)
- Ensure all required API keys are configured
- Update `BASE_URL` to production domain
- Configure Sentry for error tracking
- Enable GitHub Actions for CI/CD if desired

## Usage Examples

### Creating a Project

**Via UI:**
1. Click "New Project" on the home page
2. Enter project name and select template (if available)
3. Click Create — project is ready for editing

### Importing a GitHub Repository

1. Navigate to project settings
2. Click "Import from GitHub"
3. Authorize GitHub OAuth
4. Select repository and branch
5. Confirm import — files are pulled and indexed

**Backend Process:**
- Inngest job fetches repository tree from GitHub
- Files are processed and stored in Convex
- Import status is tracked (importing → completed/failed)
- Large repositories are chunked for reliability

### Using the AI Assistant

**In Conversation:**
1. Open project workspace
2. Click "New Conversation"
3. Type natural language request:
   ```
   Create a React component for a user profile card with 
   avatar, name, email, and bio sections. Use Tailwind CSS for styling.
   ```
4. AI agent generates files and updates project
5. Review changes in file tree and editor

**Available Tools in Agent Context:**
- Create files: `Create new file at src/components/UserCard.tsx`
- List files: `Show me all files in the components folder`
- Read files: `Read the package.json file`
- Update file: `Add TypeScript types to the UserCard component`
- Web scraping: `Fetch the API documentation from https://api.example.com`

### Editing Code with AI

**Quick Edit (Cmd+J):**
1. Select code in editor
2. Press Cmd+J (or Cmd+K on some systems)
3. Type instruction: "Add error handling to this function"
4. AI modifies selection and applies changes

**Code Suggestions (Cmd+Shift+I):**
1. Place cursor in code
2. Press Cmd+Shift+I
3. AI suggests next lines or completions
4. Accept (Tab) or dismiss (Esc)

### Previewing Project

1. Click "Preview" in workspace
2. WebContainer boots Node.js environment
3. Project runs in browser with live terminal
4. Use terminal to run commands:
   ```bash
   npm install
   npm run dev
   ```
5. View output in preview panel

## Notes for Developers

### Code Organization Patterns

#### Feature-Based Architecture
```
src/features/[feature]/
  ├── components/        # UI components
  ├── hooks/             # Custom React hooks
  ├── schemas/           # Zod validation schemas
  ├── prompts/           # AI system prompts
  ├── inngest/           # Background jobs
  ├── utils/             # Helper functions
  ├── constants.ts       # Feature constants
  └── store/             # Zustand state (if needed)
```

#### Component Patterns
- **Server Components**: Default for data fetching and layout
- **Client Components**: Use `'use client'` for interactivity
- **API Routes**: Handle form submissions, webhooks, and external integrations
- **Type Safety**: All Convex data is typed via `_generated/dataModel.ts`

### Authentication Pattern
```typescript
// In API routes
import { auth } from '@clerk/nextjs/server';
const { userId } = await auth();

// In Convex mutations
const identity = await ctx.auth.getUserIdentity();
if (!identity) throw new Error('Unauthorized');

// Internal mutations use CONVEX_INTERNAL_KEY
const internalKey = process.env.CONVEX_INTERNAL_KEY;
```

### Convex Best Practices
- **Ownership Verification**: Always check `ownerId` or use indexes for multi-tenant queries
- **Validation**: Use Zod schemas before Convex calls
- **Error Handling**: Non-retriable errors use `NonRetriableError` in Inngest
- **Status Tracking**: Use discriminated unions for status fields
- **Indexes**: Critical for query performance on large tables

### AI Integration Patterns
- **System Prompts**: Stored in `src/features/[feature]/prompts/`
- **Temperature/Tokens**: Configured in feature constants
- **Tool Context**: Agents receive scoped access to project files
- **Error Recovery**: Mutations retry failed operations via Inngest

### State Management
- **Global State**: Zustand stores for editor state, UI mode, etc.
- **Form State**: React Hook Form for input validation
- **Server State**: Convex for persistent data (queries/mutations)
- **Client Cache**: Convex React hooks auto-manage subscriptions

### Code Style
- **Formatter**: Biome with tabs (width 2), line width 80
- **Linting**: ESLint rules configured in `biome.json`
- **TypeScript**: Strict mode enabled, `noEmit` for type checking
- **Imports**: Path aliases `@/*` for `src/*` directory

### Common Development Tasks

**Adding a New Project Feature:**
1. Create folder under `src/features/projects/`
2. Add component, hook, schema, or utility
3. Export from feature index if needed
4. Update Convex schema if data model changes
5. Run `npm run lint` and `npm run format`

**Creating a Convex Mutation:**
1. Add handler file in `convex/_projects/` (example)
2. Define args with Zod validation
3. Implement handler with ownership check
4. Export from `convex/projects.ts`
5. Call via `convex.mutation(api.projects.create, {...})`

**Integrating External API:**
1. Create client in `src/lib/[service]/`
2. Use `process.env.` for API keys
3. Wrap calls in try-catch with error handling
4. Consider rate limiting and caching
5. Log via Sentry for monitoring

## License

© 2026 Andrii Boyvan. All rights reserved.

This project is privately maintained. Contact the author for licensing inquiries.

---

**Documentation Last Updated:** February 2, 2026  
**Maintained By:** Andrii Boyvan  
**Repository:** aivirio
