import * as THREE from "three";

/** Google Maps globe sky gradient */
export function createGlobeSkyTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
  gradient.addColorStop(0, "#3d7cb5");
  gradient.addColorStop(0.42, "#5a9fd4");
  gradient.addColorStop(1, "#7eb8e3");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const GLOBE_SKY_COLOR = "#5a9fd4";
