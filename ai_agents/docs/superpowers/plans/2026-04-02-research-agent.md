# Research Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js streaming chat app with dual model support (Anthropic + Gemini) and a markdown-based custom skill system for a research agent.

**Architecture:** Next.js App Router with a single `/api/chat` route that loads `.md` skill files, builds tools + system prompts from them, and streams responses via AI SDK `streamText`. Client uses `useChat` from `@ai-sdk/react` with model selector and skills toggle panel.

**Tech Stack:** Next.js 15, AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/anthropic`, `@ai-sdk/google`), Tailwind CSS, Zod, gray-matter (frontmatter parsing)

---

## File Structure

```
ai_agents/
├── app/
│   ├── layout.tsx                 # Root layout with Tailwind, metadata
│   ├── page.tsx                   # Chat page (client component)
│   ├── globals.css                # Tailwind base styles
│   └── api/
│       └── chat/
│           └── route.ts           # POST handler: streamText with skills
├── lib/
│   ├── models.ts                  # Model registry and provider factory
│   └── skills/
│       ├── types.ts               # Skill type definitions
│       └── loader.ts              # Skill discovery, parsing, tool building
├── components/
│   ├── chat.tsx                   # Message thread display
│   ├── chat-input.tsx             # Input box with send button
│   ├── model-selector.tsx         # Model dropdown
│   └── skills-panel.tsx           # Skills toggle UI
├── skills/                        # User-facing skills directory
│   ├── web-search.md
│   ├── summarize.md
│   └── deep-research.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── .env.local
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `.env.local`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/marcuschia/Desktop/build_factory/ai_agents
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack --yes
```

- [ ] **Step 2: Install dependencies**

```bash
npm install ai @ai-sdk/react @ai-sdk/anthropic @ai-sdk/google gray-matter zod
```

- [ ] **Step 3: Create .env.local**

Create `.env.local` with placeholder keys:

```env
ANTHROPIC_API_KEY=your-anthropic-api-key-here
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key-here
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000`, default Next.js page renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with AI SDK dependencies"
```

---

### Task 2: Skill Type Definitions

**Files:**
- Create: `lib/skills/types.ts`

- [ ] **Step 1: Define skill types**

```typescript
// lib/skills/types.ts
import { type Tool } from "ai";

export type SkillMode = "tool" | "behavior" | "both";

export interface SkillFrontmatter {
  name: string;
  description: string;
  mode: SkillMode;
  model?: "anthropic" | "gemini";
  parameters?: Record<
    string,
    {
      type: string;
      description: string;
      default?: unknown;
    }
  >;
  handler?: string;
}

export interface ParsedSkill {
  frontmatter: SkillFrontmatter;
  prompt: string;
  filePath: string;
}

export interface LoadedSkill extends ParsedSkill {
  tool?: Tool;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/skills/types.ts
git commit -m "feat: add skill type definitions"
```

---

### Task 3: Skill Loader

**Files:**
- Create: `lib/skills/loader.ts`

- [ ] **Step 1: Implement skill loader**

```typescript
// lib/skills/loader.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { tool } from "ai";
import { z, type ZodTypeAny } from "zod";
import type { ParsedSkill, SkillFrontmatter, LoadedSkill } from "./types";

const SKILLS_DIR = path.join(process.cwd(), "skills");

function parseSkillFile(filePath: string): ParsedSkill {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as SkillFrontmatter,
    prompt: content.trim(),
    filePath,
  };
}

export function discoverSkills(): ParsedSkill[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseSkillFile(path.join(SKILLS_DIR, f)));
}

function paramTypeToZod(type: string): ZodTypeAny {
  switch (type) {
    case "number":
      return z.number();
    case "boolean":
      return z.boolean();
    default:
      return z.string();
  }
}

function buildZodSchema(
  parameters: NonNullable<SkillFrontmatter["parameters"]>
): z.ZodObject<Record<string, ZodTypeAny>> {
  const shape: Record<string, ZodTypeAny> = {};
  for (const [key, param] of Object.entries(parameters)) {
    let schema = paramTypeToZod(param.type).describe(param.description);
    if (param.default !== undefined) {
      schema = schema.optional().default(param.default) as ZodTypeAny;
    }
    shape[key] = schema;
  }
  return z.object(shape);
}

export function loadSkills(skillNames?: string[]): LoadedSkill[] {
  const allSkills = discoverSkills();
  const filtered = skillNames
    ? allSkills.filter((s) => skillNames.includes(s.frontmatter.name))
    : allSkills;

  return filtered.map((skill) => {
    const { frontmatter } = skill;
    const loaded: LoadedSkill = { ...skill };

    if (frontmatter.mode === "tool" || frontmatter.mode === "both") {
      if (frontmatter.parameters) {
        loaded.tool = tool({
          description: frontmatter.description,
          inputSchema: buildZodSchema(frontmatter.parameters),
          execute: async (args) => {
            if (frontmatter.handler) {
              const handlerPath = path.join(SKILLS_DIR, frontmatter.handler);
              const handlerModule = await import(handlerPath);
              return handlerModule.default(args);
            }
            return {
              result: `Tool "${frontmatter.name}" executed with args: ${JSON.stringify(args)}`,
              note: "No handler defined — model should use its own knowledge to respond.",
            };
          },
        });
      }
    }

    return loaded;
  });
}

export function buildSystemPrompt(skills: LoadedSkill[]): string {
  const parts: string[] = [
    "You are a research assistant. You help users find, analyze, and synthesize information.",
  ];

  for (const skill of skills) {
    if (
      (skill.frontmatter.mode === "behavior" ||
        skill.frontmatter.mode === "both") &&
      skill.prompt
    ) {
      parts.push(`\n## Skill: ${skill.frontmatter.name}\n\n${skill.prompt}`);
    }
  }

  return parts.join("\n");
}

export function buildTools(
  skills: LoadedSkill[]
): Record<string, NonNullable<LoadedSkill["tool"]>> {
  const tools: Record<string, NonNullable<LoadedSkill["tool"]>> = {};
  for (const skill of skills) {
    if (skill.tool) {
      tools[skill.frontmatter.name] = skill.tool;
    }
  }
  return tools;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/skills/loader.ts
git commit -m "feat: implement skill loader with frontmatter parsing"
```

---

### Task 4: Model Registry

**Files:**
- Create: `lib/models.ts`

- [ ] **Step 1: Implement model registry**

```typescript
// lib/models.ts
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export interface ModelOption {
  id: string;
  name: string;
  provider: "anthropic" | "gemini";
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "anthropic/claude-sonnet-4.6",
    name: "Claude Sonnet 4.6",
    provider: "anthropic",
  },
  {
    id: "anthropic/claude-haiku-4.5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "gemini",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
  },
];

export function getModel(modelId: string): LanguageModel {
  const [provider, ...rest] = modelId.split("/");
  const modelName = rest.join("/");

  switch (provider) {
    case "anthropic":
      return anthropic(modelName);
    case "google":
      return google(modelName);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/models.ts
git commit -m "feat: add model registry with Anthropic and Google providers"
```

---

### Task 5: Chat API Route

**Files:**
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: Implement the streaming chat endpoint**

```typescript
// app/api/chat/route.ts
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { getModel } from "@/lib/models";
import {
  loadSkills,
  buildSystemPrompt,
  buildTools,
} from "@/lib/skills/loader";

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    model: modelId,
    activeSkills,
  }: {
    messages: UIMessage[];
    model: string;
    activeSkills: string[];
  } = await req.json();

  const skills = loadSkills(activeSkills);
  const systemPrompt = buildSystemPrompt(skills);
  const tools = buildTools(skills);

  const modelToUse = getModel(modelId);

  const result = streamText({
    model: modelToUse,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: Object.keys(tools).length > 0 ? tools : undefined,
  });

  return result.toUIMessageStreamResponse();
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/chat/route.ts
git commit -m "feat: add streaming chat API route with skill integration"
```

---

### Task 6: Chat Components

**Files:**
- Create: `components/chat.tsx`, `components/chat-input.tsx`

- [ ] **Step 1: Create message display component**

```tsx
// components/chat.tsx
"use client";

import type { UIMessage } from "ai";

export function Chat({ messages }: { messages: UIMessage[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-zinc-500 mt-20">
          <h2 className="text-xl font-semibold mb-2">Research Agent</h2>
          <p>Ask me anything. I&apos;ll search, analyze, and summarize.</p>
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-100"
            }`}
          >
            {message.parts.map((part, i) => {
              if (part.type === "text") {
                return (
                  <p key={i} className="whitespace-pre-wrap">
                    {part.text}
                  </p>
                );
              }
              if (part.type.startsWith("tool-")) {
                return (
                  <div
                    key={i}
                    className="mt-2 text-xs bg-zinc-900 rounded p-2 font-mono"
                  >
                    <span className="text-zinc-400">Tool: </span>
                    <span className="text-green-400">
                      {part.type.replace("tool-", "")}
                    </span>
                    {"output" in part && (
                      <pre className="mt-1 text-zinc-300 overflow-x-auto">
                        {JSON.stringify(part.output, null, 2)}
                      </pre>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create chat input component**

```tsx
// components/chat-input.tsx
"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a research question..."
          disabled={disabled}
          className="flex-1 bg-zinc-800 text-zinc-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/chat.tsx components/chat-input.tsx
git commit -m "feat: add chat message display and input components"
```

---

### Task 7: Model Selector & Skills Panel

**Files:**
- Create: `components/model-selector.tsx`, `components/skills-panel.tsx`

- [ ] **Step 1: Create model selector**

```tsx
// components/model-selector.tsx
"use client";

import { AVAILABLE_MODELS } from "@/lib/models";

interface ModelSelectorProps {
  value: string;
  onChange: (modelId: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-zinc-800 text-zinc-100 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-700"
    >
      <optgroup label="Anthropic">
        {AVAILABLE_MODELS.filter((m) => m.provider === "anthropic").map(
          (m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          )
        )}
      </optgroup>
      <optgroup label="Google">
        {AVAILABLE_MODELS.filter((m) => m.provider === "gemini").map(
          (m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          )
        )}
      </optgroup>
    </select>
  );
}
```

- [ ] **Step 2: Create skills panel**

```tsx
// components/skills-panel.tsx
"use client";

interface SkillInfo {
  name: string;
  description: string;
  mode: string;
}

interface SkillsPanelProps {
  skills: SkillInfo[];
  activeSkills: string[];
  onToggle: (skillName: string) => void;
}

export function SkillsPanel({
  skills,
  activeSkills,
  onToggle,
}: SkillsPanelProps) {
  if (skills.length === 0) {
    return (
      <div className="text-zinc-500 text-sm p-4">
        No skills found. Add <code>.md</code> files to the{" "}
        <code>skills/</code> directory.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Skills
      </h3>
      {skills.map((skill) => (
        <label
          key={skill.name}
          className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={activeSkills.includes(skill.name)}
            onChange={() => onToggle(skill.name)}
            className="mt-1 accent-blue-500"
          />
          <div>
            <div className="text-sm text-zinc-100 font-medium">
              {skill.name}
            </div>
            <div className="text-xs text-zinc-400">{skill.description}</div>
            <span className="text-xs text-zinc-600 mt-0.5 inline-block">
              {skill.mode}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/model-selector.tsx components/skills-panel.tsx
git commit -m "feat: add model selector and skills panel components"
```

---

### Task 8: Skills API Route

**Files:**
- Create: `app/api/skills/route.ts`

The client needs to fetch the list of available skills to render the skills panel.

- [ ] **Step 1: Create skills listing endpoint**

```typescript
// app/api/skills/route.ts
import { discoverSkills } from "@/lib/skills/loader";

export async function GET() {
  const skills = discoverSkills();
  return Response.json(
    skills.map((s) => ({
      name: s.frontmatter.name,
      description: s.frontmatter.description,
      mode: s.frontmatter.mode,
    }))
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/skills/route.ts
git commit -m "feat: add skills listing API endpoint"
```

---

### Task 9: Main Chat Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement the chat page**

```tsx
// app/page.tsx
"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import { Chat } from "@/components/chat";
import { ChatInput } from "@/components/chat-input";
import { ModelSelector } from "@/components/model-selector";
import { SkillsPanel } from "@/components/skills-panel";

interface SkillInfo {
  name: string;
  description: string;
  mode: string;
}

export default function Page() {
  const [model, setModel] = useState("anthropic/claude-sonnet-4.6");
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [skills, setSkills] = useState<SkillInfo[]>([]);
  const transportRef = useRef<DefaultChatTransport | null>(null);

  if (!transportRef.current) {
    transportRef.current = new DefaultChatTransport({
      api: "/api/chat",
      body: () => ({ model, activeSkills }),
    });
  }

  const { messages, sendMessage, status } = useChat({
    transport: transportRef.current,
  });

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setSkills);
  }, []);

  const toggleSkill = (name: string) => {
    setActiveSkills((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <h1 className="text-lg font-bold">Research Agent</h1>
        </div>
        <div className="p-4 border-b border-zinc-800">
          <label className="text-sm text-zinc-400 block mb-2">Model</label>
          <ModelSelector value={model} onChange={setModel} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <SkillsPanel
            skills={skills}
            activeSkills={activeSkills}
            onToggle={toggleSkill}
          />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <Chat messages={messages} />
        <ChatInput
          onSend={(text) => sendMessage({ text })}
          disabled={status !== "ready"}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update layout for dark theme**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Research Agent",
  description: "AI research assistant with custom skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-900`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: implement main chat page with sidebar"
```

---

### Task 10: Default Skills

**Files:**
- Create: `skills/web-search.md`, `skills/summarize.md`, `skills/deep-research.md`

- [ ] **Step 1: Create web-search skill**

```markdown
---
name: web-search
description: Search the web for current information on any topic
mode: both
parameters:
  query:
    type: string
    description: The search query to find information about
  maxResults:
    type: number
    description: Maximum number of results to return
    default: 5
---

When the user asks about current events, recent developments, or anything that
requires up-to-date information, use the web-search tool to find relevant sources.

Always:
1. Formulate clear, specific search queries
2. Cite your sources with URLs when available
3. Cross-reference multiple sources when possible
4. Flag if information might be outdated or conflicting
```

- [ ] **Step 2: Create summarize skill**

```markdown
---
name: summarize
description: Summarize long documents or text into concise key points
mode: behavior
---

When summarizing content:
1. Start with a one-sentence TL;DR
2. List 3-5 key takeaways as bullet points
3. Note any caveats, limitations, or biases in the source
4. Keep the summary under 200 words unless the user asks for more detail
5. Preserve important numbers, dates, and proper nouns exactly
```

- [ ] **Step 3: Create deep-research skill**

```markdown
---
name: deep-research
description: Thorough multi-angle research with structured analysis
mode: behavior
---

When in deep research mode:
1. Break the question into sub-questions
2. Explore each sub-question from multiple angles
3. Identify areas of consensus and disagreement across sources
4. Present findings in a structured format with headers
5. Include a "Confidence" rating (High/Medium/Low) for each finding
6. End with "Open Questions" — things that remain unclear or need further investigation
7. Be transparent about the limits of your knowledge
```

- [ ] **Step 4: Commit**

```bash
git add skills/
git commit -m "feat: add default research skills (web-search, summarize, deep-research)"
```

---

### Task 11: End-to-End Verification

- [ ] **Step 1: Add API keys to .env.local**

Ensure `.env.local` has real API keys:

```env
ANTHROPIC_API_KEY=<real-key>
GOOGLE_GENERATIVE_AI_API_KEY=<real-key>
```

- [ ] **Step 2: Start dev server and test**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
1. Chat UI renders with sidebar (model selector, skills panel)
2. Three skills appear in the skills panel
3. Select a model, toggle on a skill, send a message
4. Response streams back correctly
5. Switch models and verify both Anthropic and Gemini work

- [ ] **Step 3: Run type check**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 4: Fix any issues found during verification**

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: resolve any issues found during verification"
```
