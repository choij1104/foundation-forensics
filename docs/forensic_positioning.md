# Forensic Positioning — Business & Regulatory Notes

This document explains why Foundation Forensics is scoped the way it is. It is not legal advice; consult a Texas-licensed attorney before relying on any regulatory interpretation below.

---

## The Business Model the Software Serves

An **independent forensic evaluation firm** that:

- Performs ASCE Level B residential foundation evaluations
- Documents sub-slab plumbing impact with field-test evidence
- Supplies technical documentation to property owners, public adjusters, and claims attorneys
- Performs **no repair**, **no plumbing remediation**, **no claim negotiation**
- Refers engineering causation opinions to a licensed Texas P.E.

Not performing repairs is a deliberate advantage, not a limitation: it removes the conflict of interest that undermines contractor-produced inspections in adjuster review and in litigation.

---

## The Three Regulatory Boundaries

### 1. Engineering practice — Texas Occupations Code Ch. 1001 / TBPE

Opinions on structural causation, load capacity, or soils behavior constitute the practice of engineering. An unlicensed firm issuing them risks violating Chapter 1001; a firm offering engineering services must register with TBPE.

**Software consequence:** the application performs arithmetic on field measurements (slope, differential, deflection ratio, interpolation) and classifies results against published code tables — it asserts no causation. The disclaimer states this explicitly, and the **Raw Data Export (P.E. Review)** feature exists so a licensed P.E. can consume the measurements and issue their own sealed opinion. Deliberately excluded from the roadmap: load calculation modules, soils analysis modules, **auto-generated remedial recommendations**, and anything else resembling an engineering design tool.

The exclusion of auto-generated recommendations is worth stating plainly, because it is the one a feature request will keep arriving for. Prescribing what work a foundation needs is engineering judgment. A tool that emits "install N piers along the northeast perimeter" has rendered an engineering opinion regardless of what the disclaimer on page one says, and it has done so under the firm's name rather than a P.E.'s seal. The tier classifications in § 5.2 and on the report cover are therefore written to state what was measured and against which published threshold, and to stop there. Where a reader needs to know what to do about it, the answer the software gives is the name of the professional who is licensed to say — which is also the answer that survives cross-examination.

### 2. Claim negotiation — Texas Insurance Code (public adjuster licensing)

Only a licensed public adjuster or a licensed attorney may negotiate an insurance claim on a policyholder's behalf. An inspection firm that advocates settlement values or argues coverage crosses into unlicensed adjusting.

**Software consequence:** the insurance claim summary consolidates *findings* for adjuster review; it takes no position on coverage, valuation, or settlement. The disclaimer states the firm's role ends at documentation.

### 3. Liability exemption — Texas DTPA § 17.49(c)

Professional-services opinions, judgments, and similar advice are exempted from DTPA claims (with exceptions for express misrepresentation, unconscionability, etc.). The report frames its findings as professional inspection opinions to sit inside that exemption.

**Software consequence:** language throughout the report and UI avoids guarantee/certification framing. This is also why the post-repair feature is a **"Post-Repair Survey"** and never a "Clearance Report" or "Certification" — pass/fail certification language would create liability the exemption does not cover and would imply an engineering judgment the firm cannot make.

---

## How Each v3 Feature Maps to the Model

| Feature | Business function |
|---|---|
| Multi-visit architecture | Recurring monitoring engagements; movement-rate data for claims |
| § 7.0 Visit Comparison | Causation-supporting documentation (rapid vs. seasonal movement); post-repair outcome data |
| Segment evidence attachments | Binds computed risk to documented field tests — the artifact adjusters need |
| Raw data export | Clean hand-off to P.E. consultant; keeps firm inside documentation scope |
| Three-frame disclaimer | Positions every report inside all three regulatory boundaries |

---

## Open Structural Decision (tracked outside this repo)

Whether the P.E. relationship is per-report consulting or equity partnership determines the firm's registration path (TBPE registration is required for entities *providing* engineering services; a pure documentation firm referring to an external P.E. may not need it). The software supports either arrangement — the raw-data export works identically for an external consultant or an in-house partner.
