/**
 * Camera parsed from Google Earth web:
 * https://earth.google.com/web/@25.0464228,35.77440415,0a,7465604.54815505d,35y,359.99999914h,0t,0r
 */
export const GOOGLE_EARTH_VIEW = {
  lat: 25.0464228,
  lng: 35.77440415,
  altitude: 0,
  cameraDistanceMeters: 7_465_604.54815505,
  yaw: 35,
  heading: 360,
  tilt: 0,
  roll: 0,
} as const;

const EARTH_RADIUS_M = 6_371_000;

/** react-globe.gl altitude = camera distance from Earth center in globe-radii units */
export function googleEarthDistanceToGlobeAltitude(distanceMeters: number): number {
  return (EARTH_RADIUS_M + distanceMeters) / EARTH_RADIUS_M;
}

/** Google Maps zoom calibrated for this Google Earth camera distance */
export function googleEarthDistanceToGoogleMapsZoom(
  distanceMeters: number,
  lat: number,
): number {
  const latRad = (lat * Math.PI) / 180;
  const metersPerPixelAtZoom0 = 156_543.03392 * Math.cos(latRad);
  const viewportMeters = distanceMeters * 1.85;
  const zoom = Math.log2(metersPerPixelAtZoom0 / (viewportMeters / 512));
  return Math.round(Math.max(2, Math.min(4, zoom)));
}
