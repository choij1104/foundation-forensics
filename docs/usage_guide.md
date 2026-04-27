# Foundation Inspection System — Usage Guide

## Quick Start

### Option 1: Demo Version (Recommended for first look)
**File:** `foundation_v2_demo_preloaded.html`

This file contains a complete sample inspection (Marco Martinez @ 6711 Foster Fields, Converse TX) so you can see how everything works.

**To open:**
1. Download the file
2. Double-click → opens in your default browser (Chrome, Safari, Edge)
3. You'll see the **Dashboard** with one project ready to view
4. Click the project card to explore all 9 sections

### Option 2: Empty Version (Start fresh for real inspections)
**File:** `foundation_inspection_v2.html`

A clean app with no data. Use this for actual inspections.

**To open:**
1. Download the file
2. Double-click → opens in browser
3. Click **+ Create New Project** to begin
4. Fill in firm info on the first project — it will auto-apply to all future projects

---

## How It Works

### Dashboard (First Page)
- Shows your firm name + all your projects as cards
- Each card displays: address, client, status, severity (Δ in inches), point count
- Click any card to open that project for editing

### Project Edit View
9 tabs covering the full ASCE Level B evaluation:
- § 0.0 Firm & Inspector Information
- § 1.0 Project Information
- § 2.0 Structural Description
- § 3.0 Elevation Survey
- § 3.5 Plan View (drag-and-drop floor plan)
- § 3.6 **Plumbing Impact Assessment** (IPC Table 704.1 + joint risk + testing protocol)
- § 4.0 Visual Observations
- § 5.0 Analysis (auto-calculated)
- § 6.0 Conclusions & Recommendations

### Multi-Project Workflow
- Work on multiple houses simultaneously
- Switch between projects from the Dashboard
- Auto-saves to your browser every 1.5 seconds
- "Save JSON" exports a single project as a backup file
- "Export All Projects" creates a full backup of everything

---

## Important Notes

### Data Storage
- **All data stays on your device** (browser localStorage). Nothing is sent to any server.
- **Browser-specific:** Data saved in Chrome won't appear in Safari, etc.
- **Clearing browser cache will delete projects** — use "Export All Projects" regularly as backup

### Moving Between Devices
1. On Device A: Click **Save JSON** (single project) or **Export All Projects** (full backup)
2. Email the JSON file to yourself
3. On Device B: Open the app → click **Import JSON** → select the file

### Jason's Workflow Example
**At the inspection site (phone or tablet):**
1. Open app → + Create New Project
2. Fill in property address, client info
3. Take measurements, enter readings
4. Take photos (uploaded into observations)
5. Save JSON → email to yourself

**Back at the office (PC):**
1. Open app → Import JSON
2. Review, add detailed notes
3. Click **Export PDF** to generate the final report
4. Email PDF to client

---

## Legal Protection (Important!)

The first page of every report includes a **"Nature of This Report"** disclaimer that:
- Identifies this as a "professional inspection opinion" (not engineering opinion)
- Cites Texas DTPA §17.49(c) for liability protection
- Clarifies that no structural calculations or code-compliance certification is offered
- Places responsibility for sealed engineering documents on the remediation contractor

This protects the inspector regardless of whether they hold a P.E. license.

---

## Troubleshooting

### "PDF Export doesn't work"
- Requires internet connection on first use (downloads PDF library from CDN)
- After first use, library is cached and works offline
- If browser blocks the download, allow downloads from "this site"

### "I lost my projects after clearing browser cache"
- Browser cache clearing wipes localStorage
- Always keep a recent JSON export as backup
- Recommend exporting backup weekly

### "The plumbing analysis says everything is COMPLIANT but joint risk is HIGH"
- This is correct — slope can be within IPC code while joint stress from differential movement is significant
- Joint risk is calculated separately from slope compliance
- Hydrostatic test will confirm if leaks are actually present

---

## File List

| File | Size | Purpose |
|------|------|---------|
| `foundation_v2_demo_preloaded.html` | 1.8 MB | Demo with sample data (Marco Martinez @ Foster Fields) |
| `foundation_inspection_v2.html` | 182 KB | Empty app for real inspections |
| `screenshot_dashboard.png` | — | Reference: how the dashboard looks |
| `screenshot_project_view.png` | — | Reference: how project editing looks |

---

*Foundation Inspection System v2.0 · 2026*
*Built for Pinnacle Foundation Repair · ASCE Level B Compliant*
