# Foundation Inspection System

> A field-deployable, calculation-driven diagnostic tool for residential foundation evaluation. Single-file, offline-capable, and built around the ASCE Level B evaluation standard.

![Version](https://img.shields.io/badge/version-2.0-blue)
![Standard](https://img.shields.io/badge/ASCE-Level%20B-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Platform](https://img.shields.io/badge/platform-browser-orange)
![No Server](https://img.shields.io/badge/runtime-offline-success)

---

## Overview

A single-page web application that consolidates four distinct workflows—**elevation surveying**, **plan visualization**, **sub-slab plumbing impact analysis**, and **engineering documentation**—into one integrated tool. Designed specifically for foundation repair companies operating in expansive-soil environments, it runs in any browser, on any device, with no installation, no subscription, and no cloud dependency.

**Try it now:** Download [`foundation_v2_demo_preloaded.html`](./foundation_v2_demo_preloaded.html), open in your browser, and explore a complete sample inspection.

---

## Screenshots

### Multi-Project Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

### Project Edit View — § 0.0 Firm & Inspector
![Project View](./docs/screenshots/project_view.png)

### Sub-Slab Plumbing Impact Module — § 3.6
![Plumbing Tab](./docs/screenshots/plumbing_tab.png)

---

## Why This Tool Exists

Most residential foundation inspection reports are produced one of two ways: handwritten field notes typed into a generic Word template, or output from legacy PDF-form software designed for general home inspection. Both share fundamental limitations:

- Numbers are typed in by hand. Slope calculations, deflection ratios, and severity classifications are computed mentally or on a separate spreadsheet.
- Settlement patterns exist only as a list of locations and elevation readings. Spatial visualization is absent.
- Sub-slab plumbing condition—a primary cause and accelerator of foundation movement on expansive clay—is either ignored or deferred to a separate inspection without quantitative justification.
- Texas HO-3 and HO-5 insurance policies may cover foundation repair attributable to plumbing leaks under the "sudden and accidental discharge" clause, but only if documented before remediation begins. Conventional reports do not flag this.

This system addresses each gap directly.

---

## Features

### Multi-Project Dashboard
- Manage multiple concurrent inspections from a single home view
- Project cards display address, client, severity, and point count
- Auto-save to browser localStorage every 1.5 seconds
- JSON export/import for cross-device portability

### ASCE Level B Workflow (9 sections)
- § 0.0 Firm & Inspector Information
- § 1.0 Project Information
- § 2.0 Structural Description
- § 3.0 Relative Elevation Survey
- § 3.5 Interactive Plan View
- § 3.6 **Sub-Slab Plumbing Impact Assessment**
- § 4.0 Visual Observations
- § 5.0 Engineering Analysis (auto-calculated)
- § 6.0 Conclusions & Recommendations

### Sub-Slab Plumbing Impact Module
A dedicated analysis layer absent from competing inspection software:
- IPC Table 704.1 / IRC P3005.3 code compliance check per segment
- Differential settlement interpolation onto the sewer line
- Joint separation probability by pipe material (cast iron, PVC, vitrified clay) and installation era
- Tiered testing recommendations (CCTV / hydrostatic / smoke test)
- Pre-formatted insurance claim summary

### Live Calculations
- Maximum differential, deflection ratio, tilt percentage update in real time as readings are entered
- Severity classification: Within Tolerance / Monitor / Repair Recommended / Critical
- Settlement contour overlay rendered automatically on the plan view

### Built-in Legal Protection
First-page disclaimer citing **Texas DTPA §17.49(c)**—positions findings as professional inspection opinions exempted from professional-services liability. Appropriate for both credentialed (P.E.) and non-credentialed inspectors.

### PDF Report Generation
One-click export to a print-ready ASCE-format PDF with cover page, full section breakdown, segment tables, signature block, and certification marks.

---

## Quick Start

### For Inspectors

1. Download [`foundation_inspection_v2.html`](./foundation_inspection_v2.html)
2. Double-click to open in your default browser (Chrome, Safari, Edge, Firefox)
3. Click **+ Create New Project** to begin
4. Fill firm info on the first project — auto-applies to all future projects

### For Evaluation / Demo

1. Download [`foundation_v2_demo_preloaded.html`](./foundation_v2_demo_preloaded.html)
2. Open in browser
3. Explore the pre-populated sample inspection

---

## Comparison with Existing Tools

| Capability                          | This System | General Home Inspection<br>(HomeGauge, Spectora) | Foundation Templates<br>(FPA Word/Excel) | CAD Tools<br>(AutoCAD) |
|-------------------------------------|:-----------:|:------------------------------------------------:|:----------------------------------------:|:----------------------:|
| Live elevation calculations         |     ✓       |                        —                         |                     —                    |           ✓            |
| Plan view contour visualization     |     ✓       |                        —                         |                     —                    |           ✓            |
| Sub-slab plumbing impact analysis   |     ✓       |                        —                         |                     —                    |           —            |
| Insurance claim documentation       |     ✓       |                        —                         |                     —                    |           —            |
| Multi-project dashboard             |     ✓       |                        ✓                         |                     —                    |           —            |
| Built-in legal disclaimer           |     ✓       |                        —                         |                     —                    |           —            |
| Offline operation                   |     ✓       |                        —                         |                     ✓                    |           ✓            |
| Field-deployable (phone/tablet)     |     ✓       |                        ✓                         |                     —                    |           —            |
| Recurring cost                      |   None      |                  $60–$150/month                  |                  None                    |    $1,500+/year        |
| Setup time                          |  < 1 min    |                    Hours                         |                Minutes                   |       Days             |

---

## Technical Architecture

- **Single HTML file** — all logic, styles, and dependencies inline
- **Vanilla JavaScript** — no build step, no framework
- **jsPDF** (CDN) for PDF report generation — only external dependency
- **localStorage** for auto-save (data stays on device)
- **JSON files** for project portability between devices
- **Canvas API** for plan view, contour rendering, and sewer line drawing

No server, no account, no internet required after first load.

---

## File Structure

```
foundation-inspection-system/
├── foundation_inspection_v2.html         # Main app (empty)
├── foundation_v2_demo_preloaded.html     # Demo with sample data
├── docs/
│   ├── overview.md                        # System overview
│   ├── usage_guide.md                     # User guide
│   └── screenshots/
│       ├── dashboard.png
│       └── project_view.png
├── LICENSE
└── README.md
```

---

## Use Cases

- **Foundation repair contractors** producing pre-repair evaluation reports
- **Independent foundation inspectors** generating standalone diagnostic reports
- **Real estate transactions** requiring documented foundation condition
- **Insurance claims** documenting plumbing-related foundation movement
- **Property owners** seeking second opinions on contractor assessments

---

## Important Notes

### Data Storage
- All data stays on your device (browser localStorage)
- Browser-specific: data saved in Chrome won't appear in Safari
- Clearing browser cache will delete projects — use **Export All Projects** for backup
- Recommend weekly JSON backup

### Cross-Device Workflow
1. **Field (phone/tablet):** Open app → create project → enter measurements → take photos → click **Save JSON** → email to yourself
2. **Office (desktop):** Open app → click **Import JSON** → review/edit → click **Export PDF** → deliver to client

---

## Roadmap

- [x] Multi-project dashboard
- [x] ASCE Level B 9-section workflow
- [x] Sub-slab plumbing impact module
- [x] Live calculation engine
- [x] PDF report generator
- [x] Texas DTPA §17.49(c) legal disclaimer
- [ ] Mobile-responsive layout (in progress)
- [ ] Auto-generated recommendations from analysis data
- [ ] Voice input for measurement readings
- [ ] Photo annotation tool
- [ ] Multi-language support (Korean / Spanish)

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

## Acknowledgments

Built for residential foundation repair professionals working in Texas expansive-soil environments. Inspired by FPA-201 standards and the ASCE Texas Section *Guidelines for the Evaluation and Repair of Residential Foundations* (2002).

---

*Foundation Inspection System v2.0 · 2026*
