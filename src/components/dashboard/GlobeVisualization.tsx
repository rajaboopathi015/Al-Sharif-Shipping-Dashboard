"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import {
  COUNTRIES_GEOJSON_URL,
  countryLabelColor,
  countryLabelSize,
  featureToLabel,
  shouldShowCountryLabel,
  waterLabelColor,
  waterLabelSize,
  type CountryFeature,
  type CountryLabel,
} from "@/lib/globeCountries";
import {
  GLOBE_DEFAULT_ALTITUDE,
  GLOBE_DEFAULT_CENTER,
  GLOBE_EARTH_TEXTURE,
  GLOBE_WATER_LABELS,
  createEquatorPath,
} from "@/lib/globeConfig";
import { createGlobeSkyTexture, GLOBE_SKY_COLOR } from "@/lib/globeSkyBackground";
import { intensityColor } from "@/lib/mockData";
import type { GlobePoint } from "@/lib/types";

type GlobeVisualizationProps = {
  points: GlobePoint[];
  showVolume: boolean;
  rotationEnabled: boolean;
  onHover: (point: GlobePoint | null) => void;
  className?: string;
};

const EQUATOR_PATH = createEquatorPath();

export function GlobeVisualization({
  points,
  showVolume,
  rotationEnabled,
  onHover,
  className = "",
}: GlobeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const povInitializedRef = useRef(false);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [countryLabels, setCountryLabels] = useState<CountryLabel[]>([]);
  const [cameraAltitude, setCameraAltitude] = useState(GLOBE_DEFAULT_ALTITUDE);

  useEffect(() => {
    let cancelled = false;

    fetch(COUNTRIES_GEOJSON_URL)
      .then((res) => res.json())
      .then((geojson: { features: CountryFeature[] }) => {
        if (cancelled) return;
        setCountries(geojson.features);
        setCountryLabels(
          geojson.features
            .map(featureToLabel)
            .filter((label): label is CountryLabel => label !== null),
        );
      })
      .catch(() => {
        if (!cancelled) {
          setCountries([]);
          setCountryLabels([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setDims({
        width: Math.round(el.clientWidth),
        height: Math.round(el.clientHeight),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = rotationEnabled;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.zoomSpeed = 0.55;
    controls.minDistance = 108;
    controls.maxDistance = 540;

    if (!povInitializedRef.current) {
      globe.pointOfView({
        lat: GLOBE_DEFAULT_CENTER.lat,
        lng: GLOBE_DEFAULT_CENTER.lng,
        altitude: GLOBE_DEFAULT_ALTITUDE,
      });
      povInitializedRef.current = true;
    }

    const syncAltitude = () => {
      const { altitude } = globe.pointOfView();
      setCameraAltitude(altitude);
    };

    syncAltitude();
    controls.addEventListener("change", syncAltitude);
    return () => controls.removeEventListener("change", syncAltitude);
  }, [rotationEnabled, dims.width]);

  useEffect(() => {
    if (dims.width > 0 && dims.height > 0) {
      applySkyBackground();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reapply after resize remount
  }, [dims.width, dims.height]);

  const labelsData = useMemo(() => {
    const volumeLabels = showVolume
      ? points.map((p) => ({
          lat: p.lat,
          lng: p.lng,
          text: `${p.name}: ${(p.volume / 1000).toFixed(0)}K`,
          color: "rgba(32,33,36,0.95)",
          size: 0.55,
        }))
      : [];

    const nameLabels = countryLabels
      .filter((label) => shouldShowCountryLabel(label.name, cameraAltitude))
      .map((label) => ({
        lat: label.lat,
        lng: label.lng,
        text: label.text,
        size: countryLabelSize(cameraAltitude),
        color: countryLabelColor(),
      }));

    const oceanLabels = GLOBE_WATER_LABELS.map((label) => ({
      lat: label.lat,
      lng: label.lng,
      text: label.text,
      size: waterLabelSize(cameraAltitude),
      color: waterLabelColor(),
    }));

    return [...oceanLabels, ...nameLabels, ...volumeLabels];
  }, [cameraAltitude, countryLabels, points, showVolume]);

  const applySkyBackground = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const scene = globe.scene();
    scene.background = createGlobeSkyTexture();
  };

  return (
    <div
      ref={containerRef}
      className={`google-globe-view min-h-0 w-full overflow-hidden rounded ${className}`}
    >
      {dims.width > 0 && dims.height > 0 && (
        <Globe
          ref={globeRef}
          width={dims.width}
          height={dims.height}
          onGlobeReady={applySkyBackground}
          globeImageUrl={GLOBE_EARTH_TEXTURE}
          backgroundColor={GLOBE_SKY_COLOR}
          polygonsData={countries}
          polygonCapColor={() => "rgba(0, 0, 0, 0)"}
          polygonSideColor={() => "rgba(0, 0, 0, 0)"}
          polygonStrokeColor={() => "rgba(72, 72, 72, 0.42)"}
          polygonAltitude={0.004}
          pathsData={EQUATOR_PATH}
          pathPoints="coords"
          pathPointLat="lat"
          pathPointLng="lng"
          pathColor={() => "rgba(70, 70, 70, 0.55)"}
          pathStroke={0.35}
          pathDashLength={0.45}
          pathDashGap={0.25}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d) => intensityColor[(d as GlobePoint).intensity]}
          pointAltitude={0.012}
          pointRadius={(d) => {
            const p = d as GlobePoint;
            return p.intensity === "high" ? 0.32 : p.intensity === "medium" ? 0.24 : 0.18;
          }}
          pointResolution={12}
          pointsTransitionDuration={400}
          onPointHover={(point) => onHover((point as GlobePoint) ?? null)}
          labelsData={labelsData}
          labelLat="lat"
          labelLng="lng"
          labelText="text"
          labelSize="size"
          labelColor="color"
          labelIncludeDot={false}
          labelResolution={3}
          labelAltitude={0.006}
          atmosphereColor="#ffffff"
          atmosphereAltitude={0.2}
        />
      )}
    </div>
  );
}
