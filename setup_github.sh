#!/usr/bin/env bash
# ==============================================================
# Foundation Forensics — GitHub repo setup
# Run this from inside the foundation-forensics/ folder.
#
# The canonical repository already exists:
#   https://github.com/choij1104/foundation-forensics
# This script is for initializing a fresh working clone, or for
# publishing the project from a folder that is not yet a git repo.
#
# Prerequisites:
#   - git installed
#   - GitHub CLI (gh) installed and authenticated:  gh auth login
#     (or create the repo manually on github.com and use Option B below)
# ==============================================================
set -euo pipefail

REPO_NAME="foundation-forensics"
DESCRIPTION="Independent forensic evaluation platform for residential foundations. ASCE Level B, multi-visit time-series monitoring, sub-slab plumbing impact analysis, field-test evidence integration. Single-file, fully offline."

# --- Guard: already a repo? ---
if [ -d .git ]; then
  echo "This folder is already a git repository."
  echo "Remotes:"; git remote -v
  echo
  echo "To publish changes:  git add -A && git commit -m '...' && git push"
  exit 0
fi

# --- Initialize local repo ---
git init
git branch -M main
git add .
git commit -m "v3.3.0 — report parity, datum-safe comparison, offline PDF

- §7.0 Visit Comparison now prints in the PDF report; Limitations
  moved to §8.0 so screen and print numbering agree
- Cross-visit comparison normalizes each visit against its own
  reference point, so a change of survey datum can no longer be
  reported as structural movement
- jsPDF bundled inline: PDF export works with no network at all
- build_demo.js no longer inflates the demo grid by ~35 in.
- Remaining repair-prescriptive and 'joint risk %' language removed
- Added index.html landing page and .gitignore

See CHANGELOG.md for the full list."

# --- Option A: GitHub CLI (recommended) ---
if command -v gh &> /dev/null; then
  echo ""
  echo "NOTE: this project is licensed proprietary (see LICENSE)."
  echo "      Public visibility is for demonstration and evaluation only;"
  echo "      it grants no deployment or commercial-use rights."
  echo ""
  read -r -p "Create repo as (1) public or (2) private? [1/2]: " VIS
  VISFLAG="--public"
  [ "$VIS" = "2" ] && VISFLAG="--private"
  gh repo create "$REPO_NAME" $VISFLAG --description "$DESCRIPTION" --source=. --remote=origin --push
  echo ""
  echo "Done. Repo pushed."
  echo "Enable GitHub Pages (Settings -> Pages -> Deploy from branch: main / root)"
  echo "to serve index.html and the application."
  gh repo view --web
else
  # --- Option B: manual remote ---
  echo ""
  echo "GitHub CLI (gh) not found."
  echo "1. Create an empty repo named '$REPO_NAME' at https://github.com/new"
  echo "2. Then run:"
  echo ""
  echo "   git remote add origin https://github.com/choij1104/$REPO_NAME.git"
  echo "   git push -u origin main"
  echo ""
  echo "3. Enable Pages: Settings -> Pages -> Deploy from branch: main / root"
fi
