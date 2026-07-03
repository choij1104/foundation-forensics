# Foundation Forensics
## An Independent Evaluation Platform for Residential Foundation Forensics

---

### What It Is

A single-file, offline-capable web application that produces ASCE Level B foundation evaluation reports for residential properties, engineered for **independent forensic evaluation firms** operating strictly as **technical documentation providers**. The application supports:

- Multi-visit time-series monitoring of the same property (initial evaluation → monitoring follow-ups → post-repair verification)
- Elevation surveying with live calculations and severity classification
- Interactive floor-plan view with automatic settlement contour rendering
- Sub-slab plumbing impact assessment with per-segment field-test evidence integration (CCTV, hydrostatic, smoke test)
- Movement-rate analysis between any two visits
- Raw-data export for licensed Texas Professional Engineer review
- PDF report generation with a three-frame legal disclaimer (non-repair · not engineering opinion · not claim negotiation)

The system runs from a single HTML file. No server, no account, no subscription, no internet required after first load.

---

### Positioning: Why "Forensics"

The residential foundation inspection market has two dominant categories of producers:

1. **Foundation repair contractors** who inspect the properties they hope to repair.
2. **General-purpose home inspectors** who touch foundation as one of many systems.

Both categories have a structural conflict of interest with the party who most benefits from a rigorous inspection: the homeowner filing an insurance claim. A repair contractor benefits from finding damage they will bill to fix. A general home inspector at a sale is retained by the transaction, not the long-term owner.

**Foundation Forensics is built for a third category**: an independent evaluation firm that performs *no repair*, *no plumbing remediation*, and *no claim negotiation*. It is retained by the property owner (or on referral from a public adjuster or claims attorney), it produces technical documentation, and it withdraws. Its credibility is that it has no downstream financial stake in the repair decision.

This positioning is not just a marketing framing — it constrains what the software should and should not do, and it shapes every design choice below.

---

### How v3 Improves on v2 and on Conventional Reports

Most residential foundation reports in the market are single-snapshot documents produced by repair contractors or general inspectors. Both categories share the same functional limits: static calculation, no spatial visualization, no plumbing impact modeling, no time-series data, no claim documentation pathway. The v2 predecessor of this system fixed those single-snapshot problems for repair contractors. v3 goes further to serve independent forensic use.

**1. Multi-visit time-series monitoring.** Single-snapshot inspections cannot distinguish long-term seasonal drift from acute active movement. A monitoring visit six months after baseline resolves that question. Every project now stores an array of visits, each a full snapshot of § 3.0 – § 6.0 tied to a visit date. § 7.0 Visit Comparison computes per-point elevation delta, per-point rate in inches per month, peak movement rate, and peak plumbing joint-risk delta between any two visits, with an interpretation banner tuned to Texas expansive-soil residential context.

**2. Per-segment field-test evidence.** § 3.6 Sub-Slab Plumbing Impact computes joint-separation probability from differential settlement — an *estimate*. Actual leak confirmation requires CCTV or hydrostatic testing. v3 lets the inspector attach the actual CCTV footage, hydrostatic test PDF, smoke test photos, or field-observation notes directly to the specific segment where the finding was observed. The output is a single report in which every computed joint-risk percentage is either matched with documented field evidence or explicitly awaiting it — which is the artifact insurance adjusters actually need.

**3. Raw-data export for licensed P.E. review.** Under Texas Occupations Code Chapter 1001 and TBPE rules, engineering opinions on causation require a licensed Professional Engineer's seal. The forensic firm cannot issue such opinions and must not. v3 adds a raw-data export button that emits elevation grid and plumbing segments as a CSV bundle in a header explicitly stating that no engineering opinion is asserted. A P.E. consultant receives the file, reviews the data, and issues a separate signed and sealed opinion under their own scope of practice. This gives the forensic firm a clean workflow to service claims that require sealed causation opinions without stepping outside the technical-documentation scope.

**4. Post-repair verification.** In v2, post-repair verification was implicit at best. In v3 it is a first-class visit type. A post-repair survey is added like any other monitoring visit, but flagged separately, and its Visit Comparison output against the pre-repair baseline documents whether the foundation stabilized after remediation. This is not a "clearance report" — no pass/fail judgment is issued — but the elevation-delta and movement-rate data supports the property owner and the shipping contractor in confirming outcome.

**5. Three-frame regulatory disclaimer.** The first page of every report declares three explicit legal frames: the firm performs no repair (a credibility position); the report is not an engineering opinion (TBPE compliance); the report is not claim negotiation (TDI compliance — only licensed public adjusters or attorneys may negotiate). Opinions expressed are professional inspection opinions exempted from professional-services liability under Texas DTPA § 17.49(c).

---

### How v3 Improves on Existing Software

The competing categories described in v2 remain valid points of comparison. v3 adds distinct capabilities absent from every existing platform:

- **General-purpose home inspection platforms** (HomeGauge, Spectora, Horizon) target residential resale. They produce checklists across many systems, but perform no elevation calculations, no contour visualization, no plumbing impact analysis, and offer no time-series structure. Subscription-based, internet-dependent.
- **Foundation-specific reporting templates** (FPA-associated Word/Excel documents, in-house repair-contractor forms) standardize structure but perform no calculations, offer no visualizations, and support no time-series tracking.
- **Engineering CAD tools** (AutoCAD with structural plug-ins) can produce detailed elevation surveys but require licensed engineering use, thousand-dollar-plus annual licenses, and hours of drafting per project. Not field-deployable.

Foundation Forensics occupies a distinct niche: a **field-deployable, calculation-driven, forensic-oriented, time-series-capable diagnostic tool** designed specifically for independent evaluation workflows. It performs live engineering calculations that general inspection platforms cannot, at a fraction of the time investment of CAD tools, with no recurring cost and no internet dependency, and it uniquely supports multi-visit monitoring and integrated field-test evidence for insurance claim workflows.

For the property owner, the practical result is a report that arrives looking like a forensic evaluation rather than a repair estimate. For the public adjuster or claims attorney, the practical result is a documentation package that binds computed impact probability to actual field-test evidence, presented in a form a licensed Professional Engineer can review and seal without re-doing the underlying survey.

---

*Foundation Forensics v3.0 · 2026 · ASCE Level B Compliant · Independent Technical Documentation*
