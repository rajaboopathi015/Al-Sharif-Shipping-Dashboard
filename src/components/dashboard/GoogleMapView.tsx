"use client";

import {
  CircleF,
  GoogleMap,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useMemo } from "react";
import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_EMBED_URL,
  MAP_DEFAULT_CENTER,
  MAP_DEFAULT_ZOOM,
} from "@/lib/mapConfig";
import {
  highlightCircleRadiusMeters,
  highlightFillOpacity,
  pointColor,
} from "@/lib/mapHighlightUtils";
import type { GlobePoint } from "@/lib/types";
import { GoogleMapEmbedOverlay } from "./GoogleMapEmbedOverlay";
import { MapPointMarker } from "./MapPointMarker";

type GoogleMapViewProps = {
  points: GlobePoint[];
  showVolume: boolean;
  onHover: (point: GlobePoint | null) => void;
  className?: string;
};

const mapContainerStyle = { width: "100%", height: "100%" };

export function GoogleMapView({
  points,
  showVolume,
  onHover,
  className = "",
}: GoogleMapViewProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "alsharif-google-map",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(
    () => ({ lat: MAP_DEFAULT_CENTER.lat, lng: MAP_DEFAULT_CENTER.lng }),
    [],
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      mapTypeId: "hybrid",
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      scaleControl: true,
      rotateControl: true,
      gestureHandling: "greedy",
      clickableIcons: false,
      styles: [
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
      ],
    }),
    [],
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter(center);
    map.setZoom(MAP_DEFAULT_ZOOM);
  }, [center]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`google-maps-view absolute inset-0 overflow-hidden rounded ${className}`}>
        <iframe
          title="Google Maps"
          src={GOOGLE_MAPS_EMBED_URL}
          className="google-maps-embed absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <GoogleMapEmbedOverlay
          points={points}
          showVolume={showVolume}
          onHover={onHover}
        />
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        className={`google-maps-view flex min-h-0 flex-col items-center justify-center gap-2 rounded bg-[#e8f0f8] p-4 text-center ${className}`}
      >
        <p className="text-sm font-medium text-dashboard-primary">Google Maps failed to load</p>
        <p className="text-xs text-dashboard-secondary">Check your Google Maps API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        className={`google-maps-view flex min-h-0 items-center justify-center rounded bg-[#e8f0f8] ${className}`}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={`google-maps-view absolute inset-0 min-h-0 overflow-hidden rounded ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={MAP_DEFAULT_ZOOM}
        options={mapOptions}
        onLoad={onLoad}
      >
        {points.map((point) => (
          <CircleF
            key={`${point.name}-highlight`}
            center={{ lat: point.lat, lng: point.lng }}
            radius={highlightCircleRadiusMeters(point.intensity, point.volume)}
            options={{
              fillColor: pointColor(point.intensity),
              fillOpacity: highlightFillOpacity(point.intensity),
              strokeColor: pointColor(point.intensity),
              strokeOpacity: 0.55,
              strokeWeight: 1,
              clickable: false,
            }}
          />
        ))}

        {points.map((point) => (
          <OverlayViewF
            key={point.name}
            position={{ lat: point.lat, lng: point.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <MapPointMarker
              point={point}
              showVolume={showVolume}
              onHover={onHover}
            />
          </OverlayViewF>
        ))}
      </GoogleMap>
    </div>
  );
}
