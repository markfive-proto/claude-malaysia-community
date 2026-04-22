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
    date: "April 22, 2026",
    time: "9:05 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Anthropic STEM Fellows Program",
    desc: "Anthropic launches STEM Fellows Program — experts across science and engineering fields work alongside Anthropic research teams on specific multi-month projects. AI will accelerate progress in these fields. Open to applicants globally; positions based in San Francisco.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/AnthropicAI/status/2046362119755727256", handle: "@AnthropicAI" },
    links: [
      { label: "Apply — greenhouse.io", url: "https://job-boards.greenhouse.io/AnthropicSTEMFellow", type: "article" },
    ],
    sentiment: { positive: 78, neutral: 15, negative: 7, summary: "664 reposts, 5.7K likes, 701K views. Community sees it as a bold move to bridge AI and scientific research. Excitement about working directly with Anthropic teams.", topReaction: "🎓 PhD-level AI research" },
  },
  {
    date: "April 21, 2026",
    ago: "Yesterday",
    badge: "New",
    badgeType: "new",
    title: "Live Artifacts in Claude Cowork",
    desc: "Claude can now build live artifacts: interactive dashboards and trackers connected to your apps and files. Open one any time and it refreshes with current data. Everything saved to a new Live Artifacts tab with version history. Available now on all paid plans.",
    category: "cowork",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2046328619249684989", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2046328619249684989",
    tweetText: "In Cowork, Claude can now build live artifacts: dashboards and trackers connected to your apps and files. Open one any time and it refreshes with current data.",
    links: [
      { label: "claude.com — Download Claude", url: "https://claude.com", type: "blog" },
    ],
    sentiment: { positive: 85, neutral: 10, negative: 5, summary: "Huge 5.6M views, 18K likes. Live dashboards connected to apps is seen as a major productivity leap. Version history praised. Community calls it 'Notion meets AI.'", topReaction: "🔥 Dashboard AI" },
  },
  {
    date: "April 20, 2026",
    time: "9:00 AM MYT",
    ago: "Today",
    badge: "Platform",
    badgeType: "platform",
    title: "Anthropic–Amazon $100B Compute Pact",
    desc: "Anthropic commits to spending over $100 billion on AWS technologies over the next decade. Amazon invests an additional $5B in Anthropic (total $13B+ committed), securing up to 5 gigawatts of Trainium chip capacity. Full Claude Platform now available directly within AWS — API, Bedrock, and custom Trainium2/Trainium3/Trainium4 access for training and running Claude models.",
    category: "claude",
    type: "platform",
    source: { url: "https://www.anthropic.com/news/anthropic-amazon-compute", handle: "Anthropic Blog" },
    links: [
      { label: "Anthropic Blog", url: "https://www.anthropic.com/news/anthropic-amazon-compute", type: "blog" },
      { label: "AWS Blog", url: "https://aws.amazon.com/blogs/aws/aws-weekly-roundup-claude-opus-4-7-in-amazon-bedrock-aws-interconnect-ga-and-more-april-20-2026/", type: "blog" },
    ],
  },
  {
    date: "April 20, 2026",
    time: "9:00 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Agent-Based Code Review for Claude Code",
    desc: "Multi-agent PR review system for Claude Code Team and Enterprise. Multiple AI reviewers analyze changes in parallel, identify bugs, verify findings, rank issues by severity, and post a summary with inline comments. Internal data shows substantive review comments jumped from 16% to 54%. Pro and Max users get 3 free ultrareviews. Also introduced: /ultrareview slash command and /autofix-pr CLI for automated PR fixes.",
    category: "code",
    type: "major",
    source: { url: "https://www.infoq.com/news/2026/04/claude-code-review/", handle: "InfoQ" },
    links: [
      { label: "InfoQ", url: "https://www.infoq.com/news/2026/04/claude-code-review/", type: "article" },
    ],
  },
  {
    date: "April 18, 2026",
    time: "9:00 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude Design by Anthropic Labs",
    desc: "Make prototypes, slides, and one-pagers by talking to Claude. Powered by Claude Opus 4.7's vision model. Claude reads your codebase and design files to build your team's design system and applies it automatically, keeping every project on-brand. Export to Canva, PDF, or PPTX. Research preview on Pro, Max, Team, and Enterprise plans — rolling out throughout the day.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2045156267690213649", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2045156267690213649",
    tweetText: "Introducing Claude Design by Anthropic Labs: make prototypes, slides, and one-pagers by talking to Claude. Powered by Claude Opus 4.7, our most capable vision model.",
    links: [
      { label: "claude.ai/design", url: "https://claude.ai/design", type: "blog" },
      { label: "Anthropic Blog", url: "https://anthropic.com", type: "blog" },
    ],
    sentiment: { positive: 88, neutral: 8, negative: 4, summary: "Massive 28M views and 94K likes. Community calls it ' Canva killer.' Design system feature resonates strongly. Export to Canva integration praised. Some question pricing for Teams.", topReaction: "🔥 Design killer" },
  },
  {
    date: "April 18, 2026",
    time: "9:00 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude for Word — Now on Pro & Max",
    desc: "Claude for Word is now available on Pro and Max plans alongside Opus 4.7. Draft, edit, and revise documents directly from the sidebar with tracked changes and cross-app context.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2045222254699511855", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2045222254699511855",
    tweetText: "Claude for Word is now available on Pro and Max plans to use alongside Opus 4.7.",
    links: [
      { label: "claude.com/claude-for-word", url: "https://claude.com/claude-for-word", type: "blog" },
    ],
    sentiment: { positive: 75, neutral: 15, negative: 10, summary: "6.3K likes, 333K views. Expands from Team/Enterprise beta to Pro/Max. Positive reception.", topReaction: "📄 Finally Pro!" },
  },
  {
    date: "April 18, 2026",
    time: "9:00 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude Code Hackathon — $100K API Credits",
    desc: "The Claude Code hackathon is back for Opus 4.7. Join builders from around the world for a week with the Claude Code team, with a prize pool of $100K in API credits. Apply by Sunday.",
    category: "code",
    type: "major",
    source: { url: "https://x.com/claudeai/status/2045248224659644654", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2045248224659644654",
    tweetText: "The Claude Code hackathon is back for Opus 4.7. Join builders from around the world for a week with the Claude Code team in the room, with a prize pool of $100K in API credits.",
    links: [
      { label: "Apply — cerebralvalley.ai", url: "https://cerebralvalley.ai/e/built-with-4", type: "article" },
    ],
    sentiment: { positive: 80, neutral: 12, negative: 8, summary: "3.7K likes, 273K views. Community excited — $100K pool is biggest yet. Deadline Sunday creates urgency.", topReaction: "🚀 Hackathon time!" },
  },
  {
    date: "April 14, 2026",
    time: "6:30 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude Code Desktop App Redesign",
    desc: "Completely rebuilt Claude Code desktop app for Mac and Windows. New sidebar for managing multiple active and recent sessions. Drag-and-drop workspace layout. Embedded terminal for running tests and builds. In-app file editor for quick modifications. Expanded preview pane supporting HTML files and PDFs alongside local app servers. Full plugin support aligned with Claude Code CLI. SSH sessions supported on Mac and Linux.",
    category: "code",
    type: "major",
    source: { url: "https://www.macrumors.com/2026/04/15/anthropic-rebuilds-claude-code-desktop-app/", handle: "MacRumors" },
    links: [
      { label: "MacRumors", url: "https://www.macrumors.com/2026/04/15/anthropic-rebuilds-claude-code-desktop-app/", type: "article" },
      { label: "VentureBeat", url: "https://venturebeat.com/orchestration/we-tested-anthropics-redesigned-claude-code-desktop-app-and-routines-heres-what-enterprises-should-know", type: "article" },
    ],
  },
  {
    date: "April 14, 2026",
    time: "6:30 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude Code Routines — Autonomous Automations",
    desc: "Routines enables Claude Code automations that run autonomously without an active session. Routines operate on Anthropic's web infrastructure and can be triggered by schedules, API calls, or GitHub events such as new pull requests. Available in research preview.",
    category: "code",
    type: "major",
    source: { url: "https://www.devops.com/claude-code-routines-anthropics-answer-to-unattended-dev-automation/", handle: "DevOps.com" },
    links: [
      { label: "DevOps.com", url: "https://www.devops.com/claude-code-routines-anthropics-answer-to-unattended-dev-automation/", type: "article" },
      { label: "VentureBeat", url: "https://venturebeat.com/orchestration/we-tested-anthropics-redesigned-claude-code-desktop-app-and-routines-heres-what-enterprises-should-know", type: "article" },
    ],
  },
  {
    date: "April 7, 2026",
    time: "6:30 AM MYT",
    ago: "Today",
    badge: "Platform",
    badgeType: "platform",
    title: "Project Glasswing — Securing Critical Software",
    desc: "Anthropic joins AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, the Linux Foundation, Microsoft, NVIDIA, and Palo Alto Networks in Project Glasswing — an initiative to secure the world's most critical software. Addresses advanced cybersecurity capabilities that made Claude Mythos too potent for public release.",
    category: "claude",
    type: "platform",
    source: { url: "https://www.anthropic.com/news", handle: "Anthropic Blog" },
    links: [
      { label: "Anthropic Blog — Project Glasswing", url: "https://www.anthropic.com/news", type: "blog" },
      { label: "Cryptobriefing — Mythos withheld", url: "https://cryptobriefing.com/anthropic-delays-claude-mythos-release-over-cybersecurity-concerns/", type: "article" },
    ],
  },
  {
    date: "April 16, 2026",
    time: "6:30 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude Opus 4.7 GA",
    desc: "Notable improvement on Opus 4.6 in advanced software engineering. Handles complex, long-running tasks with rigor and consistency, pays precise attention to instructions, and verifies its own outputs before reporting back. 13% resolution lift on Hex's 93-task coding benchmark. Improved multimodal vision supporting images up to 3.75 megapixels. Available on claude.ai, API, Amazon Bedrock, Google Cloud Vertex AI, and Microsoft Foundry at the same pricing as Opus 4.6.",
    category: "claude",
    type: "major",
    source: { url: "https://www.anthropic.com/news/claude-opus-4-7", handle: "Anthropic Blog" },
    tweetUrl: "https://www.anthropic.com/news/claude-opus-4-7",
    tweetText: "Our latest model, Claude Opus 4.7, is now generally available. Notable improvement on Opus 4.6 in advanced software engineering — users report being able to hand off their hardest coding work with confidence.",
    links: [
      { label: "Anthropic Blog", url: "https://www.anthropic.com/news/claude-opus-4-7", type: "blog" },
      { label: "API Docs", url: "https://platform.claude.com/docs/en/about-claude/models/overview", type: "docs" },
    ],
    sentiment: { positive: 78, neutral: 15, negative: 7, summary: "Strong early reception. Early testers report major gains on complex coding tasks, better instruction following, and improved vision. Same pricing praised. Some concern about prompt rewrites needed due to stricter instruction following.", topReaction: "🚀 Best coding model" },
  },
  {
    date: "April 11, 2026",
    time: "6:30 AM MYT",
    ago: "Today",
    badge: "New",
    badgeType: "new",
    title: "Claude for Word Beta",
    desc: "Draft, edit, and revise documents directly from the sidebar. Claude preserves your formatting and edits appear as tracked changes. Available on Team and Enterprise plans. Shares context with Claude for Excel and PowerPoint for cross-document conversations.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2042670341915295865",
    tweetText: "Claude for Word is now in beta. Draft, edit, and revise documents directly from the sidebar. Claude preserves your formatting, and edits appear as tracked changes. Available on Team and Enterprise plans.",
    links: [
      { label: "claude.com - Claude for Word", url: "https://claude.com/claude-for-word", type: "blog" },
    ],
    sentiment: { positive: 72, neutral: 18, negative: 10, summary: "Huge excitement - 31K+ likes, 12M views. Users excited about tracked changes and cross-app context.", topReaction: "Game changer" },
  },
  {
    date: "April 10, 2026",
    time: "6:30 AM MYT",
    ago: "Yesterday",
    badge: "New",
    badgeType: "new",
    title: "Claude Cowork GA",
    desc: "Claude Cowork is now generally available to all paid plans. Enterprise features include role-based access controls, group spend limits, usage analytics, and expanded OpenTelemetry. Available on macOS and Windows.",
    category: "cowork",
    type: "major",
    source: { url: "https://x.com/claudeai", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2042273755485888810",
    tweetText: "Claude Cowork is now generally available to all paid plans. For Enterprise, we are adding role-based access controls, group spend limits, usage analytics, and expanded OpenTelemetry.",
    links: [
      { label: "claude.com - Making Claude Cowork ready for enterprise", url: "https://claude.com/making-claude-cowork-ready-for-enterprise", type: "blog" },
    ],
    sentiment: { positive: 70, neutral: 20, negative: 10, summary: "Strong positive reception - 10K+ likes. Enterprise admins excited about RBAC and analytics.", topReaction: "Finally GA" },
  },
  {
    date: "April 10, 2026",
    time: "6:15 AM MYT",
    ago: "Yesterday",
    badge: "New",
    badgeType: "new",
    title: "Advisor Strategy on Platform",
    desc: "Pair Opus as an advisor with Sonnet or Haiku as an executor. Get near Opus-level intelligence in agents at a fraction of the cost. Sonnet with Opus advisor scored 2.7 percentage points higher on SWE-bench Multilingual while costing 11.9% less per task.",
    category: "claude",
    type: "major",
    source: { url: "https://x.com/claudeai", handle: "@claudeai" },
    tweetUrl: "https://x.com/claudeai/status/2042308622181339453",
    tweetText: "We're bringing the advisor strategy to the Claude Platform. Pair Opus as an advisor with Sonnet or Haiku as an executor, and get near Opus-level intelligence in your agents at a fraction of the cost.",
    links: [
      { label: "claude.com - The advisor strategy", url: "https://claude.com/the-advisor-strategy", type: "blog" },
    ],
    sentiment: { positive: 75, neutral: 15, negative: 10, summary: "Very positive - 38K+ likes, 4.5M views. Cost efficiency + intelligence boost is compelling.", topReaction: "Mind blown" },
  },
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

export type CommunityPost = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  summary: string;
  tags: string[];
  fbUrl: string;
  engagement?: { likes: number; comments: number };
};

export const communityPosts: CommunityPost[] = [
  {
    id: "claude-design-preview",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 18, 2026",
    summary:
      "Claude Design is out now! AI design/prototyping tool with Opus 4.7 — prototype mode, slide/presentation mode, design system generation from GitHub repos, team collaboration, import/export (fig, PDF, PPTX, HTML, Canva, Claude Code handoff). Separate weekly limits from regular sessions.",
    tags: ["Claude Design", "Opus 4.7"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 2, comments: 0 },
  },
  {
    id: "opus-47-token-test",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 17, 2026",
    summary:
      "Tested Opus 4.7 with max effort — 70% usage on 5x plan after one hour of autonomous work. Built 3D mockups, logo customizer, simple checkout. Compared to Gemini 3.1 Pro which failed the same prompt. \"More autonomous. More self-correcting. More relentless.\"",
    tags: ["Opus 4.7", "Benchmark"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
  {
    id: "opus-47-release",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 16, 2026",
    summary:
      "Opus 4.7 release breakdown: 13-14% coding benchmark jump, better vision for technical diagrams, cyber safeguards with differential capability reduction, same pricing ($5/M input, $25/M output). Available on API, Bedrock, Vertex AI, and Microsoft Foundry.",
    tags: ["Opus 4.7", "Release"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
  {
    id: "opus-advisor-pattern",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 14, 2026",
    summary:
      "Pair Opus as advisor with Sonnet/Haiku as executor. Executor runs tasks and tool-calls Opus only when stuck — like asking a senior. Keeps costs down while preserving frontier reasoning where it matters. Beta on Claude platform developer API.",
    tags: ["Workflow", "Cost Optimization"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
  {
    id: "managed-agents",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 12, 2026",
    summary:
      "Claude Managed Agents — production infrastructure for AI agents at scale. Early customers: Notion (parallel workspace tasks), Asana (AI teammates), Rakuten (specialist agents in under a week), Sentry (auto-fix PRs), Vibecode (10x faster agent setup).",
    tags: ["Managed Agents", "Platform"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
  {
    id: "daily-workflow",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 10, 2026",
    summary:
      "Daily workflow: 2-4 parallel projects, 3-8 PRs daily, 3-6 dispatched AI agents for research. AI flags PR issues, resolves conflicts. Team culture: discuss feature → AI scaffold → immediately tinker. Avoid starting in Figma — explore with AI first, then refine.",
    tags: ["Workflow", "Team Culture"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
  {
    id: "computer-use",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 6, 2026",
    summary:
      "Claude Computer Use announced — assign tasks from your phone, come back to finished work. Uses connected apps first (Slack, Calendar), requests app access when no connector exists. Permissions: screenshots, mouse/keyboard, full app access. Available on Pro and Max plans.",
    tags: ["Computer Use", "New Feature"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
  {
    id: "max-plan-usage",
    author: "Marcus Chia",
    avatar: "MC",
    date: "April 4, 2026",
    summary:
      "On the Max 5X plan — burned through entire usage quota in 3 hours on Default setting. Switched to Opus Plan Mode. Now with Opus 4.6 and 1M context window, testing how fast usage gets consumed within the 5-hour reset interval.",
    tags: ["Usage", "Max Plan"],
    fbUrl: "https://www.facebook.com/groups/836579066085697/",
    engagement: { likes: 0, comments: 0 },
  },
];

export type Contributor = {
  id: string;
  name: string;
  handle?: string;
  avatar: string;
  tip: string;
  tag: string;
};

export const contributors: Contributor[] = [
  {
    id: "marcus-chia",
    name: "Marcus Chia",
    handle: "@marcuschia",
    avatar: "MC",
    tip: "Use CLAUDE.md to set project-wide conventions — Claude reads it every session. Put your stack, testing preferences, and coding style there once.",
    tag: "Workflow",
  },
  {
    id: "izzat-zainol",
    name: "Izzat Zainol",
    handle: "@izzatzainol",
    avatar: "IZ",
    tip: "Pair /loop with a test suite watcher. Set /loop 5m 'run tests and fix failures' — Claude becomes your continuous integration buddy.",
    tag: "Automation",
  },
  {
    id: "wei-liang",
    name: "Wei Liang",
    handle: "@weiliang",
    avatar: "WL",
    tip: "For large refactors, use Plan mode first. Let Claude map the full scope, then execute step-by-step. Prevents the AI from making assumptions about files it hasn't read.",
    tag: "Refactoring",
  },
  {
    id: "sarah-tan",
    name: "Sarah Tan",
    handle: "@sarahtan_dev",
    avatar: "ST",
    tip: "Install the Playwright MCP and use /qa to test your staging site end-to-end. Claude finds real bugs that unit tests miss — broken forms, wrong redirects, missing error states.",
    tag: "Testing",
  },
  {
    id: "ahmad-razif",
    name: "Ahmad Razif",
    handle: "@ahmadrazif",
    avatar: "AR",
    tip: "Use worktree isolation for risky changes. Claude works in a separate git worktree so your main branch stays clean until you're ready to merge.",
    tag: "Git",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    handle: "@priyanair",
    avatar: "PN",
    tip: "Set up hooks in settings.json to auto-lint on every file write. Claude's edits pass your team's Prettier/ESLint config before you even see them.",
    tag: "Quality",
  },
  {
    id: "daniel-lim",
    name: "Daniel Lim",
    handle: "@daniellim_my",
    avatar: "DL",
    tip: "Use Claude Code Channels with Telegram for async deploys. Message 'deploy staging' from your phone and Claude handles the full build-test-deploy pipeline.",
    tag: "DevOps",
  },
  {
    id: "farah-hassan",
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

export type Resource = {
  title: string;
  desc: string;
  url: string;
  category: "official" | "skills" | "marketing" | "community" | "learning";
  stars?: string;
  author?: string;
};

export const resources: Resource[] = [
  // Official
  {
    title: "Everything Claude Code",
    desc: "The comprehensive guide to Claude Code — setup, tips, workflows, CLAUDE.md examples, and advanced usage patterns.",
    url: "https://github.com/affaan-m/everything-claude-code",
    category: "official",
    author: "affaan-m",
  },
  {
    title: "Anthropic Skills (Official)",
    desc: "Official public repository of Agent Skills by Anthropic. The reference implementation for building and sharing skills.",
    url: "https://github.com/anthropics/skills",
    category: "official",
    author: "Anthropic",
  },
  {
    title: "Claude Code (Official)",
    desc: "Official Claude Code repository — changelog, releases, issue tracker, and CLAUDE.md reference.",
    url: "https://github.com/anthropics/claude-code",
    category: "official",
    author: "Anthropic",
  },
  {
    title: "Claude Code Docs",
    desc: "Official documentation for Claude Code — hooks, skills, channels, MCP, plugins, and configuration.",
    url: "https://code.claude.com/docs/en",
    category: "official",
    author: "Anthropic",
  },

  // Skills
  {
    title: "Awesome Claude Code",
    desc: "Curated list of skills, hooks, slash-commands, agent orchestrators, applications, and plugins for Claude Code.",
    url: "https://github.com/hesreallyhim/awesome-claude-code",
    category: "skills",
    stars: "2.5k+",
    author: "hesreallyhim",
  },
  {
    title: "Awesome Claude Skills",
    desc: "Covers skills officially announced and available across Claude.ai, Code, and API. Community contributions welcome.",
    url: "https://github.com/travisvn/awesome-claude-skills",
    category: "skills",
    stars: "1.8k+",
    author: "travisvn",
  },
  {
    title: "192+ Claude Skills Collection",
    desc: "Engineering, DevOps, marketing, product, compliance, and C-level advisory skills. Works with Claude Code, Codex, Gemini CLI, Cursor, and more.",
    url: "https://github.com/alirezarezvani/claude-skills",
    category: "skills",
    stars: "800+",
    author: "alirezarezvani",
  },
  {
    title: "Claude Skills Collection",
    desc: "Official and community-built skills — productivity, creativity, coding, and more. Modular and easy to install.",
    url: "https://github.com/abubakarsiddik31/claude-skills-collection",
    category: "skills",
    author: "abubakarsiddik31",
  },

  // Marketing
  {
    title: "Marketing Skills for Claude Code",
    desc: "CRO, copywriting, SEO, analytics, and growth engineering skills for technical marketers and founders.",
    url: "https://github.com/coreyhaines31/marketingskills",
    category: "marketing",
    author: "coreyhaines31",
  },
  {
    title: "AI Marketing Suite",
    desc: "15 marketing skills with parallel subagents — website audits, copy generation, email sequences, ad campaigns, content calendars, and client-ready PDF reports.",
    url: "https://github.com/zubair-trabzada/ai-marketing-claude",
    category: "marketing",
    author: "zubair-trabzada",
  },

  // Community
  {
    title: "Awesome Claude (Directory)",
    desc: "Claude AI resources directory — tools, integrations, tutorials, and community projects. Searchable and categorized.",
    url: "https://awesomeclaude.ai",
    category: "community",
  },
  {
    title: "ClaudeLog",
    desc: "Claude Code docs, guides, tutorials, best practices, and a detailed changelog tracker.",
    url: "https://claudelog.com",
    category: "community",
  },
  {
    title: "How Boris Uses Claude Code",
    desc: "The creator of Claude Code's personal workflow — 5 parallel sessions, CLAUDE.md discipline, and system notifications.",
    url: "https://howborisusesclaudecode.com",
    category: "learning",
    author: "Boris Cherny",
  },

  // Learning
  {
    title: "Building Claude Code — Pragmatic Engineer",
    desc: "Deep dive interview with Boris Cherny on building Claude Code. Architecture decisions, team workflows, and lessons learned.",
    url: "https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny",
    category: "learning",
    author: "Gergely Orosz",
  },
  {
    title: "Claude Code 2025 Summary",
    desc: "From launch to beast — full timeline of features, milestones, and the evolution of Claude Code throughout 2025.",
    url: "https://claudefa.st/blog/guide/changelog",
    category: "learning",
  },
];
