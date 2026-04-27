# Foundation Inspection System
## A Next-Generation Diagnostic Tool for Residential Foundation Evaluation

---

### What It Is

A single-file, offline-capable web application that produces ASCE Level B foundation inspection reports for residential properties. Built specifically for foundation repair companies operating in Texas expansive-soil environments, it consolidates four distinct workflows—elevation surveying, plan visualization, sub-slab plumbing impact analysis, and engineering documentation—into one integrated tool that runs in any browser, on any device, with no installation, no subscription, and no cloud dependency.

The system supports **multiple concurrent projects**, with auto-save, JSON export/import for cross-device portability, and direct PDF report generation. Inspectors can manage an entire active caseload from a single dashboard, opening any project to continue field work, review office data, or generate deliverables.

---

### How It Improves on Current Reports

Most foundation inspection reports in the residential repair industry are produced one of two ways: handwritten field notes typed into a generic Word template, or output from legacy PDF-form software designed for general home inspection. Both approaches share the same limitations:

- **Static documents.** Numbers are typed in by hand. Slope calculations, deflection ratios, and severity classifications are computed mentally or on a separate spreadsheet, then transcribed into prose.
- **No spatial visualization.** Measurement points exist only as a list of locations and elevation readings. The actual settlement pattern is invisible to the client and requires the inspector to verbally explain "where the house is sinking."
- **No plumbing analysis.** Sub-slab sewer line condition—a primary cause and accelerator of foundation movement on expansive clay—is either ignored or recommended for a separate licensed plumber inspection without quantitative justification.
- **No insurance documentation pathway.** Texas HO-3 and HO-5 policies may cover foundation repair attributable to plumbing leaks under the "sudden and accidental discharge" clause, but only if the leak is documented before remediation begins. Conventional reports do not flag this.
- **One-off documents.** Each report is a standalone file. Tracking multiple active inspections requires a separate spreadsheet or scheduling system.

The Foundation Inspection System addresses each of these gaps directly:

- **Live calculation.** Maximum differential, deflection ratio, tilt percentage, and severity classification update automatically as measurements are entered. The inspector sees the diagnosis form in real time, not after returning to the office.
- **Interactive plan view.** Measurement points are placed visually on the floor plan with drag-and-drop. The system renders an elevation contour overlay, immediately communicating settlement direction and magnitude to the client.
- **Integrated sub-slab plumbing impact assessment.** A dedicated module overlays the sewer line on the plan, interpolates differential settlement at each segment from the elevation survey, computes current slope versus IPC Table 704.1 minimums, and estimates joint separation probability based on pipe material (cast iron, PVC, vitrified clay) and installation era. Output includes a tiered testing recommendation (CCTV scope / hydrostatic test / smoke test) and a pre-formatted insurance claim summary.
- **Multi-project dashboard.** The inspector's full active caseload is visible at a glance—one card per project, color-coded by severity, with point counts and last-edited timestamps.
- **Offline-first architecture.** The entire application runs from a single HTML file. No server, no account, no internet required after initial load. Field data entry on a phone or tablet at the job site syncs to office review on a desktop via JSON file transfer.
- **Built-in legal protection.** Each report carries a first-page disclaimer citing Texas DTPA §17.49(c), positioning findings as professional inspection opinions exempted from professional-services liability—appropriate for credentialed and non-credentialed inspectors alike.

---

### How It Improves on Existing Software

Three categories of competing software exist in this space:

**General-purpose home inspection platforms** (e.g., HomeGauge, Spectora, Horizon) target the residential resale inspection market. They produce comprehensive checklists across roofing, electrical, plumbing, HVAC, and structural systems, but their foundation modules are limited to visual observation entry. None perform elevation survey calculations, contour visualization, or sub-slab plumbing impact analysis. They are also subscription-based ($60–$150/month per inspector) and require an active internet connection.

**Foundation-specific reporting templates** (offered by industry associations such as FPA, or developed in-house by larger repair companies) are typically Word or Excel documents. They standardize report structure but do not perform calculations or generate visualizations. The inspector remains responsible for all numerical work.

**Engineering CAD tools** (e.g., AutoCAD with structural plug-ins) can produce detailed elevation surveys but require licensed engineering use, multi-thousand-dollar annual licenses, and several hours of drafting per project. They are not designed for field deployment.

The Foundation Inspection System occupies a different niche: a **field-deployable, calculation-driven, single-purpose diagnostic tool** designed specifically for residential foundation repair workflows. It does what general inspection platforms cannot (live engineering calculations, plumbing impact modeling, settlement contour visualization), at a fraction of the time investment of CAD-based engineering tools, with no recurring cost, no internet dependency, and no licensing barrier.

For a foundation repair company, the practical result is a report that arrives at the homeowner's kitchen table looking less like a checklist and more like an engineering analysis—while remaining producible by any trained inspector in under an hour from the moment measurements are taken.

---

*Foundation Inspection System v2.0 · 2026 · ASCE Level B Compliant*
