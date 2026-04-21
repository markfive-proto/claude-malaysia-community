# ZeptoClaw Multi-Tenant Setup Design

**Date:** 2026-04-21  
**Status:** Approved

---

## Overview

Set up ZeptoClaw as a multi-tenant Telegram bot platform in `build_factory/zepto-tenants/`. The first tenant is `@zepto_zap_bot`. Future client bots are added with a single script command.

ZeptoClaw is a Rust-based AI agent runtime (~6MB binary, ~6MB RAM). It is a separate system from OpenClaw — not a replacement — optimized for running many lightweight bots cheaply.

---

## Folder Structure

```
build_factory/zepto-tenants/
├── tenants/
│   └── zepto-zap/
│       └── config.json          # gitignored — contains secrets
├── scripts/
│   ├── add-tenant.sh            # creates new tenant config (MiniMax-adapted)
│   └── generate-compose.sh      # rebuilds docker-compose from tenants/
├── docker-compose.multi-tenant.yml   # committed, no secrets
├── .env.example                 # documents required vars
└── .gitignore                   # ignores tenants/*/config.json
```

---

## Architecture

### Multi-Tenant Model

Each tenant is a fully isolated Docker container:
- Own process and filesystem
- Own `config.json` mounted read-only at `/data/config.json`
- Own named volume for persistent data (`/data/workspace`, sessions, memory)
- Own resource limits: 128M RAM, 0.25 CPU
- Health check on port 9090 per container
- No shared networking between tenants

Adding a new tenant = run `add-tenant.sh` + `generate-compose.sh` + `docker compose up -d`.

### Provider: MiniMax via Anthropic-Compatible Endpoint

ZeptoClaw has no native MiniMax provider, but MiniMax exposes an Anthropic-compatible API at `https://api.minimax.io/anthropic`. ZeptoClaw's built-in Anthropic provider supports a custom `api_base`, so:

```json
"providers": {
  "anthropic": {
    "api_key": "<MINIMAX_API_KEY>",
    "api_base": "https://api.minimax.io/anthropic"
  }
}
```

Model names use MiniMax format: `anthropic/MiniMax-M2.7`.

### Docker Image

Use the prebuilt image from GitHub Container Registry — no Rust build required:
```
ghcr.io/qhkm/zeptoclaw:latest
```

---

## Tenant Config Format

```json
{
  "agents": {
    "defaults": {
      "workspace": "/data/workspace",
      "model": "anthropic/MiniMax-M2.7",
      "max_tokens": 8192,
      "temperature": 0.7,
      "max_tool_iterations": 20
    }
  },
  "providers": {
    "anthropic": {
      "api_key": "<MINIMAX_API_KEY>",
      "api_base": "https://api.minimax.io/anthropic"
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "token": "<TELEGRAM_BOT_TOKEN>"
    }
  },
  "skills": { "enabled": true },
  "swarm": { "enabled": true, "max_depth": 1, "max_concurrent": 3 }
}
```

---

## Scripts

### `add-tenant.sh`
- Args: `<tenant-name> <bot-token> <minimax-api-key>`
- Validates tenant name (alphanumeric + hyphens)
- Creates `tenants/<name>/config.json` using Python's `json.dumps()` for safe escaping
- Uses MiniMax Anthropic-compatible endpoint instead of Anthropic default

### `generate-compose.sh`
- Scans `tenants/` directory
- For each subdirectory with a `config.json`, generates a Docker Compose service block
- Outputs complete `docker-compose.multi-tenant.yml`
- Uses YAML anchors (`x-zeptoclaw-defaults`) to avoid repetition

---

## First Tenant

| Field | Value |
|---|---|
| Name | `zepto-zap` |
| Bot | `@zepto_zap_bot` |
| Container | `zc-zepto-zap` |
| Volume | `zepto-zap-data` |
| Model | `MiniMax-M2.7` |

---

## Workflow to Add Future Clients

```bash
cd build_factory/zepto-tenants
./scripts/add-tenant.sh client-name "BOT_TOKEN" "MINIMAX_KEY"
./scripts/generate-compose.sh
docker compose -f docker-compose.multi-tenant.yml up -d
```

---

## Security

- `tenants/*/config.json` is gitignored — secrets never committed
- Config mounted read-only into containers
- Each container is fully isolated — a compromised bot cannot affect others
- Bot token shared in conversation should be treated as potentially exposed; rotate if concerned

---

## What This Is NOT

- Not a replacement for OpenClaw agents (Zeno, Robin, Nami, etc.)
- Not connected to OpenClaw's shared workspace or skill system
- Not suitable for complex multi-agent coordination tasks
