"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import {
  monthlyPerformance,
  yearlyFt20Performance,
  yearlyFt40Performance,
  yearlyTeuPerformance,
} from "@/lib/mockData";
import type { PerformanceMetric } from "@/lib/types";
import { AnalyticsChartToolbar } from "../ui/AnalyticsChartToolbar";
import { ChartCard } from "../ui/ChartCard";
import { ResponsiveChartContainer } from "../ui/ResponsiveChartContainer";
import { analyticsLeftYAxisLabel, analyticsYAxisTick, analyticsYTickFormatter } from "./analyticsLayout";

const tooltipStyle = {
  borderRadius: 4,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 11,
};

const SCALE = 1000;

const CHART_MARGIN = { top: 8, right: 12, left: 4, bottom: 0 };

const Y_TICKS = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];

const FT20_COLOR = "#3B82F6";
const FT40_COLOR = "#FF5C75";
const TEU_COLOR = "#F59E0B";

const YEAR_COLORS = {
  y2025: "#2563EB",
  y2024: "#FF5C75",
  y2023: "#A855F7",
  y2022: "#14B8A6",
  y2021: "#F59E0B",
} as const;

const YEAR_LABELS = [
  { key: "y2025", label: "2025", color: YEAR_COLORS.y2025 },
  { key: "y2024", label: "2024", color: YEAR_COLORS.y2024 },
  { key: "y2023", label: "2023", color: YEAR_COLORS.y2023 },
  { key: "y2022", label: "2022", color: YEAR_COLORS.y2022 },
  { key: "y2021", label: "2021", color: YEAR_COLORS.y2021 },
] as const;

type Period = "month" | "year";

const VALUE_LABEL_TEXT = "#111827";

type AreaValueLabelProps = {
  x?: number;
  y?: number;
  value?: number;
  bg: string;
};

function AreaValueLabel({ x, y, value, bg }: AreaValueLabelProps) {
  if (x == null || y == null || value == null) return null;

  const text = `${Math.round(value / 1000)}k`;
  const width = Math.max(28, text.length * 6.5 + 10);

  return (
    <g>
      <rect x={x - width / 2} y={y - 22} width={width} height={15} rx={3} fill={bg} />
      <text
        x={x}
        y={y - 11}
        textAnchor="middle"
        fill={VALUE_LABEL_TEXT}
        fontSize={8}
        fontWeight={600}
      >
        {text}
      </text>
    </g>
  );
}

function PeriodTabs({
  period,
  onChange,
}: {
  period: Period;
  onChange: (period: Period) => void;
}) {
  return (
    <div className="flex rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] p-0.5">
      <button
        type="button"
        onClick={() => onChange("month")}
        className={`rounded-md px-3 py-1 text-[11px] font-medium transition ${
          period === "month"
            ? "bg-[#2563EB] text-white shadow-sm"
            : "text-[#6B7280] hover:text-[#374151]"
        }`}
      >
        Month
      </button>
      <button
        type="button"
        onClick={() => onChange("year")}
        className={`rounded-md px-3 py-1 text-[11px] font-medium transition ${
          period === "year"
            ? "bg-[#2563EB] text-white shadow-sm"
            : "text-[#6B7280] hover:text-[#374151]"
        }`}
      >
        Year
      </button>
    </div>
  );
}

function MetricDropdown({
  metric,
  onChange,
}: {
  metric: PerformanceMetric;
  onChange: (metric: PerformanceMetric) => void;
}) {
  return (
    <div className="relative">
      <select
        value={metric}
        onChange={(e) => onChange(e.target.value as PerformanceMetric)}
        aria-label="Performance metric"
        className="appearance-none rounded-lg border border-[#E5E7EB] bg-white py-1.5 pl-2.5 pr-7 text-[11px] font-medium text-[#374151] shadow-sm"
      >
        <option value="teu">Metric: TEUs</option>
        <option value="ft20">Metric: 20 ft</option>
        <option value="ft40">Metric: 40 ft</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#9CA3AF]" />
    </div>
  );
}

function LegendLineMarker({ color }: { color: string }) {
  return (
    <svg
      width="28"
      height="12"
      viewBox="0 0 28 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <line x1="0" y1="6" x2="28" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="6" r="3.5" fill={color} stroke="#fff" strokeWidth="1.25" />
    </svg>
  );
}

function MonthLegend() {
  const items = [
    { label: "20 ft", color: FT20_COLOR },
    { label: "40 ft", color: FT40_COLOR },
    { label: "TEUs", color: TEU_COLOR },
  ];

  return (
    <ul className="mt-1.5 flex items-center gap-5">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <LegendLineMarker color={item.color} />
          <span className="text-[10px] font-medium text-[#6B7280]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

const YEAR_LEGEND_SWATCH: Record<(typeof YEAR_LABELS)[number]["key"], string> = {
  y2025: "performance-legend-swatch--2025",
  y2024: "performance-legend-swatch--2024",
  y2023: "performance-legend-swatch--2023",
  y2022: "performance-legend-swatch--2022",
  y2021: "performance-legend-swatch--2021",
};

function YearLegend() {
  return (
    <ul className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
      {YEAR_LABELS.map((item) => (
        <li key={item.key} className="flex items-center gap-1.5">
          <span className={`h-2 w-2 shrink-0 rounded-[1px] ${YEAR_LEGEND_SWATCH[item.key]}`} />
          <span className="text-[9px] font-medium text-[#6B7280]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function MonthlyPerformanceChart() {
  const { filters } = useFilters();
  const [period, setPeriod] = useState<Period>("month");
  const [metric, setMetric] = useState<PerformanceMetric>("teu");

  const multiplier =
    filters.tradeMode === "import" ? 0.9 : filters.tradeMode === "export" ? 1.08 : 1;

  const monthData = useMemo(
    () =>
      monthlyPerformance.map((d) => ({
        ...d,
        ft20: Math.round(d.ft20 * SCALE * multiplier),
        ft40: Math.round(d.ft40 * SCALE * multiplier),
        teu: Math.round(d.teu * SCALE * multiplier),
      })),
    [multiplier],
  );

  const yearlySource =
    metric === "ft20"
      ? yearlyFt20Performance
      : metric === "ft40"
        ? yearlyFt40Performance
        : yearlyTeuPerformance;

  const yearData = useMemo(
    () =>
      yearlySource.map((d) => ({
        ...d,
        y2021: Math.round(d.y2021 * SCALE * multiplier),
        y2022: Math.round(d.y2022 * SCALE * multiplier),
        y2023: Math.round(d.y2023 * SCALE * multiplier),
        y2024: Math.round(d.y2024 * SCALE * multiplier),
        y2025: Math.round(d.y2025 * SCALE * multiplier),
      })),
    [multiplier, yearlySource],
  );

  const title =
    period === "month"
      ? "Monthly Performance - 20 ft, 40ft, TEUs"
      : `Yearly Performance - ${metric === "teu" ? "TEUs" : metric === "ft20" ? "20 ft" : "40 ft"}`;

  const yAxisLabel =
    period === "month"
      ? analyticsLeftYAxisLabel
      : {
          value: metric === "teu" ? "TEUs" : "# Containers",
          angle: -90,
          position: "left" as const,
          style: { fontSize: 8, fill: "#9CA3AF", textAnchor: "middle" },
        };

  return (
    <ChartCard
      title={title}
      action={
        <div className="flex flex-wrap items-center justify-end gap-2">
          <PeriodTabs period={period} onChange={setPeriod} />
          {period === "year" && <MetricDropdown metric={metric} onChange={setMetric} />}
          <AnalyticsChartToolbar />
        </div>
      }
      showToolbar={false}
      compact
      fill
      delay={620}
      className="!pb-2"
    >
      <div className="analytics-chart-block flex min-h-0 flex-1 flex-col">
        <ResponsiveChartContainer size="lg">
          {period === "month" ? (
            <ComposedChart data={monthData} margin={CHART_MARGIN}>
              <defs>
                <linearGradient id="monthFt20Fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={FT20_COLOR} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={FT20_COLOR} stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="monthFt40Fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={FT40_COLOR} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={FT40_COLOR} stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="monthTeuFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TEU_COLOR} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={TEU_COLOR} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#374151", fontWeight: 500 }}
                axisLine={{ stroke: "#D1D5DB" }}
                tickLine={false}
                interval={0}
                height={36}
                tickMargin={6}
              />
              <YAxis
                tick={{ ...analyticsYAxisTick, textAnchor: "end" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100000]}
                ticks={Y_TICKS}
                tickFormatter={analyticsYTickFormatter}
                width={38}
                tickMargin={4}
                label={{ ...analyticsLeftYAxisLabel, offset: 0 }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number, name: string) => [
                  `${(value / 1000).toFixed(0)}k`,
                  name,
                ]}
              />
              <Area
                type="monotone"
                dataKey="teu"
                name="TEUs"
                stroke={TEU_COLOR}
                strokeWidth={2}
                fill="url(#monthTeuFill)"
                dot={{ r: 3.5, fill: TEU_COLOR, stroke: "#fff", strokeWidth: 1.5 }}
                label={<AreaValueLabel bg="#FEF3C7" />}
              />
              <Area
                type="monotone"
                dataKey="ft40"
                name="40 ft"
                stroke={FT40_COLOR}
                strokeWidth={2}
                fill="url(#monthFt40Fill)"
                dot={{ r: 3.5, fill: FT40_COLOR, stroke: "#fff", strokeWidth: 1.5 }}
                label={<AreaValueLabel bg="#FCE7F3" />}
              />
              <Area
                type="monotone"
                dataKey="ft20"
                name="20 ft"
                stroke={FT20_COLOR}
                strokeWidth={2}
                fill="url(#monthFt20Fill)"
                dot={{ r: 3.5, fill: FT20_COLOR, stroke: "#fff", strokeWidth: 1.5 }}
                label={<AreaValueLabel bg="#DBEAFE" />}
              />
            </ComposedChart>
          ) : (
            <BarChart data={yearData} margin={CHART_MARGIN} barGap={2} barCategoryGap="18%">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: "#374151", fontWeight: 500 }}
                axisLine={{ stroke: "#D1D5DB" }}
                tickLine={false}
                interval={0}
                height={36}
                tickMargin={6}
              />
              <YAxis
                tick={{ ...analyticsYAxisTick, textAnchor: "end" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100000]}
                ticks={Y_TICKS}
                tickFormatter={analyticsYTickFormatter}
                width={38}
                tickMargin={4}
                label={{ ...yAxisLabel, offset: 0 }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value: number, name: string) => [
                  `${(value / 1000).toFixed(0)}k`,
                  name,
                ]}
              />
              {YEAR_LABELS.map((year) => (
                <Bar
                  key={year.key}
                  dataKey={year.key}
                  name={year.label}
                  fill={year.color}
                  radius={[2, 2, 0, 0]}
                  barSize={6}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveChartContainer>
        {period === "month" ? <MonthLegend /> : <YearLegend />}
      </div>
    </ChartCard>
  );
}
