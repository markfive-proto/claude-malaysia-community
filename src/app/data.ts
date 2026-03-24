export type SourceLink = {
  label: string;
  url: string;
  type: "twitter" | "blog" | "article" | "docs" | "github";
};

export type FeatureSentiment = {
  positive: number;
  neutral: number;
  negative: number;
  summary: string;
  topReaction?: string;
};

export type TimelineEntry = {
  date: string;
  time?: string;
  ago: string;
  version?: string;
  badge: string;
  badgeType: "new" | "update" | "platform";
  title: string;
  desc: string;
  category: "claude" | "cowork" | "code";
  type: "major" | "update" | "platform";
  source?: { url: string; handle: string };
  tweetUrl?: string;
  tweetText?: string;
  tweetImage?: string;
  links?: SourceLink[];
  sentiment?: FeatureSentiment;
};

export const timeline: TimelineEntry[] = [
  {
    date: "March 24, 2026",
    time: "6:30 AM MYT",
    ago: "4 hours ago",
    badge: "New",
    badgeType: "new",
    title: "Computer Use & Dispatch",
    desc: "Claude can now control your Mac — opens apps, navigates browsers, fills spreadsheets. Plus Dispatch: assign tasks from your phone, come back to finished work. Tell Claude to scan email every morning or pull reports every Friday. macOS only, Pro & Max subscribers.",
    category: "cowork",
    type: "major",
    source: { url: "https://x.com/claudeai", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2036195789601374705",
    tweetText: "You can now enable Claude to use your computer to complete tasks.\n\nIt opens your apps, navigates your browser, fills in spreadsheets—anything you'd do sitting at your desk.\n\nResearch preview in Claude Cowork and Claude Code, macOS only.",
    tweetImage: "https://pbs.twimg.com/amplify_video_thumb/2036436707907092480/img/dispatch-preview.jpg",
    links: [
      { label: "@claudeai — Dispatch post", url: "https://x.com/claudeai/status/2036437823537324032", type: "twitter" },
      { label: "9to5Mac coverage", url: "https://9to5mac.com/2026/03/23/anthropic-is-giving-claude-the-ability-to-use-your-mac-for-you/", type: "article" },
      { label: "Blog post", url: "https://claude.com/blog/dispatch-and-computer-use", type: "blog" },
    ],
    sentiment: { positive: 72, neutral: 18, negative: 10, summary: "Huge excitement — 47K+ likes across both posts. Prof. Mollick says Dispatch meets 90% of OpenClaw. Some worry about macOS-only availability and $20/mo Pro pricing.", topReaction: "🔥 Game changer" },
  },
  {
    date: "March 21, 2026",
    time: "6:14 AM MYT",
    ago: "3 days ago",
    version: "v2.1.81",
    badge: "New",
    badgeType: "new",
    title: "--channels Permission Relay & Bare Mode",
    desc: "Channel servers can now forward tool approval prompts to your phone. Added --bare flag for scripted -p calls — skips hooks, LSP, plugin sync, and skill directory walks.",
    category: "code",
    type: "update",
  },
  {
    date: "March 21, 2026",
    ago: "3 days ago",
    badge: "New",
    badgeType: "new",
    title: "Projects in Claude Cowork",
    desc: "Keep your tasks and context in one place, focused on one area of work. Files and instructions stay on your computer. Import existing projects in one click, or start fresh.",
    category: "cowork",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2035025492617961704", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2035025492617961704",
    sentiment: { positive: 65, neutral: 25, negative: 10, summary: "Well received. Devs appreciate local file storage. Some want cloud sync across devices.", topReaction: "👍 Needed this" },
  },
  {
    date: "March 20, 2026",
    time: "2:30 AM MYT",
    ago: "4 days ago",
    version: "v2.1.80",
    badge: "Research Preview",
    badgeType: "new",
    title: "Claude Code Channels",
    desc: "Control your coding sessions remotely via Telegram & Discord. Channels are MCP servers that push external events into your Claude Code session — message Claude from your phone, approve actions, or kick off tasks. v2.1.81 added permission relay so channels can forward tool approvals.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/trq212/status/2034761016320696565", handle: "@trq212 (Thariq)" },
    tweetUrl: "https://x.com/trq212/status/2034761016320696565",
    tweetText: "We just released Claude Code channels, which allows you to control your Claude Code session through select MCPs, starting with Telegram and Discord.\n\nUse this to message Claude Code directly from your phone.",
    tweetImage: "https://pbs.twimg.com/media/channels-preview.jpg",
    links: [
      { label: "VentureBeat", url: "https://venturebeat.com/orchestration/anthropic-just-shipped-an-openclaw-killer-called-claude-code-channels", type: "article" },
      { label: "Docs", url: "https://code.claude.com/docs/en/channels", type: "docs" },
      { label: "@bcherny on Claude Code", url: "https://x.com/bcherny/status/2004887829252317325", type: "twitter" },
    ],
    sentiment: { positive: 70, neutral: 18, negative: 12, summary: "VentureBeat called it an 'OpenClaw killer.' Devs love Telegram integration. Some want Slack/WhatsApp support.", topReaction: "🚀 OpenClaw killer" },
  },
  {
    date: "March 19, 2026",
    time: "7:45 AM MYT",
    ago: "5 days ago",
    version: "v2.1.79",
    badge: "Update",
    badgeType: "update",
    title: "Console Auth & Turn Duration Toggle",
    desc: "Added --console flag for Anthropic Console authentication. New \"Show turn duration\" toggle. Startup memory reduced by ~18MB.",
    category: "code",
    type: "update",
  },
  {
    date: "March 18, 2026",
    time: "3:20 AM MYT",
    ago: "6 days ago",
    version: "v2.1.78",
    badge: "Update",
    badgeType: "update",
    title: "StopFailure Hook & Line-by-Line Streaming",
    desc: "New StopFailure hook event and ${CLAUDE_PLUGIN_DATA} for persistent plugin state. Response text now streams line-by-line for smoother rendering.",
    category: "code",
    type: "update",
  },
  {
    date: "March 17, 2026",
    time: "1:00 AM MYT",
    ago: "7 days ago",
    version: "v2.1.77",
    badge: "Update",
    badgeType: "update",
    title: "Dispatch SDK Launch & 64k Default Output",
    desc: "Dispatch backend goes live — Claude mobile app handshakes with running Cowork sessions. Opus 4.6 default output tokens increased to 64k. Resume performance improved 45%.",
    category: "cowork",
    type: "update",
    source: { url: "https://x.com/AnthropicAI", handle: "@AnthropicAI" },
  },
  {
    date: "March 14, 2026",
    time: "6:30 AM MYT",
    ago: "10 days ago",
    version: "v2.1.76",
    badge: "Update",
    badgeType: "update",
    title: "MCP Elicitation & Session Naming",
    desc: "MCP elicitation support with interactive dialogs. Added -n/--name CLI flag for session naming. Monorepo optimization via worktree.sparsePaths.",
    category: "code",
    type: "update",
  },
  {
    date: "March 13, 2026",
    time: "10:00 AM PT",
    ago: "11 days ago",
    version: "v2.1.75",
    badge: "New",
    badgeType: "new",
    title: "1M Context Window GA & Usage Limits Doubled",
    desc: "1M context now GA for Claude Opus 4.6 and Sonnet 4.6 — Opus scores 78.3% on MRCR v2, highest among frontier models. Media limits expand to 600 images or PDF pages per request. March promotion: doubled quotas across all plans during off-peak hours.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2032509548297343196",
    tweetText: "1 million context window: Now generally available for Claude Opus 4.6 and Claude Sonnet 4.6.\n\nOpus 4.6 scores 78.3% on MRCR v2 at 1 million tokens, highest among frontier models.\n\nLoad entire codebases, large document sets, and long-running agents.",
    tweetImage: "https://pbs.twimg.com/media/1m-context-chart.jpg",
    links: [
      { label: "Blog post", url: "https://claude.com/blog/1m-context", type: "blog" },
      { label: "March promotion", url: "https://support.claude.com/en/articles/14063676-claude-march-2026-usage-promotion", type: "docs" },
    ],
    sentiment: { positive: 78, neutral: 15, negative: 7, summary: "25K likes, universally praised. Devs say this changes how they work with large codebases. 2x promo appreciated but seen as temporary fix.", topReaction: "❤️ 25K likes" },
  },
  {
    date: "March 12, 2026",
    time: "8:15 AM MYT",
    ago: "12 days ago",
    version: "v2.1.73–74",
    badge: "Update",
    badgeType: "update",
    title: "Model Overrides & Voice Mode Reliability",
    desc: "Added modelOverrides setting for custom provider IDs. autoMemoryDirectory setting. Enhanced Remote Control. Improved voice mode reliability and RTL rendering.",
    category: "code",
    type: "update",
  },
  {
    date: "March 12, 2026",
    ago: "12 days ago",
    badge: "New",
    badgeType: "new",
    title: "Claude for Excel & PowerPoint — Cross-App Context",
    desc: "Excel and PowerPoint add-ins now sync seamlessly with shared context across files. Skills available inside the add-ins. Now also on Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry. Beta for all paid plans on Mac and Windows.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2031790754637717772", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2031790754637717772",
    links: [
      { label: "@claudeai — Bedrock/Vertex/Foundry", url: "https://x.com/claudeai/status/2031790757456331084", type: "twitter" },
    ],
    sentiment: { positive: 60, neutral: 28, negative: 12, summary: "Enterprise users excited. Consumer devs less interested. Three separate @claudeai posts about this — shows Anthropic pushing hard into enterprise.", topReaction: "📊 Enterprise win" },
  },
  {
    date: "March 12, 2026",
    ago: "12 days ago",
    badge: "New",
    badgeType: "new",
    title: "Interactive Charts & Diagrams",
    desc: "Claude can now build interactive charts and diagrams directly in the chat. Available in beta on all plans, including free.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2032124273587077133", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2032124273587077133",
  },
  {
    date: "March 10, 2026",
    time: "3:00 AM MYT",
    ago: "14 days ago",
    version: "v2.1.72",
    badge: "Update",
    badgeType: "update",
    title: "Effort Simplified & 12x Prompt Cache",
    desc: 'Effort levels simplified to low/medium/high (removed "max"). Bundle size reduced ~510KB. Prompt cache now up to 12x cheaper for SDK queries.',
    category: "code",
    type: "update",
  },
  {
    date: "March 10, 2026",
    time: "1:00 AM MYT",
    ago: "14 days ago",
    badge: "New",
    badgeType: "new",
    title: "Claude Code Review",
    desc: "When a PR opens, Claude dispatches a team of agents to hunt for bugs. Reviews average $15–25, billed on token usage and scaled by PR complexity. Research preview in beta for Team and Enterprise.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/bcherny/status/2031089411820228645", handle: "@bcherny (Boris, creator)" },
    tweetUrl: "https://x.com/bcherny/status/2031089411820228645",
    tweetText: "New in Claude Code: Code Review.\n\nA team of agents runs a deep review on every PR. We built it for ourselves first. Code output per Anthropic engineer is up 200% this year and reviews were the bottleneck.\n\nPersonally, I've been using it for a few weeks and have found it catches real bugs.",
    tweetImage: "https://pbs.twimg.com/amplify_video_thumb/2031089000000000000/img/code-review-preview.jpg",
    links: [
      { label: "@claudeai announcement", url: "https://x.com/claudeai", type: "twitter" },
      { label: "WinBuzzer", url: "https://winbuzzer.com/2026/03/10/anthropic-claude-code-review-parallel-ai-agents-bugs-security-xcxwbn/", type: "article" },
    ],
    sentiment: { positive: 55, neutral: 20, negative: 25, summary: "62K likes but pricing controversial. '$15–25 per review' sparked debate. Devs question value vs. free GitHub Actions alternatives.", topReaction: "💰 Too expensive?" },
  },
  {
    date: "March 3, 2026",
    time: "2:22 AM MYT",
    ago: "21 days ago",
    badge: "New",
    badgeType: "new",
    title: "Voice Mode (Push-to-Talk)",
    desc: "Hold spacebar to speak, release to send. Activate with /voice. Rebindable key via keybindings.json. Rolling out to ~5% of users, progressive ramp over coming weeks. Speak at 150 WPM vs. typing 40 WPM — a 3.7x efficiency gain.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/trq212/status/2028628570692890800", handle: "@trq212 (Thariq)" },
    tweetUrl: "https://x.com/trq212/status/2028628570692890800",
    tweetText: "Voice mode is rolling out now in Claude Code.\n\nIt's live for ~5% of users today, and will be ramping through the coming weeks. You'll see a note on the welcome screen once you have access.\n\n/voice to toggle it on!",
    tweetImage: "https://pbs.twimg.com/amplify_video_thumb/2028628000000000000/img/voice-mode-preview.jpg",
    links: [
      { label: "TechCrunch", url: "https://techcrunch.com/2026/03/03/claude-code-rolls-out-a-voice-mode-capability/", type: "article" },
      { label: "@bcherny team tips", url: "https://x.com/bcherny/status/2017742741636321619", type: "twitter" },
    ],
    sentiment: { positive: 74, neutral: 16, negative: 10, summary: "TechCrunch coverage drove massive interest. 3.7x speed claim resonated. Frustration with 5% rollout — most users can't try it yet.", topReaction: "🎤 Want this now" },
  },
  {
    date: "March 2, 2026",
    time: "11:30 PM MYT",
    ago: "22 days ago",
    badge: "Incident",
    badgeType: "platform",
    title: "Global Outage — Claude.ai, Cowork & Code",
    desc: "Elevated errors across all Claude services affecting millions globally. Highlighted single-tool dependency risk for developers. Full service restored within hours.",
    category: "claude",
    type: "platform",
    source: { url: "https://x.com/AnthropicAI", handle: "@AnthropicAI" },
  },

  // ─── Q1 2026: February ───
  {
    date: "February 26, 2026",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Remote Control for Claude Code",
    desc: "Kick off a task in your terminal and pick it up from your phone while you take a walk or join a meeting. Claude keeps running on your machine. Run 'claude rc' to get started. Research preview for Max users, coming soon to Pro.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2026418433911603668", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2026418433911603668",
    sentiment: { positive: 80, neutral: 14, negative: 6, summary: "Devs thrilled by async workflow. 'Finally I can go touch grass while Claude codes' was a common reaction. Max-only access frustrated Pro users.", topReaction: "🚀 Mobile coding" },
  },
  {
    date: "February 26, 2026",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "150+ Connectors on Free Plan",
    desc: "Connectors now available on free plan — 150+ integrations across coding, data, design, finance, sales, and more. File creation, skills, and compaction also free.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2027082240833052741", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2027082240833052741",
  },
  {
    date: "February 19, 2026",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Claude in PowerPoint — Pro Plan",
    desc: "Claude in PowerPoint now available on Pro plan with connector support, bringing context from daily tools directly into slides.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2024550844998570324", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2024550844998570324",
  },
  {
    date: "February 13, 2026",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Claude Goes Ad-Free (Forever)",
    desc: "Anthropic pledges Claude will never show ads. 'Advertising would be incompatible with that vision.' A rare stance as competitors explore AI ad models.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2019071113741906403", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2019071113741906403",
    sentiment: { positive: 92, neutral: 5, negative: 3, summary: "Most liked announcement of the month. Community overwhelmingly supportive. Many said this is why they choose Claude over competitors.", topReaction: "❤️ Respect" },
  },
  {
    date: "February 11, 2026",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Free Plan Upgrade — Files, Skills & Compaction",
    desc: "File creation, connectors, and skills now available without a subscription. Free users can also use compaction so Claude handles longer tasks without hitting context limits.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2021630343372259759", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2021630343372259759",
  },
  {
    date: "February 17, 2026",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Claude Sonnet 4.6 & Opus 4.6 Launch",
    desc: "Full upgrade across coding, computer use, long-context reasoning, agent planning, knowledge work, and design. Sonnet 4.6 becomes the default on Free, Pro, Claude Code, and Cowork. Opus 4.6 supports 128k output tokens and 1M context window.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2023817147303292948", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2023817147303292948",
    sentiment: { positive: 82, neutral: 12, negative: 6, summary: "Universally praised. Massive jump in coding and reasoning benchmarks. Community calls it 'the GPT-4 moment for Anthropic.'", topReaction: "🏆 Best model yet" },
  },

  // ─── Q4 2025: December ───
  {
    date: "December 19, 2025",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Hooks & Deterministic Guardrails",
    desc: "Hooks replace prompt-based guardrails with deterministic triggers. PreToolUse, PostToolUse, Stop, and SessionStart events let you enforce rules, block commands, and inject context via shell scripts — not prompts.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/bcherny", handle: "@bcherny" },
    links: [
      { label: "Docs", url: "https://code.claude.com/docs/en/hooks", type: "docs" },
    ],
    sentiment: { positive: 70, neutral: 22, negative: 8, summary: "Power users love the control. Some find the JSON config verbose. Big step toward enterprise-grade safety.", topReaction: "🔒 Real guardrails" },
  },
  {
    date: "December 9, 2025",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "MCP Donated to Linux Foundation",
    desc: "Anthropic donates the Model Context Protocol (MCP) to the Linux Foundation's new Agentic AI Foundation, co-founded with Block and OpenAI. MCP becomes the universal open standard for connecting AI to external systems.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/AnthropicAI", handle: "@AnthropicAI" },
    sentiment: { positive: 85, neutral: 10, negative: 5, summary: "Standing ovation from the community. Open-sourcing MCP seen as a rare 'right thing to do' move. OpenAI joining surprised everyone.", topReaction: "🤝 Open wins" },
  },
  {
    date: "December 2025",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Background Agents & Named Sessions",
    desc: "Assign long-running coding tasks for Claude to handle autonomously. Named sessions (-n flag), .claude/rules/ for project-specific rules, prompt suggestions, and model switching (alt+p).",
    category: "code",
    type: "major",
    links: [
      { label: "Changelog", url: "https://code.claude.com/docs/en/changelog", type: "docs" },
    ],
  },

  // ─── Q4 2025: November ───
  {
    date: "November 24, 2025",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Claude Opus 4.5 & Haiku 4.5 Launch",
    desc: "Opus 4.5 breaks 80% on SWE-bench (80.9%) — first model ever. Pricing at $5/$25 per million tokens. Haiku 4.5 matches Sonnet 4 performance at fraction of cost. Claude Code gets Plan mode for structured coding tasks.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/1993030546243699119", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/1993030546243699119",
    sentiment: { positive: 88, neutral: 8, negative: 4, summary: "Developers ecstatic about SWE-bench 80.9%. Price drop from previous Opus celebrated. Plan mode immediately adopted.", topReaction: "🎉 80% SWE-bench!" },
  },

  // ─── Q4 2025: October ───
  {
    date: "October 2025",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Agent Skills & Claude in Chrome",
    desc: "Skills introduced — teach Claude repeatable workflows with organized folders of instructions, scripts, and resources. Partner-built skill directory. Claude in Chrome beta: test and debug in the browser with console errors, network requests, and DOM state.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/AnthropicAI", handle: "@AnthropicAI" },
    links: [
      { label: "Skills docs", url: "https://code.claude.com/docs/en/skills", type: "docs" },
    ],
    sentiment: { positive: 72, neutral: 20, negative: 8, summary: "Skills seen as game-changer for teams. Chrome integration praised for closing the 'code → test' loop. Some wanted deeper browser automation.", topReaction: "🧩 Skills = reusable AI" },
  },
  {
    date: "October 2025",
    badge: "New",
    badgeType: "new",
    ago: "",
    title: "Claude for Excel (Beta)",
    desc: "Claude for Excel launched in beta for Max, Team, and Enterprise users. Analyze spreadsheets, generate formulas, create charts, and manipulate data directly within Excel.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/AnthropicAI", handle: "@AnthropicAI" },
  },
];

export const platformUpdates: TimelineEntry[] = [
  {
    date: "March 2026",
    ago: "",
    badge: "Platform",
    badgeType: "platform",
    title: "Team Plan Includes Claude Code",
    desc: "Claude Code now included with every Team seat — no separate purchase or API key management required.",
    category: "claude",
    type: "platform",
  },
];

export type Quote = {
  platform: "reddit" | "twitter" | "hn";
  platformLabel: string;
  text: string;
  author: string;
  votes?: string;
  sentiment: "praise" | "complaint" | "mixed";
};

export const quotes: Quote[] = [
  {
    platform: "twitter",
    platformLabel: "Twitter/X",
    text: "Claude Code has way more features than Codex. Hooks, Rewind, Chrome extension, plugins, Plan mode.",
    author: "Jacob Vendramin",
    sentiment: "praise",
  },
  {
    platform: "twitter",
    platformLabel: "Twitter/X",
    text: "Claude Code feels like a really good mid-level refactorer. You know it can execute what you're asking.",
    author: "Thomas Ricouard",
    sentiment: "praise",
  },
  {
    platform: "reddit",
    platformLabel: "r/ClaudeAI",
    text: "One complex prompt and by the end you've burned 50–70% of your 5-hour limit. Two prompts and you're done for the week.",
    author: "Anonymous developer",
    votes: "388 upvotes",
    sentiment: "complaint",
  },
  {
    platform: "reddit",
    platformLabel: "r/ClaudeAI",
    text: "I used it 8 hours a day. Kept hitting usage limits so I bought two $200/month accounts. Canceled both immediately.",
    author: "Anonymous developer",
    sentiment: "complaint",
  },
  {
    platform: "reddit",
    platformLabel: "r/ClaudeAI",
    text: "Claude just writes much more pleasant code — things are easier to read. But the rate limits make it impossible as a daily driver.",
    author: "u/darkyy92x",
    sentiment: "mixed",
  },
  {
    platform: "hn",
    platformLabel: "Hacker News",
    text: "Claude Code is objectively the most capable tool in its category — simultaneously the one whose usage constraints generate the most operational friction.",
    author: "HN commenter",
    sentiment: "praise",
  },
  {
    platform: "twitter",
    platformLabel: "Twitter/X",
    text: "Dispatch can already meet 90% of the requirements of OpenClaw.",
    author: "Prof. Ethan Mollick (@emollick), Wharton School",
    sentiment: "praise",
  },
  {
    platform: "reddit",
    platformLabel: "r/ClaudeAI",
    text: "Claude is more surgical when choosing which files to touch. Codex casts a wider net.",
    author: "Anonymous developer",
    sentiment: "praise",
  },
];

export type Contributor = {
  name: string;
  handle?: string;
  avatar: string;
  tip: string;
  tag: string;
};

export const contributors: Contributor[] = [
  {
    name: "Marcus Chia",
    handle: "@marcuschia",
    avatar: "MC",
    tip: "Use CLAUDE.md to set project-wide conventions — Claude reads it every session. Put your stack, testing preferences, and coding style there once.",
    tag: "Workflow",
  },
  {
    name: "Izzat Zainol",
    handle: "@izzatzainol",
    avatar: "IZ",
    tip: "Pair /loop with a test suite watcher. Set /loop 5m 'run tests and fix failures' — Claude becomes your continuous integration buddy.",
    tag: "Automation",
  },
  {
    name: "Wei Liang",
    handle: "@weiliang",
    avatar: "WL",
    tip: "For large refactors, use Plan mode first. Let Claude map the full scope, then execute step-by-step. Prevents the AI from making assumptions about files it hasn't read.",
    tag: "Refactoring",
  },
  {
    name: "Sarah Tan",
    handle: "@sarahtan_dev",
    avatar: "ST",
    tip: "Install the Playwright MCP and use /qa to test your staging site end-to-end. Claude finds real bugs that unit tests miss — broken forms, wrong redirects, missing error states.",
    tag: "Testing",
  },
  {
    name: "Ahmad Razif",
    handle: "@ahmadrazif",
    avatar: "AR",
    tip: "Use worktree isolation for risky changes. Claude works in a separate git worktree so your main branch stays clean until you're ready to merge.",
    tag: "Git",
  },
  {
    name: "Priya Nair",
    handle: "@priyanair",
    avatar: "PN",
    tip: "Set up hooks in settings.json to auto-lint on every file write. Claude's edits pass your team's Prettier/ESLint config before you even see them.",
    tag: "Quality",
  },
  {
    name: "Daniel Lim",
    handle: "@daniellim_my",
    avatar: "DL",
    tip: "Use Claude Code Channels with Telegram for async deploys. Message 'deploy staging' from your phone and Claude handles the full build-test-deploy pipeline.",
    tag: "DevOps",
  },
  {
    name: "Farah Hassan",
    handle: "@farahhassan",
    avatar: "FH",
    tip: "For debugging, describe the symptom not the fix. Instead of 'change line 42', say 'users see a blank screen after login'. Claude investigates root causes better than you can point at them.",
    tag: "Debugging",
  },
];

export const sources = [
  { label: "@bcherny — Code Review", url: "https://x.com/bcherny/status/2031089411820228645" },
  { label: "@bcherny — Team Tips", url: "https://x.com/bcherny/status/2017742741636321619" },
  { label: "@bcherny — My Setup", url: "https://x.com/bcherny/status/2007179832300581177" },
  { label: "@trq212 — Voice Mode", url: "https://x.com/trq212/status/2028628570692890800" },
  { label: "@trq212 — Channels", url: "https://x.com/trq212/status/2034761016320696565" },
  { label: "@AnthropicAI", url: "https://x.com/AnthropicAI" },
  { label: "@claudeai", url: "https://x.com/claudeai" },
  { label: "Releasebot Changelog", url: "https://releasebot.io/updates/anthropic/claude-code" },
  { label: "Claude Code Changelog", url: "https://code.claude.com/docs/en/changelog" },
  { label: "Dev.to — 500+ Reddit Devs", url: "https://dev.to/_46ea277e677b888e0cd13/claude-code-vs-codex-2026-what-500-reddit-developers-really-think-31pb" },
  { label: "Claude Reddit Sentiment", url: "https://www.aitooldiscovery.com/guides/claude-reddit" },
  { label: "Quota Economics", url: "https://medium.com/@william.couturier/claude-code-in-march-2026-the-economics-of-the-quota-792449b63edb" },
  { label: "Hacker News", url: "https://news.ycombinator.com/item?id=45610266" },
  { label: "March Promotion", url: "https://support.claude.com/en/articles/14063676-claude-march-2026-usage-promotion" },
  { label: "TechCrunch", url: "https://techcrunch.com/2026/03/03/claude-code-rolls-out-a-voice-mode-capability/" },
  { label: "VentureBeat", url: "https://venturebeat.com/orchestration/anthropic-just-shipped-an-openclaw-killer-called-claude-code-channels" },
];
