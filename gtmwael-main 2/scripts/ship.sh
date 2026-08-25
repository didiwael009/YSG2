#!/usr/bin/env bash
# ship.sh — typecheck, commit, push. Vercel deploie automatiquement sur main.
#
# Usage: scripts/ship.sh "message de commit" <fichier> [fichier...]
#
# Les fichiers sont explicites volontairement : l'arbre de travail contient
# des changements cro-teardown non liés qu'il ne faut pas embarquer.
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: scripts/ship.sh \"message de commit\" <fichier> [fichier...]" >&2
  exit 2
fi

MSG="$1"; shift
cd "$(dirname "$0")/.."

echo "==> Typecheck"
npx tsc --noEmit

echo "==> Staging"
git add -- "$@"

if git diff --cached --quiet; then
  echo "Rien a committer dans ces fichiers." >&2
  exit 1
fi
git diff --cached --stat

echo "==> Commit"
git commit -q -m "$MSG"

echo "==> Push"
git push origin main

echo "==> OK, Vercel prend le relais."
git log -1 --format="%h %s"
