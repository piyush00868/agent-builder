# Agent Builder

Agent Builder is a web application for creating, configuring, and testing AI agents. It provides a visual workflow canvas, reusable agent templates, built-in and custom HTTP tools, and GitHub OAuth sign-in.

## Features

- Create blank agents or start from the included weather, web research, travel, writing, coding, and PR review templates.
- Edit an agent on a Start → Agent → End canvas and save its definition and layout.
- Configure model instructions, memory settings, and tool capabilities.
- Use calculator, weather, web search, webpage extraction, and GitHub tools; define custom HTTP tools with parameters, headers, and request bodies.
- Test an agent in chat. Conversations, messages, and tool events are stored in PostgreSQL.
- Sign in with GitHub. GitHub tools use the connected account’s OAuth token.

## Tech stack

- Next.js App Router, React, and TypeScript
- PostgreSQL with Prisma ORM and the Prisma PostgreSQL driver adapter
- Better Auth with GitHub OAuth
- LangChain with Groq for agent runs; Zod for tool input schemas
- React Flow for the canvas, Zustand for canvas state, and TanStack Query for client data fetching
- Tailwind CSS 4 and the project’s Base UI/shadcn components
- Tavily for web search and webpage extraction; Open-Meteo for weather data

## Architecture

The App Router serves the application pages and API routes. Authenticated server actions manage agents, while Prisma stores user, agent, conversation, and message data in PostgreSQL. The builder keeps the editable canvas state in Zustand and serializes it into the saved agent definition. Test Chat sends the current agent definition to the run endpoint, which loads configured tools from the registry and runs the agent with LangChain and Groq. Run and tool events are returned as server-sent events.

## Project structure

```text
app/
  (auth)/                 Sign-in page and layout
  (dashboard)/agents/     Agent list, creation, and builder pages
  api/auth/               Better Auth route handler
  api/agents/[agentId]/runs/  Agent run endpoint
components/                Shared UI and providers
lib/                       Auth, database, and shared utilities
modules/
  agents/                  Agent actions, templates, hooks, and pages
  auth/                    Auth actions and user controls
  builder/                 Canvas, settings, tools, serialization, and store
  playground/              Test chat and SSE client
  runtime/                 Agent execution and workflow graph utilities
  tools/                   Built-in, GitHub, and custom HTTP tools
  workflows/               Workflow schema and legacy definition migration
prisma/                    Prisma schema and database migrations
```

## Requirements

- Node.js 20 or newer
- pnpm 11.9.0 (the version declared in `package.json`)
- A PostgreSQL database
- A GitHub OAuth application
- A Groq API key to run agents
- A Tavily API key if using Web Search or Read Webpage

## Installation

1. Install dependencies and create a local environment file:

   ```bash
   pnpm install
   cp .env.example .env
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

2. Set the environment variables below. Generate a Better Auth secret, for example, with:

   ```bash
   openssl rand -base64 32
   ```

3. Configure the GitHub OAuth app’s callback URL as `http://localhost:3000/api/auth/callback/github` for local development.

4. Generate the Prisma client and apply the migrations:

   ```bash
   pnpm exec prisma generate
   pnpm exec prisma migrate dev
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000). Sign in with GitHub; successful sign-in redirects to `/agents`.

## Environment variables

Copy `.env.example` to `.env` and provide:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `BETTER_AUTH_SECRET` | Yes | Secret used by Better Auth to sign and encrypt auth data. Generate a unique value for each environment. |
| `BETTER_AUTH_URL` | Yes | Application’s base URL, such as `http://localhost:3000` locally. |
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth application client ID. |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth application client secret. |
| `GROQ_API_KEY` | Yes, to run agents | API key used by the LangChain Groq model client. |
| `TAVILY_API_KEY` | Optional | Enables the Web Search and Read Webpage tools. |

The weather tool uses Open-Meteo and does not require an API key. GitHub tools use the GitHub OAuth account and token.

## Usage

1. Sign in with GitHub and open **My Agents** at `/agents`.
2. Choose **Create Agent**, then start blank or select a template.
3. On the builder page, edit the Agent node’s instructions and model. Use **Tools** to attach built-in or custom HTTP tools; attached tools appear on the Agent node.
4. Configure custom tool parameters, URL, method, headers, and body in Settings. Configure repository defaults for GitHub tools in the GitHub settings.
5. Select **Save** to persist the agent definition and canvas layout.
6. Open **Test Chat** to run the current canvas configuration.

## API endpoints

### `POST /api/agents/{agentId}/runs`

Runs the supplied agent definition for the authenticated owner of `{agentId}`. The request body is JSON:

```json
{
  "message": "What is the weather in Delhi?",
  "conversationId": "optional-existing-conversation-id",
  "definition": {
    "schemaVersion": 1,
    "instructions": "You are a helpful assistant.",
    "model": { "provider": "groq", "modelId": "llama-3.3-70b-versatile" },
    "tools": [],
    "memory": { "enabled": false },
    "limits": { "maxToolCalls": 5, "timeoutMs": 60000 }
  }
}
```

The response is a server-sent event stream. Events include `text_delta`, `tool_started`, `tool_completed`, `run_failed`, and `run_completed`. The `definition` field uses the agent definition format from `modules/agents/lib/definition.ts`.

### `/api/auth/*`

GET and POST requests are handled by Better Auth, including the GitHub OAuth callback at `/api/auth/callback/github`.

## Development commands

```bash
pnpm dev                 # Start the development server
pnpm lint                # Run ESLint
pnpm build               # Create a production build
pnpm start               # Serve the production build
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

## Deployment

Deploy as a Node.js Next.js application with a reachable PostgreSQL database. This repository does not include a Dockerfile or provider-specific deployment manifest.

1. Configure the production environment variables listed above in the hosting platform. Use a unique `BETTER_AUTH_SECRET`, a production `DATABASE_URL`, and the public HTTPS origin for `BETTER_AUTH_URL`.
2. Set the GitHub OAuth application callback URL to `<BETTER_AUTH_URL>/api/auth/callback/github`.
3. Install dependencies, generate Prisma Client, and apply committed migrations:

   ```bash
   pnpm install --frozen-lockfile
   pnpm exec prisma generate
   pnpm exec prisma migrate deploy
   ```

4. Build and start the application:

   ```bash
   pnpm build
   pnpm start
   ```

The host must provide the configured environment variables to both the build and running application. Add `TAVILY_API_KEY` when deploying agents that use Web Search or Read Webpage.
