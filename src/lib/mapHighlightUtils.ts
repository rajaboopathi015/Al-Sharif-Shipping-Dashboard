import { intensityColor } from "./mockData";
import type { GlobePoint } from "./types";

export function markerDotSize(intensity: GlobePoint["intensity"]): number {
  if (intensity === "high") return 10;
  if (intensity === "medium") return 8;
  return 6;
}

/** Harbour-scale highlight radius (not country-scale) */
export function highlightCircleRadiusMeters(
  intensity: GlobePoint["intensity"],
  volume: number,
): number {
  const base =
    intensity === "high" ? 55_000 : intensity === "medium" ? 40_000 : 28_000;
  return base + volume * 0.025;
}

export function highlightFillOpacity(intensity: GlobePoint["intensity"]): number {
  if (intensity === "high") return 0.28;
  if (intensity === "medium") return 0.22;
  return 0.18;
}

export function pointColor(intensity: GlobePoint["intensity"]): string {
  return intensityColor[intensity];
}

/** Project lat/lng to % position for iframe overlay at a fixed center/zoom */
export function projectLatLngToPercent(
  lat: number,
  lng: number,
  centerLat: number,
  centerLng: number,
  zoom: number,
): { x: number; y: number } {
  const tileSize = 256;
  const scale = tileSize * 2 ** zoom;

  function projectPoint(pointLat: number, pointLng: number) {
    const x = ((pointLng + 180) / 360) * scale;
    const sin = Math.sin((pointLat * Math.PI) / 180);
    const y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale;
    return { x, y };
  }

  const point = projectPoint(lat, lng);
  const center = projectPoint(centerLat, centerLng);

  return {
    x: 50 + ((point.x - center.x) / scale) * 100,
    y: 50 + ((point.y - center.y) / scale) * 100,
  };
}
