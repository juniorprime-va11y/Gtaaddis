import { CONFIG } from '../core/config';

export interface PerfStats {
  fps: number;
  frameTimeMs: number;
  drawCalls: number;
  triangles: number;
  budgetExceeded: boolean;
}

export class FpsOverlay {
  private el: HTMLElement;
  private frames = 0;
  private lastSample = performance.now();
  private fps = 0;
  private frameTimeMs = 0;

  constructor(elementId = 'fps-overlay') {
    const el = document.getElementById(elementId);
    if (!el) throw new Error(`#${elementId} not found`);
    this.el = el;
  }

  /** Call once per rendered frame */
  tick(rendererInfo?: { calls: number; triangles: number }) {
    this.frames++;
    const now = performance.now();
    const elapsed = now - this.lastSample;
    if (elapsed >= 500) {
      this.fps = (this.frames * 1000) / elapsed;
      this.frameTimeMs = elapsed / this.frames;
      this.frames = 0;
      this.lastSample = now;
      this.render(rendererInfo);
    }
  }

  private render(info?: { calls: number; triangles: number }) {
    const calls = info?.calls ?? 0;
    const tris = info?.triangles ?? 0;
    const exceeded =
      calls > CONFIG.budgets.maxDrawCalls ||
      tris > CONFIG.budgets.maxVisibleTriangles ||
      this.fps < CONFIG.budgets.fpsAccept;

    this.el.classList.toggle('budget-exceeded', exceeded);

    this.el.textContent =
      `FPS: ${this.fps.toFixed(1)}  (${this.frameTimeMs.toFixed(1)} ms)\n` +
      `Draw calls: ${calls} / ${CONFIG.budgets.maxDrawCalls}\n` +
      `Triangles: ${tris.toLocaleString()} / ${CONFIG.budgets.maxVisibleTriangles.toLocaleString()}\n` +
      (exceeded ? '⚠ BUDGET EXCEEDED' : 'Budgets OK');
  }

  getStats(): PerfStats {
    return {
      fps: this.fps,
      frameTimeMs: this.frameTimeMs,
      drawCalls: 0,
      triangles: 0,
      budgetExceeded: this.fps < CONFIG.budgets.fpsAccept,
    };
  }
}
