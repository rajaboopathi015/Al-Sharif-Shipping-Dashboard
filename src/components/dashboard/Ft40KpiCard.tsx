"use client";

import { Ship } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { kpiData } from "@/lib/mockData";
import {
  KPI_AREA_MARGIN,
  kpiCardShell,
  kpiChartCol,
  kpiIconWrap,
  kpiLeftCol,
  kpiMuted,
  kpiTitle,
  kpiValue,
  kpiXAxisProps,
} from "./kpiCardStyles";

const CHART_LINE = "#448AFF";

export function Ft40KpiCard() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.85 : filters.tradeMode === "export" ? 1.12 : 1;

  const displayValue = Math.round(kpiData.total40ft.value * multiplier);
  const chartData = kpiData.total40ft.yearlyTrend.map((d) => ({
    ...d,
    value: Math.round(d.value * multiplier),
  }));

  return (
    <div
      className={kpiCardShell}
      style={{
        animationDelay: "160ms",
        background: "linear-gradient(to right, #1B8E6A 0%, #36B37E 100%)",
      }}
    >
      <div className={kpiLeftCol}>
        <div className={kpiIconWrap}>
          <Ship className="h-4 w-4 text-[#1B8E6A]" strokeWidth={2} />
        </div>
        <div>
          <p className={kpiTitle}>Total 40ft#</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <p className={kpiValue}>{displayValue}K</p>
            <span className="rounded-full bg-[#B9F6CA] px-1.5 py-0.5 text-[10px] font-semibold text-[#004D40]">
              {kpiData.total40ft.change}
            </span>
            <span className={kpiMuted}>last Year</span>
          </div>
        </div>
      </div>
      <div className={kpiChartCol}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={KPI_AREA_MARGIN}
            style={{ background: "transparent" }}
          >
            <defs>
              <linearGradient id="ft40AreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.45)"
              horizontal={false}
              vertical
            />
            <XAxis {...kpiXAxisProps} />
            <YAxis
              domain={["dataMin - 300", "dataMax + 300"]}
              axisLine={{ stroke: "rgba(255,255,255,0.55)", strokeWidth: 1 }}
              tickLine={false}
              tick={false}
              width={1}
            />
            <Area
              type="natural"
              dataKey="value"
              stroke={CHART_LINE}
              strokeWidth={1.75}
              fill="url(#ft40AreaFill)"
              dot={{ fill: "#FFFFFF", stroke: CHART_LINE, strokeWidth: 1.5, r: 3 }}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
