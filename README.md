# Foundation Forensics

> An independent, calculation-driven ASCE Level B evaluation platform for residential foundation forensics. Field-deployable, offline-capable, and built around **multi-visit time-series monitoring**, **field-test evidence integration**, and **raw-data export for licensed P.E. review**.

![Version](https://img.shields.io/badge/version-3.2-blue)
![Standard](https://img.shields.io/badge/ASCE-Level%20B-green)
![License](https://img.shields.io/badge/license-proprietary-red)
![Runtime](https://img.shields.io/badge/runtime-offline-success)
![Type](https://img.shields.io/badge/positioning-independent%20forensic-important)

---

## What This Is

A single-file web application for **independent foundation evaluation firms** operating strictly as **technical documentation providers**. The tool is built around a specific business model: the firm performs no repair, no plumbing remediation, and no claim negotiation. It documents observed conditions in a form that supports the workflows of public adjusters, claims attorneys, and licensed Professional Engineers who consume the data.

Foundation Forensics is a v3 rewrite of an earlier repair-oriented tool ([Foundation Inspection System v2](https://github.com/)). The functional core — ASCE Level B elevation survey, plan-view contour rendering, sub-slab plumbing impact assessment — is preserved. The v3 changes are structural: the data model, disclaimer, and workflow are re-architected around independent forensic use.

---

## What Changed in v3

Four architectural additions define this release:

### 1. Multi-Visit Time-Series Architecture

Every project now supports an unbounded array of visits. Each visit is a full snapshot of §3.0 – §6.0 (elevation survey, plan view, plumbing impact, observations, analysis, conclusions), tied to a visit date and one of three visit types:

- **Initial** — first forensic evaluation of the property
- **Monitoring** — scheduled follow-up (typically 6-month or 12-month intervals)
- **Post-Repair** — verification survey after remediation is complete

The house-level fields (property, client, foundation description, firm, inspector) are shared across visits. Everything time-variant is per-visit.

The value proposition: movement rate documentation. A single-snapshot inspection cannot distinguish long-term seasonal drift from acute active movement. A monitoring visit six months later can — and that distinction is decisive in insurance claim causation arguments and post-repair verification.

### 2. Visit Comparison (§ 7.0)

A new report section that compares any two visits and computes:

- Interval in days and months
- Per-point elevation delta and rate (in/month)
- Peak movement rate across all matched points
- Peak plumbing joint-risk delta
- Interpretation banner tuned to Texas expansive-soil residential context

Points are matched by label across visits, so the inspector can re-measure the same grid on each follow-up.

### 3. Per-Segment Field-Test Evidence

The §3.6 Sub-Slab Plumbing Impact table now has an **Evidence** column per segment. Inspectors and public adjusters can attach:

- CCTV footage or still frames
- Hydrostatic test result PDFs
- Smoke test photos
- Field-observation notes

Each attachment lands on the specific segment (e.g., §2, Master Bath → Dining) where the finding was observed. The output binds computed joint-risk probability to documented field evidence in one report — which is the artifact insurance adjusters actually need.

### 4. Raw Data Export for P.E. Review

A new export button emits elevation grid and plumbing segments as CSV, wrapped in a header identifying the property, firm, and inspector, with an explicit statement that **no engineering opinion is asserted in the file**. A licensed Texas Professional Engineer can review the data and issue a separate signed and sealed causation opinion, keeping the forensic firm cleanly within the technical-documentation scope of practice.

---

## Regulatory Positioning

The report disclaimer (first page of every PDF) declares three legal frames:

1. **Non-repair.** The firm performs no foundation repair, sub-slab plumbing repair, or any remediation, and holds no financial interest in repair decisions. This is a credibility position.

2. **Not an engineering opinion.** No opinion on causation, structural load capacity, soils analysis, or code compliance is offered. Where a signed and sealed opinion is required, a licensed Texas P.E. must review the data and issue a separate opinion under their own seal (Texas Occupations Code Chapter 1001; TBPE rules).

3. **Not claim negotiation.** The firm does not negotiate, adjust, or advocate any insurance claim. Under the Texas Insurance Code, only a licensed public adjuster or a licensed attorney may negotiate on behalf of a policyholder.

Opinions expressed are professional inspection opinions exempted from professional-services liability under **Texas DTPA § 17.49(c)**.

---

## Quick Start

```
# Download & open (no install)
curl -O https://raw.githubusercontent.com/<owner>/foundation-forensics/main/foundation_forensics_v3.html
open foundation_forensics_v3.html    # macOS
xdg-open foundation_forensics_v3.html # Linux
start foundation_forensics_v3.html    # Windows
```

Or just download `foundation_forensics_v3.html` and double-click. Any modern browser works. No account, no server, no internet after first load (jsPDF is CDN-loaded on first PDF export, then cached).

---

## Screenshots

*Screenshots included in `docs/screenshots/` are from the v2 baseline. v3-specific screenshots (visit bar, comparison section, evidence attachments) will be added after first field deployment.*

---

## Data Model

```text
appState
├── firm          (shared across projects)
├── inspector     (shared across projects)
├── assets        (logo, seal, signature — shared)
├── activeProjectId
└── projects[]
    └── project
        ├── property        (house-level, shared across visits)
        ├── client          (house-level, shared across visits)
        ├── foundation      (house-level, shared across visits)
        ├── activeVisitId
        └── visits[]
            └── visit
                ├── visitId, visitDate, visitType, visitLabel
                ├── report          (per-visit)
                ├── site            (per-visit)
                ├── survey          (per-visit)
                ├── scope           (per-visit)
                ├── points[]        (per-visit — elevation readings)
                ├── observations    (per-visit — interior/exterior/drainage)
                ├── planPoints[]    (per-visit — plan positions)
                ├── planImage       (per-visit — usually copied from prior)
                └── plumbing
                    ├── pipeDiameter, material, year, flowDirection
                    ├── sewerNodes[]
                    └── segmentEvidence   ({ segKey: [{type, filename, dataUrl, note, timestamp}] })
```

Any v2 project imported into v3 is automatically wrapped as a single **Initial Evaluation** visit. Both legacy JSON export formats and legacy `localStorage` keys are recognized and migrated silently. See [`docs/migration_from_v2.md`](docs/migration_from_v2.md).

---

## Comparison with v2 and Competing Tools

| Capability                          | v3 Forensics | v2 Inspection | HomeGauge / Spectora | FPA Templates | AutoCAD |
|-------------------------------------|:------------:|:-------------:|:--------------------:|:-------------:|:-------:|
| Live elevation calculations         |     ✓        |      ✓        |         —            |       —       |    ✓    |
| Plan view contour visualization     |     ✓        |      ✓        |         —            |       —       |    ✓    |
| Sub-slab plumbing impact analysis   |     ✓        |      ✓        |         —            |       —       |    —    |
| **Multi-visit time-series**         |   **✓**      |      —        |         —            |       —       |    —    |
| **Per-segment field-test evidence** |   **✓**      |      —        |         —            |       —       |    —    |
| **Raw-data export for P.E.**        |   **✓**      |      —        |         —            |       —       |    —    |
| Independent-forensic disclaimer     |     ✓        |      —        |         —            |       —       |    —    |
| Offline operation                   |     ✓        |      ✓        |         —            |       ✓       |    ✓    |
| Recurring cost                      |   None       |    None       |    $60–$150/mo       |     None      | $1,500+/yr |

---

## File Structure

```
foundation-forensics/
├── foundation_forensics_v3.html      # Main application (single file)
├── docs/
│   ├── overview.md                   # System overview
│   ├── usage_guide.md                # User guide with multi-visit workflow
│   ├── migration_from_v2.md          # v2 → v3 migration notes
│   ├── forensic_positioning.md       # Business and regulatory positioning
│   └── screenshots/
│       ├── dashboard.png
│       ├── project_view.png
│       └── plumbing_tab.png
├── CHANGELOG.md
├── LICENSE
├── .gitignore
└── README.md
```

---

## Roadmap

- [x] Multi-visit time-series architecture
- [x] Visit comparison with movement rate (§ 7.0)
- [x] Per-segment field-test evidence attachments
- [x] Raw-data export for P.E. consultant review
- [x] Forensic evaluator disclaimer (three legal frames)
- [x] Automatic migration from v2 storage and JSON exports
- [ ] Mobile-responsive layout refinements
- [ ] Auto-generated recommendations from analysis + evidence data
- [ ] Photo annotation on plan view
- [ ] Voice input for elevation readings
- [ ] Multi-language support (Korean / Spanish)

---

## License & Copyright

Copyright (c) 2026 Jae H. Choi. All rights reserved.

Foundation Forensics is **proprietary software — licensed, not sold**. No right to use,
copy, modify, distribute, sublicense, or create derivative works is granted except under a
separate written agreement with the copyright holder. Public visibility of this repository
is for demonstration and evaluation only and grants no deployment or commercial-use rights.
See [LICENSE](LICENSE) for full terms.

Reports and data exports generated with a licensee's own field data are the property of the
licensee or their client, as governed by their engagement agreement; this license governs
the software, not the professional work product created with it.

Third-party components: jsPDF (MIT). Public data services: USDA NRCS Soil Data Access and
the U.S. Census Bureau Geocoder, subject to their own terms; U.S. federal government data is
generally public domain and is attributed within generated reports.

> **Note on prior releases.** Versions of this repository published before v3.2.0 carried an
> MIT license. That grant cannot be retroactively revoked for copies already obtained under
> it; the proprietary terms apply to v3.2.0 and later.

## Acknowledgments

Built for the independent foundation evaluation workflow in Texas expansive-soil environments. Methodology draws on FPA-201 and the ASCE Texas Section *Guidelines for the Evaluation and Repair of Residential Foundations* (2002). Regulatory framing draws on Texas DTPA § 17.49(c), Texas Occupations Code Chapter 1001, TBPE rules, and the Texas Insurance Code chapters governing public adjusters.

---

*Foundation Forensics v3.0 · 2026 · ASCE Level B Compliant · Independent Technical Documentation*
