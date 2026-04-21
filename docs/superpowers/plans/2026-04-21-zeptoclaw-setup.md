# ZeptoClaw Multi-Tenant Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `build_factory/zepto-tenants/` with scripts, first tenant config, and a running ZeptoClaw Docker container for `@zepto_zap_bot`.

**Architecture:** Prebuilt `ghcr.io/qhkm/zeptoclaw:latest` Docker image. Each tenant is an isolated container with its own `config.json` (gitignored). Two shell scripts manage the lifecycle: `add-tenant.sh` creates tenant configs, `generate-compose.sh` rebuilds the Docker Compose file from the `tenants/` directory. MiniMax is wired via ZeptoClaw's Anthropic provider with a custom `api_base`.

**Tech Stack:** Docker Compose v5, ZeptoClaw (Rust, prebuilt), MiniMax API (Anthropic-compatible endpoint), Telegram Bot API, Python 3 (for JSON generation in scripts), Bash.

---

## Files to Create

| File | Purpose |
|---|---|
| `zepto-tenants/.gitignore` | Ignores `tenants/*/config.json` |
| `zepto-tenants/.env.example` | Documents the two required secrets |
| `zepto-tenants/scripts/add-tenant.sh` | Creates a new tenant config |
| `zepto-tenants/scripts/generate-compose.sh` | Rebuilds docker-compose from tenants/ |
| `zepto-tenants/tenants/zepto-zap/config.json` | First tenant config (gitignored) |
| `zepto-tenants/docker-compose.multi-tenant.yml` | Generated compose file (committed) |

All paths below are relative to `build_factory/zepto-tenants/`.

---

## Task 1: Scaffold directory and gitignore

**Files:**
- Create: `zepto-tenants/.gitignore`
- Create: `zepto-tenants/.env.example`

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p /Users/marcuschia/Desktop/build_factory/zepto-tenants/tenants/zepto-zap
mkdir -p /Users/marcuschia/Desktop/build_factory/zepto-tenants/scripts
```

- [ ] **Step 2: Write .gitignore**

Create `zepto-tenants/.gitignore`:

```
# Tenant configs contain secrets — never commit
tenants/*/config.json

# Docker volumes and runtime artifacts
.data/
```

- [ ] **Step 3: Write .env.example**

Create `zepto-tenants/.env.example`:

```bash
# ZeptoClaw tenant secrets — copy values into scripts/add-tenant.sh calls
# Never commit actual values

# MiniMax API key (from https://api.minimax.io)
MINIMAX_API_KEY=your-minimax-api-key-here

# Telegram bot token (from @BotFather)
# First tenant: @zepto_zap_bot
TELEGRAM_BOT_TOKEN=1234567890:AABBCCDDEEFFaabbccddeeff
```

- [ ] **Step 4: Verify structure**

```bash
ls /Users/marcuschia/Desktop/build_factory/zepto-tenants/
```

Expected output:
```
.env.example  .gitignore  scripts/  tenants/
```

- [ ] **Step 5: Commit**

```bash
cd /Users/marcuschia/Desktop/build_factory
git add zepto-tenants/.gitignore zepto-tenants/.env.example
git commit -m "feat(zepto): scaffold zepto-tenants directory structure"
```

---

## Task 2: Write add-tenant.sh

**Files:**
- Create: `zepto-tenants/scripts/add-tenant.sh`

- [ ] **Step 1: Write the script**

Create `zepto-tenants/scripts/add-tenant.sh`:

```bash
#!/bin/bash
# Add a new ZeptoClaw tenant (MiniMax-adapted)
#
# Usage:
#   ./scripts/add-tenant.sh <tenant-name> <telegram-bot-token> <minimax-api-key>
#
# Example:
#   ./scripts/add-tenant.sh zepto-zap "8791010694:AAG..." "your-minimax-key"
#
# After running, regenerate the compose file:
#   ./scripts/generate-compose.sh
#   docker compose -f docker-compose.multi-tenant.yml up -d

set -e

TENANT_NAME="$1"
BOT_TOKEN="$2"
MINIMAX_API_KEY="$3"

if [ -z "$TENANT_NAME" ] || [ -z "$BOT_TOKEN" ] || [ -z "$MINIMAX_API_KEY" ]; then
  echo "Usage: $0 <tenant-name> <telegram-bot-token> <minimax-api-key>"
  echo ""
  echo "Example:"
  echo "  $0 zepto-zap '8791010694:AAG...' 'your-minimax-key'"
  exit 1
fi

if ! echo "$TENANT_NAME" | grep -qE '^[a-zA-Z0-9][a-zA-Z0-9-]*$'; then
  echo "Error: Tenant name must be alphanumeric with hyphens only (e.g., zepto-zap, shop-ahmad)"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TENANT_DIR="$SCRIPT_DIR/../tenants/$TENANT_NAME"

if [ -d "$TENANT_DIR" ]; then
  echo "Error: Tenant '$TENANT_NAME' already exists at $TENANT_DIR"
  exit 1
fi

mkdir -p "$TENANT_DIR"

python3 -c '
import json, sys

config = {
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
      "api_key": sys.argv[1],
      "api_base": "https://api.minimax.io/anthropic"
    }
  },
  "channels": {
    "telegram": {
      "enabled": True,
      "token": sys.argv[2]
    }
  },
  "skills": {"enabled": True},
  "swarm": {
    "enabled": True,
    "max_depth": 1,
    "max_concurrent": 3,
    "roles": {}
  }
}

with open(sys.argv[3], "w") as f:
  json.dump(config, f, indent=2)
  f.write("\n")
' "$MINIMAX_API_KEY" "$BOT_TOKEN" "$TENANT_DIR/config.json"

echo "✓ Created tenant: $TENANT_NAME"
echo "  Config: $TENANT_DIR/config.json"
echo ""
echo "Next steps:"
echo "  ./scripts/generate-compose.sh"
echo "  docker compose -f docker-compose.multi-tenant.yml up -d"
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x /Users/marcuschia/Desktop/build_factory/zepto-tenants/scripts/add-tenant.sh
```

- [ ] **Step 3: Verify the script is valid bash**

```bash
bash -n /Users/marcuschia/Desktop/build_factory/zepto-tenants/scripts/add-tenant.sh
```

Expected: no output (no syntax errors)

- [ ] **Step 4: Test with a dry-run bad input**

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants
./scripts/add-tenant.sh
```

Expected output:
```
Usage: ./scripts/add-tenant.sh <tenant-name> <telegram-bot-token> <minimax-api-key>
```

- [ ] **Step 5: Test name validation**

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants
./scripts/add-tenant.sh "bad name!" "token" "key"
```

Expected output:
```
Error: Tenant name must be alphanumeric with hyphens only (e.g., zepto-zap, shop-ahmad)
```

- [ ] **Step 6: Commit**

```bash
cd /Users/marcuschia/Desktop/build_factory
git add zepto-tenants/scripts/add-tenant.sh
git commit -m "feat(zepto): add add-tenant.sh script (MiniMax-adapted)"
```

---

## Task 3: Write generate-compose.sh

**Files:**
- Create: `zepto-tenants/scripts/generate-compose.sh`

- [ ] **Step 1: Write the script**

Create `zepto-tenants/scripts/generate-compose.sh`:

```bash
#!/bin/bash
# Generate docker-compose.multi-tenant.yml from the tenants/ directory.
#
# Usage:
#   ./scripts/generate-compose.sh
#
# Scans tenants/ for subdirectories containing config.json,
# then writes docker-compose.multi-tenant.yml in the project root.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
TENANTS_DIR="$PROJECT_DIR/tenants"
OUTPUT="$PROJECT_DIR/docker-compose.multi-tenant.yml"

if [ ! -d "$TENANTS_DIR" ]; then
  echo "Error: tenants/ directory not found at $TENANTS_DIR"
  exit 1
fi

TENANTS=()
for dir in "$TENANTS_DIR"/*/; do
  name="$(basename "$dir")"
  if [ -f "$dir/config.json" ]; then
    TENANTS+=("$name")
  fi
done

if [ ${#TENANTS[@]} -eq 0 ]; then
  echo "Error: No tenants found in $TENANTS_DIR"
  echo "Run ./scripts/add-tenant.sh first."
  exit 1
fi

cat > "$OUTPUT" << 'HEADER'
# ZeptoClaw Multi-Tenant Deployment
# Auto-generated by scripts/generate-compose.sh — do not edit manually.
# To add a tenant: ./scripts/add-tenant.sh <name> <token> <key>
# To rebuild:      ./scripts/generate-compose.sh

x-zeptoclaw-defaults: &defaults
  image: ghcr.io/qhkm/zeptoclaw:latest
  restart: unless-stopped
  logging:
    driver: json-file
    options:
      max-size: "10m"
      max-file: "3"
  deploy:
    resources:
      limits:
        memory: 128M
        cpus: "0.25"
      reservations:
        memory: 32M
        cpus: "0.05"

services:
HEADER

for TENANT in "${TENANTS[@]}"; do
  cat >> "$OUTPUT" << TENANT_BLOCK

  # =========================================================
  # Tenant: $TENANT
  # =========================================================
  tenant-$TENANT:
    <<: *defaults
    container_name: zc-$TENANT
    volumes:
      - $TENANT-data:/data
      - ./tenants/$TENANT/config.json:/data/config.json:ro
    environment:
      - RUST_LOG=zeptoclaw=info
      - RUST_LOG_FORMAT=json
      - ZEPTOCLAW_HEALTH_PORT=9090
    labels:
      com.zeptoclaw.tenant: "$TENANT"
      com.zeptoclaw.version: "latest"
      com.zeptoclaw.env: production
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:9090/healthz || exit 1"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    command: ["zeptoclaw", "gateway"]
TENANT_BLOCK
done

echo "" >> "$OUTPUT"
echo "volumes:" >> "$OUTPUT"
for TENANT in "${TENANTS[@]}"; do
  echo "  $TENANT-data:" >> "$OUTPUT"
done

echo "✓ Generated $OUTPUT"
echo "  Tenants: ${TENANTS[*]}"
echo ""
echo "To deploy:"
echo "  docker compose -f docker-compose.multi-tenant.yml up -d"
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x /Users/marcuschia/Desktop/build_factory/zepto-tenants/scripts/generate-compose.sh
```

- [ ] **Step 3: Verify the script is valid bash**

```bash
bash -n /Users/marcuschia/Desktop/build_factory/zepto-tenants/scripts/generate-compose.sh
```

Expected: no output (no syntax errors)

- [ ] **Step 4: Commit**

```bash
cd /Users/marcuschia/Desktop/build_factory
git add zepto-tenants/scripts/generate-compose.sh
git commit -m "feat(zepto): add generate-compose.sh script"
```

---

## Task 4: Create first tenant and generate compose file

**Files:**
- Create: `zepto-tenants/tenants/zepto-zap/config.json` (gitignored)
- Create: `zepto-tenants/docker-compose.multi-tenant.yml` (committed)

**Prerequisites:** You need your MiniMax API key. Find it at https://api.minimax.io or check your existing OpenClaw credentials at `~/.openclaw/credentials/`.

- [ ] **Step 1: Find your MiniMax API key**

```bash
ls ~/.openclaw/credentials/ 2>/dev/null
cat ~/.openclaw/credentials/*.json 2>/dev/null | grep -i "minimax\|api_key" | head -5
```

Note the key value — you'll use it in the next step.

- [ ] **Step 2: Create the zepto-zap tenant**

Replace `YOUR_MINIMAX_KEY` with your actual MiniMax API key:

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants
./scripts/add-tenant.sh zepto-zap \
  "8791010694:AAGdyWWOCbYwpsMtVejVyX1aCY35BnK9xK0" \
  "YOUR_MINIMAX_KEY"
```

Expected output:
```
✓ Created tenant: zepto-zap
  Config: .../tenants/zepto-zap/config.json

Next steps:
  ./scripts/generate-compose.sh
  docker compose -f docker-compose.multi-tenant.yml up -d
```

- [ ] **Step 3: Verify config.json was created correctly**

```bash
cat /Users/marcuschia/Desktop/build_factory/zepto-tenants/tenants/zepto-zap/config.json
```

Expected: valid JSON with `providers.anthropic.api_base` = `"https://api.minimax.io/anthropic"` and `channels.telegram.enabled` = `true`.

- [ ] **Step 4: Generate the docker-compose file**

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants
./scripts/generate-compose.sh
```

Expected output:
```
✓ Generated .../docker-compose.multi-tenant.yml
  Tenants: zepto-zap

To deploy:
  docker compose -f docker-compose.multi-tenant.yml up -d
```

- [ ] **Step 5: Verify the generated compose file**

```bash
cat /Users/marcuschia/Desktop/build_factory/zepto-tenants/docker-compose.multi-tenant.yml
```

Confirm it contains: `container_name: zc-zepto-zap`, volume `zepto-zap-data`, config mount `./tenants/zepto-zap/config.json:/data/config.json:ro`.

- [ ] **Step 6: Validate compose file syntax**

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants
docker compose -f docker-compose.multi-tenant.yml config --quiet
```

Expected: no errors (exits 0)

- [ ] **Step 7: Verify config.json is gitignored**

```bash
cd /Users/marcuschia/Desktop/build_factory
git status zepto-tenants/tenants/zepto-zap/config.json
```

Expected output: file not listed (gitignored) or `Ignored`

- [ ] **Step 8: Commit the compose file (not the config)**

```bash
cd /Users/marcuschia/Desktop/build_factory
git add zepto-tenants/docker-compose.multi-tenant.yml
git commit -m "feat(zepto): generate initial docker-compose for zepto-zap tenant"
```

---

## Task 5: Pull image and start the container

**Prerequisites:** Task 4 complete. Docker running.

- [ ] **Step 1: Pull the ZeptoClaw image**

```bash
docker pull ghcr.io/qhkm/zeptoclaw:latest
```

Expected: image layers download, ends with `Status: Downloaded newer image for ghcr.io/qhkm/zeptoclaw:latest`

- [ ] **Step 2: Start the tenant**

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants
docker compose -f docker-compose.multi-tenant.yml up -d
```

Expected output:
```
[+] Running 2/2
 ✔ Volume "zepto-zap-data"  Created
 ✔ Container zc-zepto-zap   Started
```

- [ ] **Step 3: Check the container is running**

```bash
docker ps --filter "name=zc-zepto-zap" --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"
```

Expected:
```
NAMES          STATUS         IMAGE
zc-zepto-zap   Up X seconds   ghcr.io/qhkm/zeptoclaw:latest
```

- [ ] **Step 4: Check startup logs**

```bash
docker logs zc-zepto-zap --tail 30
```

Look for: Telegram channel connected, gateway started, no ERROR lines. If you see `invalid api_key` or `unauthorized`, the MiniMax key is wrong — re-run Task 4 Step 2 with the correct key, then `docker compose up -d` again.

- [ ] **Step 5: Check health endpoint**

```bash
docker exec zc-zepto-zap wget -qO- http://localhost:9090/healthz
```

Expected: `{"status":"ok"}` or similar JSON. If the port isn't ready yet, wait 15 seconds and retry.

- [ ] **Step 6: Check health status via Docker**

```bash
docker inspect zc-zepto-zap --format '{{.State.Health.Status}}'
```

Expected: `healthy` (may show `starting` for first 30 seconds)

---

## Task 6: Verify Telegram bot responds

- [ ] **Step 1: Open Telegram and find @zepto_zap_bot**

Send it a message: `hello`

Expected: the bot replies within a few seconds.

- [ ] **Step 2: Check logs to confirm message was received**

```bash
docker logs zc-zepto-zap --tail 20
```

Look for an inbound message log line from the Telegram channel.

- [ ] **Step 3: If the bot does not respond**

Check for errors:
```bash
docker logs zc-zepto-zap 2>&1 | grep -i "error\|warn\|fail\|invalid"
```

Common issues:
- `invalid token` → bot token is wrong, re-create config with correct token
- `unauthorized` → MiniMax API key wrong or expired
- `model not found` → try `"model": "anthropic/MiniMax-M2.5"` in `tenants/zepto-zap/config.json` and restart with `docker compose -f docker-compose.multi-tenant.yml restart`

- [ ] **Step 4: Final commit — mark setup complete**

```bash
cd /Users/marcuschia/Desktop/build_factory
git add -A
git commit -m "feat(zepto): zepto-tenants platform live with zepto-zap tenant"
```

---

## Adding Future Tenants (reference)

When you want to add a new client bot:

```bash
cd /Users/marcuschia/Desktop/build_factory/zepto-tenants

# 1. Create tenant
./scripts/add-tenant.sh shop-ahmad "BOT_TOKEN" "MINIMAX_KEY"

# 2. Rebuild compose
./scripts/generate-compose.sh

# 3. Deploy (only starts new containers, doesn't restart existing ones)
docker compose -f docker-compose.multi-tenant.yml up -d
```

Each new bot is fully isolated — adding one cannot affect `zc-zepto-zap`.
