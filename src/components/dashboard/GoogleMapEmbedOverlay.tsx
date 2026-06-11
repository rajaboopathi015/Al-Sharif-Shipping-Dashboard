"use client";

import {
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
} from "@/lib/mapConfig";
import { projectLatLngToPercent } from "@/lib/mapHighlightUtils";
import type { GlobePoint } from "@/lib/types";
import { MapPointMarker } from "./MapPointMarker";

type GoogleMapEmbedOverlayProps = {
  points: GlobePoint[];
  showVolume: boolean;
  onHover: (point: GlobePoint | null) => void;
};

export function GoogleMapEmbedOverlay({
  points,
  showVolume,
  onHover,
}: GoogleMapEmbedOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {points.map((point) => {
        const { x, y } = projectLatLngToPercent(
          point.lat,
          point.lng,
          MAP_DEFAULT_CENTER.lat,
          MAP_DEFAULT_CENTER.lng,
          MAP_DEFAULT_ZOOM,
        );

        if (x < -8 || x > 108 || y < -8 || y > 108) return null;

        return (
          <div
            key={point.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <MapPointMarker point={point} showVolume={showVolume} onHover={onHover} />
          </div>
        );
      })}
    </div>
  );
}
