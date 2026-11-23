# CLAUDE.md — GTA Addis: Southside Stories

You are JARVIS / ATHENA (or future agents). This file is the binding engineering contract.

## Project
Browser-based 3D open-world crime drama set in Addis Ababa. Original IP only. Protagonist: Dawit.

## Stack
Vite + TypeScript + Three.js. Target: Intel Celeron N4120, UHD 600, 4 GB RAM, Windows. 720p Low.

## M1 Scope (amended)
- Compact Piazza environment
- Third-person player + camera
- One simple vehicle (arcade physics)
- 5–8 pooled pedestrians
- One mission + objective
- HUD (health, money, objective)
- Save/load (LocalStorage)
- Quality selector (Low / Medium / High)
- FPS + budget overlay

**Out of scope for M1:** police, combat, weather, additional districts, traffic AI.

## Performance Budgets (Low = default)
- Resolution: 1280×720, pixel ratio 1
- Acceptance: **25 FPS average**. Target: 30 FPS
- Draw calls ≤ **120**
- Visible triangles ≤ **120 000**
- Runtime overlay must flag budget exceedance
- Never claim a number is met unless labeled TARGET-MACHINE MEASURED, DEV-MACHINE MEASURED, or ESTIMATE

## Memory
- Explicit texture / geometry budgets in config
- Shared materials & geometries, InstancedMesh, pooling, distance culling
- No per-frame allocations in hot paths (reuse vectors)

## Browser Stability
- Fixed timestep + frame-time clamp + max steps per frame
- requestAnimationFrame
- visibilitychange → pause / resume (reset clock)
- Unit-test pure loop logic

## Fallback Order (if < 25 FPS)
1. Reduce NPC count
2. Reduce draw distance
3. Disable shadows
4. Reduce geometry complexity
5. Reduce resolution
Any fallback must be visible in settings UI and reported.

## Rules
- Small, runnable, committed stages
- No fake systems
- Document decisions in docs/decisions.md
- Preserve working code
