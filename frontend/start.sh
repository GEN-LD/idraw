#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

PORT="${PORT:-8080}"

echo "Building iDraw frontend..."
npm run build

echo ""
echo "Starting HTTP server on http://localhost:${PORT}"
python3 -m http.server "${PORT}" --directory dist
