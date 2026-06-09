/** Google Maps globe view: @12.9502377,65.545595,3.47z */
export const GLOBE_DEFAULT_CENTER = { lat: 12.9502377, lng: 65.545595 };
export const GLOBE_DEFAULT_ZOOM = 3.47;

/** Calibrated: Google Maps z3.47 ≈ altitude 1.88 in react-globe.gl */
export function googleZoomToAltitude(zoom: number): number {
  return Math.max(0.4, Math.min(2.8, 2.95 - zoom * 0.31));
}

export const GLOBE_DEFAULT_ALTITUDE = googleZoomToAltitude(GLOBE_DEFAULT_ZOOM);

export const GLOBE_EARTH_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-day.jpg";

export const GLOBE_WATER_LABELS = [
  { lat: -8, lng: 78, text: "Indian Ocean" },
  { lat: 15, lng: 64, text: "Arabian Sea" },
  { lat: 14, lng: 88, text: "Bay of Bengal" },
  { lat: 25, lng: 38, text: "Red Sea" },
  { lat: 5, lng: 115, text: "South China Sea" },
  { lat: -20, lng: 155, text: "Coral Sea" },
] as const;

export function createEquatorPath() {
  const coords: { lat: number; lng: number }[] = [];
  for (let lng = -180; lng <= 180; lng += 3) {
    coords.push({ lat: 0, lng });
  }
  return [{ coords }];
}
