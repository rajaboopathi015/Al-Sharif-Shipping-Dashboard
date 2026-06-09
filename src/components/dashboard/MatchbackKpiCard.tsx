"use client";

import { useFilters } from "@/context/FilterContext";
import { kpiData } from "@/lib/mockData";
import { kpiCardShell, kpiIconWrap, kpiTitle, kpiValue } from "./kpiCardStyles";

const EXPORT_COLOR = "#F5A623";
const IMPORT_COLOR = "#F5F0E1";

function MatchbackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 14c-1.5-1-2.5-2.5-2.5-4.5C5.5 6.5 8 4 12 4s6.5 2.5 6.5 5.5c0 2-1 3.5-2.5 4.5" />
      <path d="M9 13.5 12 16l3-2.5" />
      <path d="M12 10.5v5.5" />
      <path d="M10.5 9.5h3v3h-3z" fill="currentColor" stroke="none" />
      <path d="M7 17c1 .8 2.2 1.2 3.5 1.2h3c1.3 0 2.5-.4 3.5-1.2" />
    </svg>
  );
}

type VolumeBarProps = {
  value: number;
  maxValue: number;
  color: string;
  label: string;
};

function VolumeBar({ value, maxValue, color, label }: VolumeBarProps) {
  const widthPct = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative h-[9px] min-w-0 flex-1">
        <div
          className="h-full rounded-r-full transition-all duration-500"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
      </div>
      <span className="shrink-0 text-[10px] font-medium text-white">{label}</span>
    </div>
  );
}

export function MatchbackKpiCard() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 1.08 : filters.tradeMode === "export" ? 0.92 : 1;

  const exportVol = kpiData.matchback.exportVolume * multiplier;
  const importVol = kpiData.matchback.importVolume * multiplier;
  const maxBar = Math.max(exportVol, importVol);

  const formatVolume = (v: number) => `${v.toFixed(1)}k`;

  return (
    <div
      className={`${kpiCardShell} flex-col justify-between p-3 text-white`}
      style={{
        animationDelay: "240ms",
        background: "linear-gradient(to right, #9E1458 0%, #4A148C 100%)",
      }}
    >
      <div className="flex shrink-0 items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={kpiTitle}>Matchback</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <p className={kpiValue}>{kpiData.matchback.value}%</p>
            <span className="rounded-full bg-[#B9F6CA] px-1.5 py-0.5 text-[10px] font-semibold text-[#004D40]">
              {kpiData.matchback.change}
            </span>
          </div>
        </div>
        <div className={kpiIconWrap}>
          <MatchbackIcon className="h-4 w-4 text-[#6A1B9A]" />
        </div>
      </div>

      <div className="space-y-0.5">
        <VolumeBar
          value={exportVol}
          maxValue={maxBar}
          color={EXPORT_COLOR}
          label={formatVolume(exportVol)}
        />
        <VolumeBar
          value={importVol}
          maxValue={maxBar}
          color={IMPORT_COLOR}
          label={formatVolume(importVol)}
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 shrink-0 rounded-sm bg-[#F5A623]" />
          <span className="whitespace-nowrap text-[9px] text-white/90">Total Export</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 shrink-0 rounded-sm bg-[#F5F0E1]" />
          <span className="whitespace-nowrap text-[9px] text-white/90">Total Import</span>
        </div>
      </div>
    </div>
  );
}
