#!/usr/bin/env node
// Build foundation_forensics_v3_demo_preloaded.html
// 1) extract the populated `let project = {...}` literal from the v2 demo
// 2) rebrand firm to Foundation Forensics (non-repair positioning), drop repair-firm logo/seal
// 3) inject into a copy of foundation_forensics_v3.html
// 4) give the demo its own localStorage key
// 5) add a synthesized 6-month monitoring visit + sample field-test evidence in the preload path

const fs = require('fs');

const V2_DEMO = '/mnt/project/foundation_v2_demo_preloaded.html';
const V3_APP  = 'foundation_forensics_v3.html';
const OUT     = 'foundation_forensics_v3_demo_preloaded.html';

// ---------- helpers ----------
function extractObjectLiteral(src, anchor) {
  const start = src.indexOf(anchor);
  if (start < 0) throw new Error('anchor not found: ' + anchor);
  let i = src.indexOf('{', start);
  let depth = 0, inStr = false, strCh = '', esc = false;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (inStr) {
      if (esc) { esc = false; }
      else if (c === '\\') { esc = true; }
      else if (c === strCh) { inStr = false; }
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return { text: src.slice(i, j + 1), start, endIdx: j + 1 };
    }
  }
  throw new Error('unbalanced braces');
}

// ---------- 1) extract v2 demo project ----------
const v2 = fs.readFileSync(V2_DEMO, 'utf8');
const { text: projLiteral } = extractObjectLiteral(v2, 'let project = {');
let demoProject;
try {
  demoProject = JSON.parse(projLiteral);
} catch (e) {
  // fall back: evaluate as JS literal in a sandbox-ish way
  demoProject = (new Function('return (' + projLiteral + ');'))();
}
console.log('v2 demo extracted. keys:', Object.keys(demoProject).join(', '));
console.log('points:', (demoProject.points || []).length,
            '| sample point keys:', Object.keys((demoProject.points || [{}])[0]).join(','));

// ---------- 2) rebrand for forensic positioning ----------
demoProject.firm = {
  name: 'Foundation Forensics LLC',
  address: 'San Antonio, TX (demo data)',
  phone: '(210) 555-0100',
  email: 'reports@foundationforensics.example',
  web: 'www.foundationforensics.example',
  registration: 'Independent technical documentation provider — no repair services'
};
if (demoProject.inspector) {
  demoProject.inspector.title = 'Forensic Foundation Evaluator';
}
if (demoProject.assets) {
  demoProject.assets.logo = null;  // repair-company logo removed
  demoProject.assets.seal = null;  // repair-company seal removed
  // keep signature + planImage (planImage is required for the demo plan view)
}
if (demoProject.report) {
  demoProject.report.number = 'FF-20260119-001';   // firm's own numbering, not the v2 repair company's
  demoProject.report.inspectionType = 'ASCE Level B \u2014 Relative Elevation Survey & Sub-Slab Plumbing Impact Documentation';
}

// ---- Site geology: populate the new §2.3.1 fields (Converse, TX / Bexar County) ----
demoProject.site = demoProject.site || {};
Object.assign(demoProject.site, {
  geoMapunit: 'Houston Black clay, 1 to 3 percent slopes (map unit HuB, dominant component Houston Black 85%)',
  geoShrinkSwell: 'Very High',
  geoPI: '40\u201360',
  geoLEP: '9.5',
  geoDrainage: 'Moderately well drained',
  geoSource: 'USDA NRCS SSURGO via Soil Data Access, retrieved 2026-01-19 (demonstration data \u2014 verify against Web Soil Survey for any actual engagement)',
  geoNotes: 'Blackland Prairie vertisol: deep calcareous clay with pronounced seasonal shrink-swell behavior and characteristic gilgai microrelief. Soils of this series undergo substantial volume change with moisture cycling, and published survey data classifies the shrink-swell potential as very high. This is published regional survey data cited for context; it is not a parcel-specific geotechnical determination.'
});

// ---- Convert v2-era repair-prescriptive narrative to forensic-neutral language ----
if (demoProject.scope) {
  demoProject.scope.statement =
    'At the request of the client, this firm performed an ASCE Level B relative elevation survey of the residential slab foundation at the subject property, together with a sub-slab plumbing impact analysis of the traced sewer line. The purpose of this engagement is to document measured conditions as of the survey date in a form suitable for review by a licensed Professional Engineer, a public adjuster, or counsel. This firm performs no repair work, renders no engineering opinion as to causation, and does not negotiate insurance claims.';
  demoProject.scope.movementFinding =
    'Relative elevation measurements across 12 points establish a maximum differential of 1.62 in., with the low region concentrated at the northeast quadrant. Interior and exterior distress consistent with differential movement is documented in \u00a7 4.0. Segment analysis of the traced sewer line (\u00a7 3.6) computes two segments below IPC Table 704.1 minimum slope under the measured settlement, with the worst segment computing to negative slope. These are measured and computed findings; determination of cause is reserved to a licensed Professional Engineer.';
  demoProject.scope.contributingFactors =
    'Conditions documented at the site that are recognized in published literature as associated with differential foundation movement, listed without assignment of causal weight: (1) Houston Black clay \u2014 very high shrink-swell potential per published USDA NRCS survey data (\u00a7 2.3.1); (2) mature pecan tree approximately 12 ft from the northeast corner, within the commonly cited zone of influence; (3) roof drainage discharging adjacent to the foundation at the northeast corner; (4) computed sub-slab sewer slope deficiency in the same quadrant as the measured low region, pending field verification. Apportionment among these factors requires engineering analysis not performed by this firm.';
  demoProject.scope.testingRecommendations =
    'Field verification that would resolve the open questions in this report, to be performed by appropriately licensed parties: hydrostatic pressure test and CCTV inspection of the sub-slab sewer line by a licensed plumber; comparative re-survey at a defined interval to establish whether movement is active and at what rate (\u00a7 7.0); soil moisture sampling at the perimeter if a licensed engineer determines it material to causation analysis.';
  demoProject.scope.structuralRecommendations =
    'No remedial scope is offered. Specification of corrective work is an engineering judgment reserved to a licensed Professional Engineer under Texas Occupations Code Chapter 1001, and this firm performs no repair work. The measured elevation data, plan-view settlement field, and plumbing segment computations in this report, together with the raw-data export, are prepared to support that engineering review.';
  demoProject.scope.drainageRecommendations =
    'Site drainage conditions as observed are documented in \u00a7 2.3 and \u00a7 4.0 for the record. This firm does not specify corrective drainage work.';
  demoProject.scope.limitations =
    'This report reflects conditions observed and measured at the subject property on the date of inspection and does not predict future performance. The survey is non-destructive; no excavation, coring, or subsurface investigation was performed and no concealed conditions were inspected. Sub-slab sewer routing was traced from accessible cleanouts and fixture locations and is approximate; actual routing may differ. Plumbing segment analysis is a geometric computation based on measured surface settlement and assumed original slope, and is not a substitute for field testing by a licensed plumber. Published soil survey data is cited for regional context and is not a parcel-specific geotechnical determination. No opinion is expressed as to causation, structural adequacy, code compliance, or the appropriate scope of corrective work; those determinations are reserved to a licensed Professional Engineer.';
}

// ---------- 3) inject into v3 copy ----------
let v3 = fs.readFileSync(V3_APP, 'utf8');
const { start: v3ProjStart, endIdx: v3ProjEnd } =
  (() => { const r = extractObjectLiteral(v3, 'let project = {'); return { start: r.start, endIdx: r.endIdx }; })();

const newLiteral = 'let project = ' + JSON.stringify(demoProject, null, 1);
v3 = v3.slice(0, v3ProjStart) + newLiteral + v3.slice(v3ProjEnd);

// ---------- 4) demo-scoped storage keys ----------
v3 = v3.replace("const STORAGE_KEY = 'foundation_forensics_v3_data';",
                "const STORAGE_KEY = 'foundation_forensics_v3_DEMO_data';");
v3 = v3.replace("const LEGACY_V2_STORAGE_KEY = 'foundation_inspection_v2_data';",
                "const LEGACY_V2_STORAGE_KEY = '__ff_demo_no_legacy__';");

// title tag distinction
v3 = v3.replace(/<title>[^<]*<\/title>/,
                '<title>Foundation Forensics v3 — DEMO (Preloaded Simulation)</title>');

// ---------- 5) synthesize monitoring visit in preload path ----------
const anchorLine = '    appState.projects = [migrated];';
if (!v3.includes(anchorLine)) throw new Error('preload anchor not found');

const synth = `    appState.projects = [migrated];

    // ---- DEMO ONLY: synthesize a 6-month monitoring visit + field-test evidence ----
    try {
      const v1 = migrated.visits[0];
      v1.visitLabel = 'Initial Evaluation';
      v1.visitType = 'initial';
      const baseDateStr = (v1.visitDate && !isNaN(new Date(v1.visitDate))) ? v1.visitDate
                        : (project.report && project.report.inspectionDate) || '2026-01-05';
      v1.visitDate = baseDateStr;

      // sample field-test evidence on the initial visit (worst segment)
      v1.plumbing = v1.plumbing || {};
      v1.plumbing.segmentEvidence = v1.plumbing.segmentEvidence || {};
      v1.plumbing.segmentEvidence['0'] = [
        { type: 'Hydrostatic', filename: '(text note)',
          note: 'Licensed plumber hydrostatic test: 1.4 gal loss over 20 min, isolated to this run. Report retained in client file.',
          timestamp: new Date(baseDateStr + 'T14:30:00').toISOString() },
        { type: 'CCTV', filename: '(text note)',
          note: 'CCTV push camera: standing water + joint offset observed at ~18 ft from cleanout. Video retained externally; stills in client file.',
          timestamp: new Date(baseDateStr + 'T15:10:00').toISOString() }
      ];

      // 6-month monitoring visit: same point grid, worsened readings
      const d0 = new Date(baseDateStr);
      const d1 = new Date(d0.getTime()); d1.setMonth(d1.getMonth() + 6);
      const iso = d1.toISOString().slice(0, 10);

      const v2visit = JSON.parse(JSON.stringify(v1));
      v2visit.visitId = 'visit_demo_monitoring';
      v2visit.visitType = 'monitoring';
      v2visit.visitLabel = 'Monitoring Visit (6-Month)';
      v2visit.visitDate = iso;
      if (v2visit.report) { v2visit.report.inspectionDate = iso; }
      // differential settlement progresses ~35% + slight low-corner acceleration
      (v2visit.points || []).forEach((p, idx) => {
        const r = parseFloat(p.reading);
        if (!isNaN(r)) {
          let nr = r * 1.35;
          if (r < 0) nr -= 0.15 + (idx % 3) * 0.05;  // low points sink further
          p.reading = String(Math.round(nr * 100) / 100);
        }
        p.photo = null; // keep demo light
      });
      // monitoring visit evidence: follow-up note
      v2visit.plumbing = v2visit.plumbing || {};
      v2visit.plumbing.segmentEvidence = {
        '0': [{ type: 'Note', filename: '(text note)',
          note: 'Follow-up: no remediation performed between visits. Movement rate computed in §7.0 supports active contributing factor.',
          timestamp: new Date(iso + 'T10:00:00').toISOString() }]
      };
      migrated.visits.push(v2visit);
      migrated.activeVisitId = v1.visitId;   // open on the baseline visit
    } catch (e) { console.warn('demo monitoring-visit synthesis failed:', e); }
    // ---- END DEMO ONLY ----`;

v3 = v3.replace(anchorLine, synth);

fs.writeFileSync(OUT, v3);
console.log('wrote', OUT, (v3.length / 1024).toFixed(0) + ' KB');
