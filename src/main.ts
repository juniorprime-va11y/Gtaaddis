/**
 * GTA Addis: Southside Stories — M1 Foundation
 * Basic scene + fixed-timestep loop + FPS overlay
 * Performance numbers are ESTIMATE until measured on target hardware.
 */

import * as THREE from 'three';
import { CONFIG } from './core/config';
import {
  createLoopState,
  advanceLoop,
  pauseLoop,
  resumeLoop,
  type LoopState,
} from './core/gameLoop';
import { FpsOverlay } from './ui/fpsOverlay';

// ---------------------------------------------------------------------------
// Renderer & Scene
// ---------------------------------------------------------------------------
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: false,
  powerPreference: 'low-power',
});
renderer.setPixelRatio(CONFIG.pixelRatio);
renderer.setSize(CONFIG.resolution.width, CONFIG.resolution.height, false);
renderer.setClearColor(0x87ceeb); // sky blue

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x87ceeb, 40, 90);

const camera = new THREE.PerspectiveCamera(
  60,
  CONFIG.resolution.width / CONFIG.resolution.height,
  0.1,
  200
);
camera.position.set(0, 8, 16);
camera.lookAt(0, 0, 0);

// Simple ground (Piazza placeholder)
const groundGeo = new THREE.PlaneGeometry(80, 80);
const groundMat = new THREE.MeshBasicMaterial({ color: 0x555555 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// A few simple buildings (shared material)
const buildingMat = new THREE.MeshBasicMaterial({ color: 0x8b7355 });
const buildingGeo = new THREE.BoxGeometry(4, 6, 4);
for (let i = 0; i < 8; i++) {
  const b = new THREE.Mesh(buildingGeo, buildingMat);
  const angle = (i / 8) * Math.PI * 2;
  b.position.set(Math.cos(angle) * 18, 3, Math.sin(angle) * 18);
  scene.add(b);
}

// Ambient + directional (no real-time shadows on Low)
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);
const sun = new THREE.DirectionalLight(0xfff5e0, 0.6);
sun.position.set(20, 40, 10);
scene.add(sun);

// ---------------------------------------------------------------------------
// Loop & Overlay
// ---------------------------------------------------------------------------
const fpsOverlay = new FpsOverlay();
let loopState: LoopState = createLoopState(performance.now());
loopState.running = true;

function onVisibilityChange() {
  if (document.hidden) {
    loopState = pauseLoop(loopState);
  } else {
    loopState = resumeLoop(loopState, performance.now());
  }
}
document.addEventListener('visibilitychange', onVisibilityChange);

function resize() {
  // Keep internal resolution at budget; scale the canvas via CSS
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  // Camera aspect follows display
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// Simple camera orbit for the foundation demo
let camAngle = 0;

function update(dt: number) {
  camAngle += dt * 0.15;
  camera.position.x = Math.sin(camAngle) * 18;
  camera.position.z = Math.cos(camAngle) * 18;
  camera.lookAt(0, 1, 0);
}

function render() {
  renderer.render(scene, camera);
  const info = renderer.info.render;
  fpsOverlay.tick({ calls: info.calls, triangles: info.triangles });
}

function frame(now: number) {
  const { steps, newState } = advanceLoop(
    loopState,
    now,
    CONFIG.fixedDt,
    CONFIG.maxFrameTime,
    CONFIG.maxStepsPerFrame
  );
  loopState = newState;

  for (let i = 0; i < steps; i++) {
    update(CONFIG.fixedDt);
  }

  render();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

console.log('[GTA Addis] M1 foundation started. Performance numbers are ESTIMATE until measured.');
