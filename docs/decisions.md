# Engineering Decisions

## 2026-11-23 — M1 Performance Budgets (ATHENA audit)

**Decision:** Adopt 25 FPS acceptance / 30 FPS target, ≤120 draw calls, ≤120 k visible triangles for Low quality.
**Reason:** ATHENA independent audit (58/100) identified the original 150 / 150 k budgets and 30 FPS claim as optimistic for Celeron N4120 + UHD 600 + 4 GB. Tighter budgets improve realism of the target.
**How to reverse:** Raise the numbers in `src/core/config.ts` and CLAUDE.md; update this entry with new rationale and date.

## 2026-11-23 — M1 Scope Reduction

**Decision:** Limit M1 to compact Piazza, 5–8 pedestrians, one vehicle, one mission. Explicitly exclude police, combat, weather, traffic AI, other districts.
**Reason:** ATHENA audit; reduces surface area so a measurable vertical slice can be delivered.
**How to reverse:** Project Director authorization + new roadmap entry.

## 2026-11-23 — Measurement Labeling

**Decision:** Every performance number must be labeled TARGET-MACHINE MEASURED, DEV-MACHINE MEASURED or ESTIMATE. Built-in 60 s benchmark required.
**Reason:** Prevent unsubstantiated claims on constrained hardware.
**How to reverse:** Not recommended.

## 2026-11-23 — Fixed Timestep + Visibility Handling

**Decision:** Fixed dt with clamp and max-steps; pause on `visibilitychange` and reset clock on resume. Pure functions unit-tested.
**Reason:** Browser tab throttling and debugger pauses otherwise cause spiral-of-death or large simulation jumps.
**How to reverse:** Only if a proven alternative is measured superior on target hardware.
