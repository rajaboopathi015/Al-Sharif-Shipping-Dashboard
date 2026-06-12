"use client";

import dynamic from "next/dynamic";
import { ChevronDown, Globe, LayoutGrid, Map, Volume2 } from "lucide-react";
import { useCallback, useState } from "react";
import { ChartCard } from "@/components/ui/ChartCard";
import { globePoints, intensityColor } from "@/lib/mockData";
import type { GlobePoint } from "@/lib/types";

const GlobeVisualization = dynamic(
  () => import("./GlobeVisualization").then((m) => m.GlobeVisualization),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-0 items-center justify-center rounded bg-[#e8f0f8]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    ),
  },
);

const GoogleMapView = dynamic(
  () => import("./GoogleMapView").then((m) => m.GoogleMapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-0 items-center justify-center rounded bg-[#e8f0f8]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
      </div>
    ),
  },
);

const legend = [
  { label: "Low", color: intensityColor.low },
  { label: "Medium", color: intensityColor.medium },
  { label: "High", color: intensityColor.high },
];

const legendDotClass: Record<(typeof legend)[number]["label"], string> = {
  Low: "globe-legend-dot--low",
  Medium: "globe-legend-dot--medium",
  High: "globe-legend-dot--high",
};

function HoverTooltip({ point }: { point: GlobePoint }) {
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-gray-900">{point.name}</p>
      <p className="text-gray-600">Volume: {(point.volume / 1000).toFixed(0)}K TEU</p>
      <p className="capitalize text-gray-500">Intensity: {point.intensity}</p>
    </div>
  );
}

const navyBtn =
  "rounded-lg bg-[#3B4B6B] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#2f3d57]";

export function GlobeModule() {
  const [viewMode, setViewMode] = useState<"globe" | "map">("globe");
  const [showVolume, setShowVolume] = useState(false);
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [widgetsHidden, setWidgetsHidden] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<GlobePoint | null>(null);

  const handleHover = useCallback((point: GlobePoint | null) => {
    setHoveredPoint(point);
  }, []);

  return (
    <ChartCard
      title="Shipment Distribution"
      showToolbar={false}
      hideHeader
      compact
      fill
      delay={460}
      className="min-h-0 w-full flex-1 overflow-hidden !bg-gradient-to-br from-[#eef6fc] to-[#f8fbfe]"
    >
      {!widgetsHidden && (
        <div className="mb-2 flex flex-wrap justify-between gap-3">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-blue-100 bg-white p-0.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setViewMode("globe")}
                  className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "globe"
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-dashboard-secondary hover:text-dashboard-primary"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" />
                  Globe
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    viewMode === "map"
                      ? "bg-[#2563EB] text-white shadow-sm"
                      : "text-dashboard-secondary hover:text-dashboard-primary"
                  }`}
                >
                  <Map className="h-3.5 w-3.5" />
                  Map
                </button>
              </div>
              <button type="button" onClick={() => setWidgetsHidden(true)} className={navyBtn}>
                Hide Widgets
              </button>
            </div>

            {viewMode === "globe" && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-dashboard-secondary">Rotation</span>
                {rotationEnabled ? (
                  <button
                    type="button"
                    role="switch"
                    aria-checked="true"
                    aria-label="Toggle globe rotation"
                    onClick={() => setRotationEnabled(false)}
                    className="relative h-5 w-9 rounded-full bg-[#2563EB] transition"
                  >
                    <span className="absolute left-[18px] top-0.5 h-4 w-4 rounded-full bg-white shadow transition" />
                  </button>
                ) : (
                  <button
                    type="button"
                    role="switch"
                    aria-checked="false"
                    aria-label="Toggle globe rotation"
                    onClick={() => setRotationEnabled(true)}
                    className="relative h-5 w-9 rounded-full bg-gray-300 transition"
                  >
                    <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition" />
                  </button>
                )}
                <span className="text-xs font-medium text-[#2563EB]">
                  {rotationEnabled ? "On" : "Off"}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <button type="button" className={`${navyBtn} px-2.5`} aria-label="Layout options">
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <div className="relative">
              <select
                aria-label="Globe visualization preset"
                className="appearance-none rounded-lg border border-dashboard-border bg-white py-1.5 pl-3 pr-7 text-xs font-medium text-dashboard-primary shadow-sm"
              >
                <option>Default</option>
                <option>Volume</option>
                <option>Density</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-dashboard-secondary" />
            </div>
          </div>
        </div>
      )}

      {widgetsHidden && (
        <button
          type="button"
          onClick={() => setWidgetsHidden(false)}
          className={`mb-2 self-start ${navyBtn}`}
        >
          Show Widgets
        </button>
      )}

      <div className="relative min-h-0 flex-1 overflow-hidden">
        {viewMode === "map" ? (
          <GoogleMapView
            points={globePoints}
            showVolume={showVolume}
            onHover={handleHover}
            className="absolute inset-0"
          />
        ) : (
          <GlobeVisualization
            points={globePoints}
            showVolume={showVolume}
            rotationEnabled={rotationEnabled}
            onHover={handleHover}
            className="absolute inset-0"
          />
        )}

        {hoveredPoint && <HoverTooltip point={hoveredPoint} />}
      </div>

      <div className="mt-2 flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${legendDotClass[item.label]}`} />
              <span className="text-[10px] text-dashboard-secondary">{item.label}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowVolume((v) => !v)}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-medium transition ${
            showVolume
              ? "border-blue-300 bg-blue-50 text-blue-700"
              : "border-dashboard-border bg-white text-dashboard-primary hover:bg-gray-50"
          }`}
        >
          <Volume2 className="h-3 w-3" />
          Show Volume Contribution
        </button>
      </div>
    </ChartCard>
  );
}
