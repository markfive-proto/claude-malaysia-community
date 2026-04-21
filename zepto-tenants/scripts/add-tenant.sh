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
      "model": "openai/MiniMax-M2.7",
      "max_tokens": 8192,
      "temperature": 0.7,
      "max_tool_iterations": 20
    }
  },
  "providers": {
    "openai": {
      "api_key": sys.argv[1],
      "api_base": "https://api.minimax.io/v1"
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
