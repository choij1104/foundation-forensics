# Foundation Forensics — Usage Guide (v3.4)

## Quick Start

**File:** `foundation_forensics_v3.html`

1. Download the file
2. Double-click → opens in your default browser (Chrome, Safari, Edge, Firefox)
3. Click **+ Create New Project** to begin
4. Fill in firm info on the first project — it auto-applies to all future projects

No install, no account, no internet required after first load (jsPDF is fetched from CDN on first PDF export, then cached).

---

## How It Works

### Dashboard (First Page)
- Shows your firm name + all projects as cards
- Each card displays: address, client, status, severity (Δ in inches), point count
- Click any card to open that project

### Visit Bar (New in v3)
Directly below the project back-bar. Shows every visit for this project as a tab:

- **[Initial] Initial Evaluation — 2026-01-19** ← the baseline visit
- **[Monitoring] Monitoring Visit — 2026-07-19** ← 6-month follow-up
- **[Post-Repair] Post-Repair Verification — 2026-11-02** ← after remediation

Buttons:
- **+ Monitoring Visit** — adds a follow-up visit. The plan image, sewer routing, and measurement point positions are copied from the latest visit; elevation readings are reset so you re-measure at the same grid.
- **+ Post-Repair Survey** — same, flagged as post-repair type.
- **Edit Visit** — change label, date, or type of the current visit.
- **×** on any tab — deletes that visit (a project must keep at least one).

Switching tabs saves the current visit and loads the selected one. All nine sections (§ 0.0 – § 6.0) then show that visit's data.

### Project Edit View
Ten tabs covering the full evaluation:
- § 0.0 Firm & Inspector Information
- § 1.0 Project Information
- § 2.0 Structural Description
- § 3.0 Elevation Survey
- § 3.5 Plan View (drag-and-drop floor plan)
- § 3.6 **Plumbing Impact Assessment** (IPC Table 704.1 + joint risk + testing protocol + **evidence attachments**)
- § 4.0 Visual Observations
- § 5.0 Analysis (auto-calculated)
- § 6.0 Conclusions & Recommendations
- § 7.0 **Visit Comparison** (new in v3)

---

## Multi-Visit Workflow (the v3 core loop)

### Visit 1 — Initial Evaluation
1. Create project, enter property/client/foundation data
2. Upload floor plan, place measurement points, enter elevation readings
3. Draw sewer routing in § 3.6, review computed joint risk
4. Recommend testing (CCTV / hydrostatic) per § 3.6.6
5. Export PDF → deliver to client / public adjuster

### After testing is performed
6. Reopen the project, § 3.6 segment table → **+ Attach** on the relevant segment
7. Attach CCTV stills, hydrostatic test PDF, or field notes
8. Re-export PDF — computed risk is now paired with documented evidence

### Visit 2 — Monitoring (typically +6 months)
9. **+ Monitoring Visit** → point grid is pre-seeded, re-measure elevations at the same labels
10. § 7.0 → select baseline = Visit 1, current = Visit 2
11. Review movement rate (in/month) per point + interpretation banner
12. Export PDF for claim file — movement rate documentation strengthens causation

### Visit 3 — Post-Repair Verification (if repair occurred)
13. **+ Post-Repair Survey** → re-measure
14. § 7.0 → compare against pre-repair visit
15. Near-zero movement rate documents stabilization; continued movement documents that remediation did not achieve it

---

## § 3.5.2 Plan Scale Calibration — do this before trusting any distance

Every length this report derives from the floor plan is a pixel measurement converted to feet: the § 3.6 segment runs, the § 5.2 deflection span, and the slopes computed from them. Floor plans are uploaded at whatever resolution they happen to have, so that conversion is an assumption until you calibrate it — and a report stating a run of "11.7 ft" is asserting a measurement.

Calibrate once per project, after placing the measurement points:

1. Open **§ 3.5 Plan View → 3.5.2 Plan Scale Calibration**.
2. Pick two measurement points that are far apart — a longer baseline calibrates more accurately than a short one.
3. Enter the distance between them as measured on site, in feet, and press **Calibrate**.
4. The status line turns green and states the resulting px/ft along with the canvas envelope it implies. If that envelope is nothing like the building, the calibration is wrong; check that you used the right two points.

You can also type a pixels-per-foot value directly if you know the plan's scale.

Until this is done, the § 3.5 status line, § 3.6, and § 5.1 of the report all state that derived lengths rest on an assumed scale and are not measured values. The scale is not cosmetic: on the bundled demonstration, calibrating from the 20 px/ft default to 13.44 px/ft moves segment runs from 11.7–13.8 ft to 15.7–20.5 ft and the deflection ratio from L/281 to L/419 — across a classification boundary.

## § 5.2 Deflection and tilt are two different things

- **Deflection** is bending: how far the slab departs from a plane. This is what the L/360 and L/240 limits refer to. The application fits a least-squares plane through every plan-located point and measures the departure from it, so a slab that is flat but simply out of level is not reported as bent.
- **Tilt** is rigid-body rotation — the gradient of that same plane, as a percentage.
- **Elevation range** (§ 5.1) is the arithmetic spread of the readings. It contains both effects and is neither one on its own.

Deflection needs at least three points placed on the plan; a plane cannot be fitted to fewer, and the section says so rather than substituting an estimate.

## § 3.6 Evidence Attachments

Each segment row has a **FIELD-TEST EVIDENCE** column:

- **+ Attach** → choose type: `CCTV`, `Hydrostatic`, `Smoke`, `Photo`, `Note`
- File types: images, PDFs (CCTV also accepts video, but see size note)
- Each attachment stores filename, optional note, and timestamp
- **Size note:** files over 5 MB may exceed browser storage. For raw CCTV video, keep the video in external storage and attach a summary PDF or key still frames instead.

Evidence is per-visit — a hydrostatic test performed after Visit 1 belongs to Visit 1's record.

---

## § 7.0 Visit Comparison

Requires at least two visits. Select a baseline (earlier) and current (later) visit:

- **Interval** — days and months between visits
- **Per-point Δ elevation** — matched by point *label* across visits (keep labels consistent!)
- **Rate (in/month)** — per point and peak/mean across all matched points
- **Peak joint-stress index delta** — change in the § 3.6 comparative joint-stress index (relative scale, not a probability)
- **Interpretation banner** — qualitative read: minimal / low-moderate / elevated / rapid movement

Points with labels that exist only in the current visit are shown but excluded from rate calculation.

---

## Raw Data Export (P.E. Review)

§ 6.7 → **Export Raw Data (P.E. Review)** produces a text bundle containing:

- Header: property, client, firm, inspector, timestamp, and an explicit statement that no engineering opinion is asserted
- `ELEVATION_GRID.csv` — every point from every visit (visit ID, date, type, label, position, elevation, notes)
- `PLUMBING_SEGMENTS.csv` — every segment from every visit (run, original/current slope, `joint_stress_index`, classification, evidence count)

Hand this file to a licensed Texas P.E. for their independent review and sealed causation opinion. Your firm stays within technical-documentation scope.

---

## Data Storage & Portability

- **All data stays on your device** (browser localStorage). Nothing is sent to any server.
- **Browser-specific:** data saved in Chrome won't appear in Safari.
- **Clearing browser cache deletes projects** — use **Export All Projects** weekly as backup.
- **Cross-device:** Save JSON on device A → email to yourself → Import JSON on device B.
- **v2 files welcome:** legacy v2 JSON exports import directly and are auto-migrated to a single Initial Evaluation visit.

---

## Legal Frame (first page of every report)

The "Nature of This Report" disclaimer declares:

1. **Non-repair** — the firm performs no repair and holds no stake in repair decisions
2. **Not an engineering opinion** — sealed causation opinions require a licensed Texas P.E. (Occupations Code Ch. 1001 / TBPE)
3. **Not claim negotiation** — only licensed public adjusters or attorneys negotiate claims (Texas Insurance Code)

Findings are professional inspection opinions exempted under Texas DTPA § 17.49(c).

---

## Troubleshooting

**"PDF Export doesn't work"** — needs internet on first use (CDN library); cached afterward.

**"My comparison shows no matched points"** — point labels must be identical across visits. Use the **+ Monitoring Visit** button (which copies labels) rather than manually re-creating points.

**"I attached a big CCTV video and now saving fails"** — browser storage is limited (~5–10 MB total). Remove the video attachment, keep stills/PDF summaries instead, and store raw video externally.

**"Everything says COMPLIANT but joint risk is HIGH"** — correct behavior: slope can be within IPC code while joint stress from differential movement is significant. Hydrostatic test confirms actual leaks.

---

*Foundation Forensics v3.0 · 2026 · ASCE Level B Compliant*
