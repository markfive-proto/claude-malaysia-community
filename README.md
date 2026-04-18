# Claude Malaysia Community — Pulse Check

Malaysia's Claude & Claude Code community hub. Live announcements, community posts, developer tips, and curated resources.

**Live:** [claude-malaysia-community.vercel.app](https://claude-malaysia-community.vercel.app)
**Facebook Group:** [Claude.ai Malaysia Community](https://www.facebook.com/groups/836579066085697) (579 members)

## Features

- **Announcements** — Latest Claude & Claude Code releases with embedded tweets and sentiment analysis
- **Community** — Facebook group posts and member tips with filterable tags
- **Resources** — Curated links to official docs, skills repos, and learning material
- **URL-addressable tabs** — `#announcements`, `#community`, `#resources` with browser history support
- **Individual post anchors** — Each post and tip has its own linkable URL (e.g. `#post-claude-design-preview`, `#tip-marcus-chia`)
- **SEO optimized** — Open Graph, Twitter Cards, JSON-LD structured data (WebSite + Organization + BreadcrumbList), sitemap, robots.txt

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS 4 + CSS custom properties
- **Fonts:** Newsreader (serif), Plus Jakarta Sans (sans), JetBrains Mono (mono)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/app/
  layout.tsx          # Root layout, metadata, JSON-LD
  page.tsx            # Homepage
  data.ts             # All content (timeline, posts, tips, resources)
  globals.css         # Design tokens
  sitemap.ts          # SEO sitemap
  robots.ts           # SEO robots config
  components/
    StickyNav.tsx      # Fixed navigation bar
    PageTabs.tsx       # Hash-based tab controller
    Timeline.tsx       # Announcements timeline
    Contributors.tsx   # Community posts & member tips
    Resources.tsx      # Curated resources
    Sentiment.tsx      # Sentiment analysis widget
```

## Founded by

[Marcus Chia](https://www.linkedin.com/in/marcusmark5/)
