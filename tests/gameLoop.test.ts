import { describe, it, expect } from 'vitest';
import {
  createLoopState,
  advanceLoop,
  pauseLoop,
  resumeLoop,
} from '../src/core/gameLoop';

const FIXED = 1 / 60;
const MAX_FT = 0.05;
const MAX_STEPS = 5;

describe('gameLoop pure logic', () => {
  it('creates initial state', () => {
    const s = createLoopState(1000);
    expect(s.accumulator).toBe(0);
    expect(s.lastTime).toBe(1000);
    expect(s.running).toBe(false);
    expect(s.paused).toBe(false);
  });

  it('advances exactly one step for one fixedDt', () => {
    let s = createLoopState(0);
    s = { ...s, running: true };
    const { steps, newState } = advanceLoop(s, 1000 / 60, FIXED, MAX_FT, MAX_STEPS);
    expect(steps).toBe(1);
    expect(newState.accumulator).toBeLessThan(FIXED);
  });

  it('clamps large frame times', () => {
    let s = createLoopState(0);
    s = { ...s, running: true };
    // 1 second frame should be clamped to 0.05 → at most MAX_STEPS
    const { steps } = advanceLoop(s, 1000, FIXED, MAX_FT, MAX_STEPS);
    expect(steps).toBeLessThanOrEqual(MAX_STEPS);
  });

  it('pause stops steps', () => {
    let s = createLoopState(0);
    s = { ...s, running: true };
    s = pauseLoop(s);
    const { steps } = advanceLoop(s, 100, FIXED, MAX_FT, MAX_STEPS);
    expect(steps).toBe(0);
  });

  it('resume resets accumulator and lastTime', () => {
    let s = createLoopState(0);
    s = { ...s, running: true, paused: true, accumulator: 0.1 };
    s = resumeLoop(s, 5000);
    expect(s.paused).toBe(false);
    expect(s.accumulator).toBe(0);
    expect(s.lastTime).toBe(5000);
  });
});
