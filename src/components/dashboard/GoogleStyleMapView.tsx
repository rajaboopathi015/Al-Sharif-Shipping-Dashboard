"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import type { DivIcon, Map as LeafletMap, Marker } from "leaflet";
import { intensityColor } from "@/lib/mockData";
import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_TILE_ATTRIBUTION,
  MAP_TILE_URL,
} from "@/lib/mapConfig";
import type { GlobePoint } from "@/lib/types";

type GoogleStyleMapViewProps = {
  points: GlobePoint[];
  showVolume: boolean;
  onHover: (point: GlobePoint | null) => void;
  className?: string;
};

function markerRadius(intensity: GlobePoint["intensity"]): number {
  if (intensity === "high") return 10;
  if (intensity === "medium") return 8;
  return 6;
}

function createMarkerIcon(L: typeof import("leaflet"), point: GlobePoint): DivIcon {
  const radius = markerRadius(point.intensity);
  const color = intensityColor[point.intensity];

  return L.divIcon({
    className: "",
    html: `
      <div class="google-map-marker" style="--marker-color:${color};--marker-size:${radius}px">
        <span class="google-map-marker__ring"></span>
        <span class="google-map-marker__dot"></span>
      </div>
    `,
    iconSize: [radius * 2.8, radius * 2.8],
    iconAnchor: [radius * 1.4, radius * 1.4],
  });
}

export function GoogleStyleMapView({
  points,
  showVolume,
  onHover,
  className = "",
}: GoogleStyleMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;

    let disposed = false;
    let map: LeafletMap | null = null;

    void (async () => {
      const L = (await import("leaflet")).default;
      if (disposed || !containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [MAP_DEFAULT_CENTER.lat, MAP_DEFAULT_CENTER.lng],
        zoom: MAP_DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: true,
      });

      L.tileLayer(MAP_TILE_URL, {
        subdomains: "abcd",
        maxZoom: 20,
        attribution: MAP_TILE_ATTRIBUTION,
      }).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      mapRef.current = map;
      syncMarkers(L, map, points, showVolume, onHover, markersRef);
    })();

    return () => {
      disposed = true;
      markersRef.current = [];
      map?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    void import("leaflet").then(({ default: L }) => {
      syncMarkers(L, map, points, showVolume, onHover, markersRef);
    });
  }, [onHover, points, showVolume]);

  useEffect(() => {
    const container = containerRef.current;
    const map = mapRef.current;
    if (!container || !map) return;

    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`google-style-map h-full min-h-0 w-full overflow-hidden rounded-xl ${className}`}
    />
  );
}

function syncMarkers(
  L: typeof import("leaflet"),
  map: LeafletMap,
  points: GlobePoint[],
  showVolume: boolean,
  onHover: (point: GlobePoint | null) => void,
  markersRef: MutableRefObject<Marker[]>,
) {
  markersRef.current.forEach((marker) => marker.remove());
  markersRef.current = [];

  for (const point of points) {
    const marker = L.marker([point.lat, point.lng], {
      icon: createMarkerIcon(L, point),
      riseOnHover: true,
    });

    marker.on("mouseover", () => onHover(point));
    marker.on("mouseout", () => onHover(null));

    if (showVolume) {
      marker.bindTooltip(`${point.name}: ${(point.volume / 1000).toFixed(0)}K TEU`, {
        permanent: true,
        direction: "top",
        offset: [0, -8],
        className: "google-map-volume-label",
      });
    }

    marker.addTo(map);
    markersRef.current.push(marker);
  }
}
