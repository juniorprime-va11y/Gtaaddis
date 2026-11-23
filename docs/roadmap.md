# Roadmap — GTA Addis

## M1 — Playable Vertical Slice (current)
**Definition of Done**
A player can launch, walk a compact Piazza, enter the vehicle, drive, finish the one mission, save, reload and resume.
Typecheck, unit tests and production build pass.
Milestone report written to docs/test-report.md with honest measurement labels.

**Acceptance Criteria**
- 25 FPS average (acceptance) / 30 FPS (target) on Low
- ≤ 120 draw calls, ≤ 120 k visible triangles
- 5–8 pooled pedestrians
- One vehicle, simple arcade physics
- One mission with marker/objective/reward
- HUD + FPS/budget overlay
- Save/load
- Quality selector
- Fixed-timestep loop + visibility handling

**Fallback order** (documented if applied)
1. Reduce NPC counts
2. Reduce draw distance
3. Disable expensive shadows
4. Reduce geometry complexity
5. Reduce rendering resolution

## Later milestones (high-level only)
- M2: traffic AI, more vehicles, dialogue framework, shops, Chapter 1 missions
- M3: police / wanted, melee, Merkato
- M4–M6: remaining districts, combat depth, Chapters 2–5, polish

Do not expand M1 scope without Project Director approval.
