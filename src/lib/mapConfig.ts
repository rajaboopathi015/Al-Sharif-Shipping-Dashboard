import {
  GOOGLE_EARTH_VIEW,
  googleEarthDistanceToGoogleMapsZoom,
} from "./googleEarthView";

/** Google Maps / Earth camera — Red Sea / Middle East, wide regional view */
export const MAP_DEFAULT_CENTER = {
  lat: GOOGLE_EARTH_VIEW.lat,
  lng: GOOGLE_EARTH_VIEW.lng,
};

export const MAP_DEFAULT_ZOOM = googleEarthDistanceToGoogleMapsZoom(
  GOOGLE_EARTH_VIEW.cameraDistanceMeters,
  GOOGLE_EARTH_VIEW.lat,
);

export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

/** Public embed fallback — ll=center only (no red pin from q= place marker) */
export const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?ll=${GOOGLE_EARTH_VIEW.lat},${GOOGLE_EARTH_VIEW.lng}&z=${MAP_DEFAULT_ZOOM}&t=k&output=embed`;
