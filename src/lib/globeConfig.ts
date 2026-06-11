import {
  GOOGLE_EARTH_VIEW,
  googleEarthDistanceToGlobeAltitude,
} from "./googleEarthView";

/** Google Earth web default camera */
export const GLOBE_DEFAULT_CENTER = {
  lat: GOOGLE_EARTH_VIEW.lat,
  lng: GOOGLE_EARTH_VIEW.lng,
};

export const GLOBE_DEFAULT_ALTITUDE = googleEarthDistanceToGlobeAltitude(
  GOOGLE_EARTH_VIEW.cameraDistanceMeters,
);

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
