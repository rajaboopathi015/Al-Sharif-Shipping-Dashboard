"use client";

import { TeuCargoShipIcon } from "./TeuCargoShipIcon";
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
  kpiBadge,
  kpiCardShell,
  kpiChartCol,
  kpiIconWrap,
  kpiLeftCol,
  kpiMuted,
  kpiTitle,
  kpiValue,
  kpiXAxisProps,
} from "./kpiCardStyles";

const HIGHLIGHT_COLOR = "#FBBF24";
const BAR_COLOR = "rgba(255, 255, 255, 0.4)";

export function TeuKpiCard() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.85 : filters.tradeMode === "export" ? 1.12 : 1;

  const displayValue = Math.round(kpiData.totalTeu.value * multiplier);
  const chartData = kpiData.totalTeu.yearlyTrend.map((d) => ({
    ...d,
    value: Math.round(d.value * multiplier),
  }));

  return (
    <div
      className={`${kpiCardShell} bg-[#1D61D1]`}
      style={{ animationDelay: "0ms" }}
    >
      <div className={kpiLeftCol}>
        <div className={kpiIconWrap}>
          <TeuCargoShipIcon />
        </div>
        <div>
          <p className={kpiTitle}>Total TEUs</p>
          <p className={`mt-0.5 ${kpiValue}`}>{displayValue}K</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className={kpiBadge}>{kpiData.totalTeu.change}</span>
            <span className={kpiMuted}>last Year</span>
          </div>
        </div>
      </div>
      <div className={kpiChartCol}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={KPI_BAR_MARGIN}
            barCategoryGap="18%"
            style={{ background: "transparent" }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" vertical={false} />
            <XAxis {...kpiXAxisProps} />
            <YAxis
              axisLine={{ stroke: "rgba(255,255,255,0.25)" }}
              tickLine={false}
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.75)" }}
              ticks={[0, 2000, 5000]}
              domain={[0, 5000]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}k`)}
              width={24}
            />
            <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={22}>
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
