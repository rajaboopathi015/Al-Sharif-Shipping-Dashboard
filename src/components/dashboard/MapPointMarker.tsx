import type { CSSProperties } from "react";
import { markerDotSize, pointColor } from "@/lib/mapHighlightUtils";
import type { GlobePoint } from "@/lib/types";

type MapPointMarkerProps = {
  point: GlobePoint;
  showVolume?: boolean;
  onHover?: (point: GlobePoint | null) => void;
};

export function MapPointMarker({
  point,
  showVolume = false,
  onHover,
}: MapPointMarkerProps) {
  const size = markerDotSize(point.intensity);
  const color = pointColor(point.intensity);

  return (
    <div
      className="google-map-marker pointer-events-auto"
      style={
        {
          "--marker-color": color,
          "--marker-size": `${size}px`,
        } as CSSProperties
      }
      title={
        showVolume
          ? `${point.name}: ${(point.volume / 1000).toFixed(0)}K TEU`
          : point.name
      }
      onMouseEnter={() => onHover?.(point)}
      onMouseLeave={() => onHover?.(null)}
    >
      <span className="google-map-marker__glow" />
      <span className="google-map-marker__ring google-map-marker__ring--pulse" />
      <span className="google-map-marker__dot" />
    </div>
  );
}
