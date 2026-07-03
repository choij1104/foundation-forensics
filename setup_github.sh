#!/usr/bin/env bash
# ==============================================================
# Foundation Forensics — GitHub repo initialization
# Run this from inside the foundation-forensics/ folder.
#
# Prerequisites:
#   - git installed
#   - GitHub CLI (gh) installed and authenticated:  gh auth login
#     (or create the repo manually on github.com and use Option B below)
# ==============================================================
set -e

REPO_NAME="foundation-forensics"
DESCRIPTION="Independent forensic evaluation platform for residential foundations. ASCE Level B, multi-visit time-series monitoring, sub-slab plumbing impact analysis, field-test evidence integration. Single-file, offline-capable."

# --- Initialize local repo ---
git init
git add .
git commit -m "v3.0.0 — Foundation Forensics initial release

Re-architecture of Foundation Inspection System v2 around independent
forensic evaluation:

- Multi-visit time-series data model (initial / monitoring / post-repair)
- §7.0 Visit Comparison with movement-rate analysis (in/month)
- Per-segment field-test evidence attachments (CCTV/hydrostatic/smoke)
- Raw-data CSV export for licensed P.E. consultant review
- Three-frame forensic disclaimer (non-repair / not engineering opinion /
  not claim negotiation) — DTPA §17.49(c), Tex. Occ. Code Ch. 1001, TDI
- Automatic migration from v2 localStorage and v2 JSON exports
- All v2 functionality preserved (dashboard, §0.0–§6.0, live calc engine,
  contour rendering, plumbing impact model, PDF report generation)"

git branch -M main

# --- Option A: GitHub CLI (recommended) ---
if command -v gh &> /dev/null; then
  echo ""
  read -p "Create repo as (1) public or (2) private? [1/2]: " VIS
  VISFLAG="--public"
  [ "$VIS" = "2" ] && VISFLAG="--private"
  gh repo create "$REPO_NAME" $VISFLAG --description "$DESCRIPTION" --source=. --remote=origin --push
  echo ""
  echo "Done. Repo pushed."
  gh repo view --web
else
  # --- Option B: manual remote ---
  echo ""
  echo "GitHub CLI (gh) not found."
  echo "1. Create an empty repo named '$REPO_NAME' at https://github.com/new"
  echo "2. Then run:"
  echo ""
  echo "   git remote add origin https://github.com/<YOUR_USERNAME>/$REPO_NAME.git"
  echo "   git push -u origin main"
fi
