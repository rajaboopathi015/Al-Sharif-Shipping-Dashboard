export type CountryFeature = {
  type: "Feature";
  properties: { ADMIN?: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};

export type CountryLabel = {
  lat: number;
  lng: number;
  text: string;
  name: string;
};

type Ring = [number, number][];

/** Large countries stay readable when the globe is zoomed out (Google Maps style). */
const MAJOR_COUNTRIES = new Set([
  "India",
  "China",
  "Russia",
  "United States of America",
  "Brazil",
  "Australia",
  "Canada",
  "Argentina",
  "Kazakhstan",
  "Algeria",
  "Democratic Republic of the Congo",
  "Saudi Arabia",
  "Mexico",
  "Indonesia",
  "Sudan",
  "Libya",
  "Iran",
  "Mongolia",
  "Peru",
  "Chad",
  "Niger",
  "Angola",
  "Mali",
  "South Africa",
  "Colombia",
  "Ethiopia",
  "Bolivia",
  "Mauritania",
  "Egypt",
  "Tanzania",
  "Nigeria",
  "Venezuela",
  "Pakistan",
  "Namibia",
  "Mozambique",
  "Turkey",
  "Chile",
  "Zambia",
  "Myanmar",
  "Afghanistan",
  "Somalia",
  "Central African Republic",
  "Ukraine",
  "Madagascar",
  "Botswana",
  "Kenya",
  "France",
  "Yemen",
  "Thailand",
  "Spain",
  "Turkmenistan",
  "Cameroon",
  "Papua New Guinea",
  "Sweden",
  "Uzbekistan",
  "Morocco",
  "Iraq",
  "Paraguay",
  "Zimbabwe",
  "Japan",
  "Germany",
  "Congo",
  "Finland",
  "Vietnam",
  "Malaysia",
  "Norway",
  "Côte d'Ivoire",
  "Poland",
  "Oman",
  "Italy",
  "Philippines",
  "Ecuador",
  "New Zealand",
  "United Kingdom",
  "Romania",
  "Laos",
  "Uganda",
  "Guyana",
  "Belarus",
  "Senegal",
  "Syria",
  "Cambodia",
  "Uruguay",
  "Tunisia",
  "Suriname",
  "Bangladesh",
  "Nepal",
  "Greece",
  "Nicaragua",
  "North Korea",
  "South Korea",
  "Malawi",
  "Eritrea",
  "Benin",
  "Honduras",
  "Liberia",
  "Bulgaria",
  "Cuba",
  "Guatemala",
  "Iceland",
  "South Sudan",
  "Latvia",
  "Lithuania",
  "Sri Lanka",
  "Georgia",
  "Ireland",
  "Costa Rica",
  "Denmark",
  "Netherlands",
  "Switzerland",
  "Austria",
  "Belgium",
  "Portugal",
  "Hungary",
  "Czech Republic",
  "United Arab Emirates",
  "Israel",
  "Jordan",
  "Kuwait",
  "Qatar",
  "Bahrain",
]);

function ringCentroid(ring: Ring): { lat: number; lng: number } {
  let sumLat = 0;
  let sumLng = 0;

  for (const [lng, lat] of ring) {
    sumLat += lat;
    sumLng += lng;
  }

  const count = ring.length || 1;
  return { lat: sumLat / count, lng: sumLng / count };
}

export function geometryCentroid(geometry: CountryFeature["geometry"]): { lat: number; lng: number } {
  if (geometry.type === "Polygon") {
    return ringCentroid(geometry.coordinates[0] as Ring);
  }

  const firstPolygon = geometry.coordinates[0] as Ring[];
  return ringCentroid(firstPolygon[0]);
}

export function featureToLabel(feature: CountryFeature): CountryLabel | null {
  const name = feature.properties.ADMIN?.trim();
  if (!name) return null;

  const { lat, lng } = geometryCentroid(feature.geometry);
  return { lat, lng, name, text: name };
}

export const COUNTRIES_GEOJSON_URL =
  "https://unpkg.com/three-globe/example/countries.geojson";

export function shouldShowCountryLabel(name: string, altitude: number): boolean {
  if (altitude > 2.35) return MAJOR_COUNTRIES.has(name);
  return true;
}

/** Google Maps globe: labels visible across most zoom levels. */
export function countryLabelSize(altitude: number): number {
  if (altitude >= 1.55 && altitude <= 2.15) return 1.08;
  if (altitude > 2.15) return 0.84;
  if (altitude < 0.75) return 0.4 + altitude * 0.38;
  return 0.58 + (altitude - 0.75) * 0.42;
}

export function countryLabelColor(): string {
  return "rgba(32, 33, 36, 0.92)";
}

export function waterLabelSize(altitude: number): number {
  if (altitude >= 1.55 && altitude <= 2.15) return 1.18;
  if (altitude > 2.15) return 0.92;
  return 0.62 + altitude * 0.22;
}

export function waterLabelColor(): string {
  return "rgba(26, 115, 232, 0.88)";
}
