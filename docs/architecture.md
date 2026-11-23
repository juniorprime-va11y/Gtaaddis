# Architecture (M1 Foundation)

## Modules
- `core/` — config, fixed-timestep loop, (future: event bus, state, input, quality, time, rng)
- `ui/` — FPS/budget overlay, (future: HUD, menus, dialogue)
- `world/` — (future) district loader, roads, buildings, colliders
- `player/`, `vehicles/`, `npcs/`, `missions/`, `save/` — planned for later M1 stages

## Data flow (current)
`main.ts` owns renderer, scene, camera.
`requestAnimationFrame` → `advanceLoop` (pure) → fixed updates → render → FPS overlay reads `renderer.info`.

## Memory budgets (from config)
- Texture: 32 MB warning threshold
- Geometry: 24 MB warning threshold
(Enforcement still STUB; numbers recorded here per amendment.)

## Performance budgets
See `src/core/config.ts` and CLAUDE.md. Overlay flags exceedance at runtime.
