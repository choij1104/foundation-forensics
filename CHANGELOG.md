# Changelog

All notable changes to Foundation Forensics.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.3.0] — 2026-08-20

### Fixed — the report did not match the software
- **§ 7.0 Visit Comparison now prints in the PDF report.** The flagship v3 feature — multi-visit
  movement rate — existed only on screen and in the raw CSV export; the PDF generator had no such
  section, while the README, overview, and this changelog all described it as a report section.
  The PDF now carries § 7.0 with visits compared, datum basis, movement-rate summary, peak
  joint-stress index delta, interpretation, and the full per-point delta table.
- **Section numbering collision resolved.** On-screen § 7.0 was Visit Comparison while the PDF's
  § 7.0 was Limitations & Certification, so § 7.1–7.3 meant two different things depending on
  where you read them. Limitations & Certification moved to § 8.0 and the table of contents was
  corrected; the TOC also listed "5.0 Engineering Analysis" against a body heading of "5.0
  Analysis" — a discrepancy that also read against the not-an-engineering-opinion frame.
- **Non-WinAnsi characters rendered as mojibake in every PDF ever produced.** jsPDF's built-in
  fonts are WinAnsi-encoded: the § 3.2 measurement table's `Δ` column header printed as `”`, and
  the § 3.6 segment table's `FROM → TO` printed as `FROM !’ TO`. Affected literals were replaced,
  and `pdf.text` / `pdf.splitTextToSize` are now wrapped in a central sanitizer so an out-of-set
  character substitutes visibly instead of failing silently.

### Fixed — cross-visit calculation
- **A change of survey datum could masquerade as structural movement.** § 7.0 differenced raw
  readings between visits. A relative elevation survey carries no absolute benchmark, so if the
  reference point or instrument setup differed between visits, the whole grid shifted and the
  shift was reported as movement. Each visit is now reduced to deviations from its own reference
  point (the same `refMode` § 3.0 and § 5.0 classify against) before differencing, so only the
  change in *shape* of the elevation field survives. The per-point table shows Δ raw alongside
  Δ rel. datum, a stat box reports the reference shift that was removed, and a datum notice fires
  when that shift reaches 0.25 in.
- **Comparison math extracted to `computeVisitComparison()`**, called by both the on-screen § 7.0
  and the PDF § 7.0, so the two cannot drift apart again. `peakJointStressIndex()` likewise
  replaces the inline duplicate, and now restores `project` state in a `finally` block.

### Fixed — demo build
- **`build_demo.js` multiplied absolute elevation readings by 1.35** where it meant to grow each
  point's deviation from the survey reference by 35%. The synthesized six-month monitoring visit
  therefore sat ~35 in. above the baseline, and the briefing file — the build shown to property
  owners, public adjusters, and counsel — reported 35.00 in. of movement at 5.886 in/month with a
  "Rapid movement rate" banner. The growth is now applied to the deviation, and the demo reports
  0.68 in. of shape change at 0.114 in/month over 181 days.
- **The build is reproducible from a fresh clone.** `build_demo.js` read its v2 source from a
  hardcoded `/mnt/project/` path that existed only on the original author's machine. The input now
  resolves to `legacy/foundation_v2_demo_preloaded.html` relative to the script, overridable with
  `FF_V2_DEMO`, and that file is committed.

### Changed — offline operation is now real
- **jsPDF 2.5.1 (MIT) is bundled into the application file.** It was loaded from cdnjs on first
  PDF export, so a tablet with no signal — the actual field condition this tool is built for —
  could not produce a report, despite "offline-capable" appearing in the README, the tagline, and
  the comparison table. The license header is retained inline. Web fonts still load from Google
  Fonts when the network is present and fall back to system stacks when it is not.

### Changed — forensic positioning (language the v3.2.0 pass missed)
- PDF cover **Principal Finding** classified 1.0–1.5 in. as "Significant Movement — Foundation
  Repair Recommended" and >1.5 in. as "Critical Differential — Immediate Foundation Repair
  Required". Both now state the measured range without prescribing work.
- Property-owner summary headlines "REPAIR RECOMMENDED" / "REPAIR REQUIRED" became "EXCEEDS COMMON
  TOLERANCE" / "CRITICAL MEASURED RANGE", and the corresponding bottom-line paragraph — which
  ended "Repair before damage progresses is advised." — now refers the question of what work is
  warranted to a licensed engineer.
- § 3.6.3 findings no longer say a CCTV scope is indicated "before finalizing remediation scope"
  or that "no plumbing intervention is indicated"; § 6.4 heading "Structural Remediation" now
  matches its on-screen label, "Structural Recommendations".
- Remaining **"joint risk" / "%" labels** from the v3.2.0 rename were carried over: § 7.0's "Peak
  Joint Risk … 65% … Δ 1 pp" stat boxes, the § 3.6 screen table header and metric tile, the PDF
  § 3.6.2 column header, the property-owner summary's "PLUMBING JOINT RISK 65%", and the raw
  export's `joint_risk_pct` column (now `joint_stress_index`).

### Added
- **`index.html`** — a landing page for GitHub Pages. The Pages root returned 404 because no
  index existed; the application was reachable only by typing the HTML filename directly.
- **`.gitignore`** — the repository had none. Notably excludes project JSON exports, which contain
  client names, property addresses, and inspection photographs.
- **`legacy/foundation_v2_demo_preloaded.html`** — the demo build input, previously uncommitted.

### Removed from the roadmap
- **"Auto-generated recommendations from analysis + evidence data."** Generating remedial
  recommendations is engineering judgment reserved to a licensed P.E. under Texas Occupations Code
  Ch. 1001; shipping it would place the firm outside the scope of practice the rest of the product
  is built to hold. Recorded as excluded rather than deferred, alongside load calculation and soils
  analysis in `docs/forensic_positioning.md`.

## [3.2.0] — 2026-08-20

### Changed — forensic positioning (report language)
- **All auto-generated repair-prescriptive language replaced with forensic-neutral findings.**
  §5.2 is now "Classification of Measured Condition" rather than "Diagnosis"; tier text states
  what was measured and refers causation and remedial scoping to a licensed P.E. Removed
  auto-generated piling specifications, "remediation is required/recommended", and
  "schedule a repair consultation" from the screen analysis, PDF report, and client summary.
  *All input fields are preserved* — an inspector may still enter any narrative manually.
- **"Joint separation probability (%)" renamed to "joint-stress index"** throughout (table,
  exhibits, PDF, methodology). The value is a comparative screening scale used to prioritize
  field verification, and is now explicitly stated not to be a statistical probability.
- Client-summary next steps reordered around engineer review, evidence preservation, and
  claim-process orientation; explicit statement that this firm does not negotiate claims.
- Insurance note reframed: the index indicates a line warranting verification, not a finding
  that a leak exists.

### Changed — license
- **MIT → proprietary license.** All rights reserved; software is licensed, not sold.
  Report output remains the property of the licensee/client. Prior MIT-published versions
  are unaffected (that grant cannot be retroactively revoked).

### Added
- Copyright banner in the application source header; copyright and scope-of-practice line in
  the application footer; per-page copyright and work-product notice in the PDF footer.
- Demo/simulation file enriched: §2.3.1 geology populated (Houston Black clay, PI 40–60,
  LEP 9.5, Very High shrink-swell, dated SSURGO-style source citation), firm-own report
  numbering (FF-20260119-001), and the full §1/§5 narrative rewritten in forensic-neutral
  voice so the briefing file demonstrates the correct positioning end to end.

## [3.1.0] — 2026-07-05

### Added
- **Discrete settlement bands + iso-settlement contours** (screen sewer canvas + PDF
  Exhibit A): 0.25" fixed bands with a divergent palette (blue = heave, neutral,
  yellow→red = settlement); marching-squares contour lines at 0.25" intervals with
  bold labeled 0.50" contours and a dashed zero-movement line; two-row legend on
  Exhibit A including the band scale.
- **Site Geology (§2.3.1)** — hybrid published-soil-data integration:
  - Embedded regional database (~24 Bexar-and-adjacent NRCS soil series with
    representative shrink-swell class, PI range, LEP, drainage, geologic notes).
  - One-click **USDA SSURGO fetch**: geocodes the property address (US Census
    geocoder) → queries Soil Data Access for the parcel's dominant map unit
    (map unit name, component, PI min–max, LEP, drainage) → caches into the
    project with a dated source citation.
  - Geology fields persist per project, carry forward automatically to new visits,
    and print in the PDF as §2.3.1 with a fixed non-geotechnical disclaimer.

## [3.0.2] — 2026-07-03

### Added
- **Visual Exhibits** for §3.6 (screen + PDF), auto-generated from segment data:
  - *Exhibit A* — Plan overlay: sewer routing color-coded by slope classification with legend.
  - *Exhibit B* — Per-segment side-view slope profiles: as-designed (dashed) vs. current
    (solid, severity-colored) vs. IPC minimum (dotted); settlement arrows with Δ values at
    each end; auto vertical-exaggeration note; back-pitch pooling zone shading.
  - *Exhibit C* — Bell-and-spigot joint separation principle diagram with the property's
    worst-segment values (material joint tolerance vs. measured movement, separation %).
- Exhibits render in §3.6.4 on screen and as PDF subsection "3.6.4 Visual Exhibits".

## [3.0.1] — 2026-07-02

### Fixed
- **§7.0 Visit Comparison** now matches measurement points by their actual field names
  (`code` / `reading`); previously matched on nonexistent `label` / `elevation`, so no
  points ever matched between visits.
- **+ Monitoring Visit** point-grid seeding copies `code`/`location` and resets `reading`
  (previously produced undefined labels).
- **Raw Data Export (P.E. Review)** elevation CSV now emits real point codes and readings.

### Added
- `foundation_forensics_v3_demo_preloaded.html` — briefing/simulation build with two
  preloaded visits (Initial Evaluation + 6-Month Monitoring), sample hydrostatic/CCTV
  field-test evidence, and demo-scoped localStorage key (does not touch real app data).
  Firm rebranded to a neutral forensic-evaluator placeholder (repair-company logo/seal removed).
- `build_demo.js` — reproducible demo build script (extracts v2 demo data, migrates to
  v3 schema, synthesizes the monitoring visit).
- Mobile-responsive layout: horizontally scrollable tables, single-column forms,
  44px touch targets, 16px inputs (prevents iOS focus zoom), stacked toolbars,
  full-width dashboard cards, and a 480px small-phone tier.

## [3.0.0] — 2026

Foundation Forensics v3.0 is a re-architecture of the earlier Foundation Inspection System v2, oriented around independent forensic evaluation rather than repair-contractor pre-repair documentation.

### Added

- **Multi-visit time-series data model.** Every project now supports an array of visits (`project.visits[]`), each with its own report, site conditions, survey, scope, elevation points, observations, plan points, and plumbing analysis. House-level fields (property, client, foundation) remain shared across visits. Three visit types are supported: `initial`, `monitoring`, `post-repair`.
- **Visit Bar UI.** New selector between the back-bar and the section-nav lets the inspector switch visits, add a Monitoring Visit or a Post-Repair Survey, and edit visit metadata. Follow-up visits are pre-seeded with the previous visit's plan image, sewer routing, and measurement-point positions (with elevations reset to zero for re-measurement).
- **§ 7.0 Visit Comparison.** New report section computes interval days/months, per-point elevation delta, per-point rate (in/month), peak movement rate, mean movement rate, and peak plumbing joint-risk delta between any two selected visits. Includes an interpretation banner tuned to Texas expansive-soil residential context.
- **Per-segment field-test evidence.** § 3.6 Plumbing Impact table now has an Evidence column. Attachments per segment: CCTV footage/still, hydrostatic test PDF, smoke test photo, or free-text field note. Each attachment is bound to a specific sewer segment.
- **Raw-data export for P.E. review.** New "Export Raw Data (P.E. Review)" button in § 6.7 emits elevation grid + plumbing segments as a CSV bundle wrapped in a header identifying property, firm, and inspector. Explicit statement in the export file that no engineering opinion is asserted — the file is designed for a licensed Texas Professional Engineer to review and issue a separate signed and sealed opinion.
- **Automatic v2 migration.** Legacy `localStorage` key `foundation_inspection_v2_data` is detected on load and migrated into the v3 schema. Legacy JSON export types (`foundation_inspection_single_project`, `foundation_inspection_full_backup`) are accepted by the import dialog and migrated in place.

### Changed

- **Report disclaimer rewritten** to declare three explicit legal frames: non-repair, not-engineering-opinion (Texas Occupations Code Ch. 1001; TBPE), not-claim-negotiation (Texas Insurance Code). Texas DTPA § 17.49(c) exemption preserved.
- **Branding.** "Foundation Inspection System" → "Foundation Forensics". Subtitle now reads: "ASCE Level B Evaluation · Independent Technical Documentation · Multi-Visit Monitoring".
- **Storage key.** `foundation_inspection_v2_data` → `foundation_forensics_v3_data`. v2 key is retained as read-only legacy source for migration.
- **JSON export type strings.** `foundation_inspection_single_project` → `foundation_forensics_single_project`; `foundation_inspection_full_backup` → `foundation_forensics_full_backup`. v2 strings still accepted on import.
- **`createEmptyProjectData()`** restructured. Visit-scoped fields moved into the new `visits[]` array; house-level fields remain at project level.
- **`snapshotCurrentProject()`** / **`loadProjectIntoActive()`** rewritten to be visit-aware.

### Preserved

- All existing v2 functionality: dashboard, § 0.0 through § 6.0 sections, live calculation engine, plan-view contour rendering, sub-slab plumbing impact modeling, PDF report generation, JSON single-project export, full-backup export, browser localStorage auto-save.
- The `project` global variable retains its flat structure (the currently-loaded visit's data is on it directly), so all existing UI code and PDF export logic works unchanged.

### Migration Path from v2

No user action required. On first load, if v3 storage is empty and v2 storage exists, v2 projects are silently wrapped into v3 shape with a single "Initial Evaluation (migrated from v2)" visit each. v2 JSON files can be imported directly and are migrated on the way in.

See [`docs/migration_from_v2.md`](docs/migration_from_v2.md) for full details.

---

## [2.0.0] — 2026 (baseline — Foundation Inspection System)

- Multi-project dashboard, ASCE Level B 9-section workflow (§ 0.0 – § 6.0), sub-slab plumbing impact module, live calculation engine, PDF report generator, DTPA § 17.49(c) disclaimer.
