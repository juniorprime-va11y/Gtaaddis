/** Global configuration and performance budgets (M1 amendment) */
export const CONFIG = {
  /** Low quality defaults */
  resolution: { width: 1280, height: 720 },
  pixelRatio: 1,

  /** Performance acceptance targets (never claim met unless measured) */
  budgets: {
    fpsAccept: 25,
    fpsTarget: 30,
    maxDrawCalls: 120,
    maxVisibleTriangles: 120_000,
  },

  /** Memory budgets (MB) — enforced/warned at load */
  memory: {
    maxTextureMB: 32,
    maxGeometryMB: 24,
  },

  /** Fixed timestep */
  fixedDt: 1 / 60,
  maxFrameTime: 0.05,      // clamp to avoid spiral of death
  maxStepsPerFrame: 5,

  /** Quality tiers */
  quality: {
    low: { npcCount: 6, drawDistance: 80, shadows: false, pixelRatio: 1 },
    medium: { npcCount: 10, drawDistance: 120, shadows: false, pixelRatio: 1 },
    high: { npcCount: 14, drawDistance: 160, shadows: true, pixelRatio: 1.25 },
  },

  defaultQuality: 'low' as const,
} as const;

export type QualityTier = keyof typeof CONFIG.quality;
