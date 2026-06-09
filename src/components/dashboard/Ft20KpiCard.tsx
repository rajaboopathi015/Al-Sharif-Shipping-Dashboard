"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { kpiData } from "@/lib/mockData";
import {
  KPI_BAR_MARGIN,
  KPI_CHART_HEIGHT,
  kpiBadge,
  kpiCardShell,
  kpiChartCol,
  kpiIconWrap,
  kpiLeftCol,
  kpiMuted,
  kpiTitle,
  kpiValue,
  kpiXAxisLine,
  kpiXAxisTick,
} from "./kpiCardStyles";

const HIGHLIGHT_COLOR = "#2DD4BF";
const BAR_COLOR = "rgba(255, 248, 230, 0.85)";

function PortIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 18h16" />
      <path d="M6 18V9l4-3 4 3v9" />
      <path d="M10 6V4h4v2" />
      <path d="M18 14h2l-1 4h-6" />
      <path d="M3 14h3l1 4H3" />
      <path d="M8 18c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" />
    </svg>
  );
}

export function Ft20KpiCard() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.85 : filters.tradeMode === "export" ? 1.12 : 1;

  const displayValue = Math.round(kpiData.total20ft.value * multiplier);
  const chartData = kpiData.total20ft.yearlyTrend.map((d) => ({
    ...d,
    value: Math.round(d.value * multiplier),
  }));

  return (
    <div
      className={`${kpiCardShell} bg-[#FF5C75]`}
      style={{ animationDelay: "80ms" }}
    >
      <div className={kpiLeftCol}>
        <div className={kpiIconWrap}>
          <PortIcon className="h-4 w-4 text-[#FF5C75]" />
        </div>
        <div>
          <p className={kpiTitle}>Total 20ft#</p>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <p className={kpiValue}>{displayValue}k</p>
            <span className={kpiBadge}>{kpiData.total20ft.change}</span>
            <span className={kpiMuted}>last Year</span>
          </div>
        </div>
      </div>
      <div className={kpiChartCol}>
        <ResponsiveContainer width="100%" height={KPI_CHART_HEIGHT}>
          <BarChart
            data={chartData}
            margin={KPI_BAR_MARGIN}
            barCategoryGap="18%"
            style={{ background: "transparent" }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.25)" vertical={false} />
            <XAxis
              dataKey="year"
              axisLine={kpiXAxisLine}
              tickLine={false}
              tick={kpiXAxisTick}
              interval={0}
              height={18}
            />
            <YAxis
              axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
              tickLine={false}
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.85)" }}
              ticks={[0, 2000, 5000]}
              domain={[0, 5000]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
              width={24}
            />
            <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={18}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? HIGHLIGHT_COLOR : BAR_COLOR} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
