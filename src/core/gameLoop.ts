/**
 * Fixed-timestep game loop with frame-time clamp and max steps.
 * Pure logic is unit-testable.
 */

export interface LoopState {
  accumulator: number;
  lastTime: number;
  running: boolean;
  paused: boolean;
}

export function createLoopState(now = 0): LoopState {
  return {
    accumulator: 0,
    lastTime: now,
    running: false,
    paused: false,
  };
}

/**
 * Pure function: advance the simulation clock.
 * Returns number of fixed steps to run and the residual accumulator.
 */
export function advanceLoop(
  state: LoopState,
  now: number,
  fixedDt: number,
  maxFrameTime: number,
  maxSteps: number
): { steps: number; newState: LoopState } {
  if (state.paused || !state.running) {
    return { steps: 0, newState: { ...state, lastTime: now } };
  }

  let frameTime = (now - state.lastTime) / 1000;
  if (frameTime > maxFrameTime) frameTime = maxFrameTime;
  if (frameTime < 0) frameTime = 0;

  let accumulator = state.accumulator + frameTime;
  let steps = 0;
  while (accumulator >= fixedDt && steps < maxSteps) {
    accumulator -= fixedDt;
    steps++;
  }
  // Prevent unbounded growth if we hit maxSteps
  if (steps >= maxSteps) {
    accumulator = Math.min(accumulator, fixedDt);
  }

  return {
    steps,
    newState: {
      ...state,
      accumulator,
      lastTime: now,
    },
  };
}

export function pauseLoop(state: LoopState): LoopState {
  return { ...state, paused: true };
}

export function resumeLoop(state: LoopState, now: number): LoopState {
  return { ...state, paused: false, lastTime: now, accumulator: 0 };
}
