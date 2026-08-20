# Migrating from Foundation Inspection System v2 to Foundation Forensics v3

**Short version: no action required.** All migration is automatic.

---

## What Changed Structurally

v2 stored each project as a flat snapshot:

```
project
├── report, site, survey, scope
├── points[], observations, planPoints[], planImage
└── plumbing
```

v3 wraps those time-variant fields into a `visits[]` array:

```
project
├── property, client, foundation        ← house-level, unchanged
└── visits[]
    └── { visitId, visitDate, visitType, report, site, survey,
          scope, points[], observations, planPoints[], planImage, plumbing }
```

---

## Migration Paths (all automatic)

### 1. Same browser, localStorage

On first load, if v3 storage (`foundation_forensics_v3_data`) is empty and legacy v2 storage (`foundation_inspection_v2_data`) exists, every v2 project is silently wrapped as a single visit labeled **"Initial Evaluation (migrated from v2)"**. The visit date is taken from the v2 inspection date (or the project's creation date if absent).

The v2 storage key is read but **not deleted** — you can keep using the v2 file in parallel if needed.

### 2. v2 JSON files

The import dialog accepts both formats:

| v2 type string | v3 handling |
|---|---|
| `foundation_inspection_single_project` | Migrated to v3 shape, appended as new project |
| `foundation_inspection_full_backup` | All projects migrated, replaces current state (with confirmation) |

### 3. v2 preloaded demo builds

Preloaded demo variants (where the `project` variable is populated by a build script) are also wrapped into a single initial visit at startup.

---

## What Maps Where

| v2 field | v3 location |
|---|---|
| `project.report` | `visits[0].report` |
| `project.site` | `visits[0].site` |
| `project.survey` | `visits[0].survey` |
| `project.scope` | `visits[0].scope` |
| `project.points` | `visits[0].points` |
| `project.observations` | `visits[0].observations` |
| `project.planPoints` | `visits[0].planPoints` |
| `project.planImage` | `visits[0].planImage` |
| `project.plumbing` | `visits[0].plumbing` (+ empty `segmentEvidence: {}`) |
| `project.property` | `project.property` (unchanged) |
| `project.client` | `project.client` (unchanged) |
| `project.foundation` | `project.foundation` (unchanged) |
| `appState.firm/inspector/assets` | unchanged |

---

## Export Compatibility

v3 exports use new type strings (`foundation_forensics_single_project`, `foundation_forensics_full_backup`, version `3.0`). **v3 exports cannot be imported into v2** — v2 does not recognize the visits array. Keep a v2 backup before migrating if you may need to roll back.

---

## Rollback

1. Your v2 localStorage data is untouched — opening the old v2 HTML file shows it unchanged.
2. Your pre-migration v2 JSON backups still import into v2 directly.
3. Only new work done inside v3 (additional visits, evidence attachments) cannot travel back.
