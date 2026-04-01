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
