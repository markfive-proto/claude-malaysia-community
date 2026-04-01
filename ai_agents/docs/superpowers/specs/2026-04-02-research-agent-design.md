# Research Agent with Custom Skills — Design Spec

## Summary

A Next.js web app providing a streaming chat interface for a research agent. Users choose between Anthropic (Claude) and Google Gemini models. The agent's capabilities are extended through a custom skill system where each skill is a `.md` file with frontmatter metadata and a markdown body serving as the system prompt.

## Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js Web App                │
│                                             │
│  ┌──────────┐  ┌──────────────────────────┐ │
│  │ Chat UI  │  │ Settings (model picker)  │ │
│  └────┬─────┘  └───────────┬──────────────┘ │
│       │                    │                │
│  ┌────▼────────────────────▼──────────────┐ │
│  │         API Route (/api/chat)          │ │
│  │  ┌─────────────┐ ┌──────────────────┐  │ │
│  │  │ Model Router │ │  Skill Loader   │  │ │
│  │  │ (Gemini /    │ │  (reads .md,    │  │ │
│  │  │  Anthropic)  │ │   builds tools  │  │ │
│  │  └──────┬──────┘ │   & prompts)    │  │ │
│  │         │        └────────┬─────────┘  │ │
│  │         ▼                 ▼            │ │
│  │    AI SDK streamText with tools +      │ │
│  │    system prompt from active skills    │ │
│  └────────────────────────────────────────┘ │
│                                             │
│  skills/                                    │
│    web-search.md                            │
│    summarize.md                             │
│    deep-research.md                         │
│    handlers/  (optional .ts for tools)      │
└─────────────────────────────────────────────┘
```

## Skill System

### Skill File Format

Every skill is a `.md` file in the `skills/` directory. The frontmatter defines metadata and configuration; the markdown body is the system prompt.

```markdown
---
name: web-search
description: Search the web for current information
mode: tool
model: gemini
parameters:
  query:
    type: string
    description: The search query
  maxResults:
    type: number
    description: Max results to return
    default: 5
handler: ./handlers/web-search.ts
---

You are a research assistant. When searching, always:
1. Use multiple search queries to triangulate information
2. Cite your sources with URLs
3. Flag conflicting information explicitly
```

### Skill Modes

| Mode | Purpose | What it contributes |
|------|---------|---------------------|
| `tool` | Callable function the agent can invoke | Tool definition + optional prompt |
| `behavior` | Changes agent persona/instructions | System prompt fragment |
| `both` | Tool + behavior change together | Both tool definition and prompt |

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique identifier for the skill |
| `description` | Yes | What the skill does (shown in UI and to the model) |
| `mode` | Yes | `tool`, `behavior`, or `both` |
| `model` | No | Force a specific model (`gemini` or `anthropic`) |
| `parameters` | No | Tool input parameters (required for `tool` and `both` modes) |
| `handler` | No | Path to a `.ts` file with custom tool execution logic (relative to `skills/`). If omitted for a `tool`/`both` mode skill, the tool is exposed to the model but has no server-side execution — the model generates the response from its own knowledge using the skill's prompt. |

### Skill Discovery

The skill loader scans `skills/*.md` at startup and parses each file into:
- A tool definition (from `parameters` + `handler` or built-in executor) for `tool`/`both` mode skills
- A system prompt fragment (from the markdown body) for `behavior`/`both` mode skills

### Adding Skills

Drop a `.md` file in `skills/`. No registry or config file needed. The loader picks it up automatically.

## Model & Provider Setup

### Providers

| Provider | Package | Env Variable |
|----------|---------|-------------|
| Anthropic | `@ai-sdk/anthropic` | `ANTHROPIC_API_KEY` |
| Google Gemini | `@ai-sdk/google` | `GOOGLE_GENERATIVE_AI_API_KEY` |

### Model Selection

- User picks a model from a dropdown in the chat UI
- The selection is sent with each message to the API route
- The API route instantiates the correct provider
- Skills can optionally override the model via the `model` frontmatter field

## Web App

### Stack

- Next.js App Router
- AI SDK `useChat` for streaming chat
- Tailwind CSS for styling

### Pages

- `/` — Chat interface with:
  - Streaming message thread
  - Input box
  - Model selector dropdown
  - Skills panel (toggle skills on/off)

### API Route

- `POST /api/chat` — receives `{ messages, model, activeSkills }`, streams response

### Chat Flow

1. User types a message
2. Client sends messages + selected model ID + list of active skill names
3. API route loads active skills, builds combined system prompt + tools
4. Calls AI SDK `streamText` with the selected model
5. Response streams back to the UI

### No Persistence

Messages live in client state only. No database, no auth, no server-side storage.

## File Structure

```
ai_agents/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Chat UI
│   └── api/
│       └── chat/
│           └── route.ts      # Streaming chat endpoint
├── lib/
│   ├── models.ts             # Model provider config
│   ├── skills/
│   │   ├── loader.ts         # Skill discovery & parsing
│   │   └── types.ts          # Skill type definitions
├── skills/                   # User-facing skills directory
│   ├── web-search.md
│   ├── summarize.md
│   ├── deep-research.md
│   └── handlers/             # Optional TypeScript handlers
│       └── web-search.ts
├── components/
│   ├── chat.tsx              # Chat message thread
│   ├── model-selector.tsx    # Model dropdown
│   └── skills-panel.tsx      # Skills toggle UI
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── .env.local                # API keys
```

## Environment Variables

```env
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=AI...
```
