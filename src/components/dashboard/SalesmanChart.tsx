"use client";

import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { salesmanData } from "@/lib/mockData";
import { AnalyticsChartToolbar } from "../ui/AnalyticsChartToolbar";
import { ChartCard } from "../ui/ChartCard";
import { ResponsiveChartContainer } from "../ui/ResponsiveChartContainer";
import { analyticsYAxisTick } from "./analyticsLayout";

const tooltipStyle = {
  borderRadius: 4,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 11,
};

const CHART_MARGIN = { top: 10, right: 12, left: 2, bottom: 0 };

const CONTAINER_SCALE = 1_000_000;
const CONTAINER_STEP = 20_000_000;

const FT20_COLOR = "#3B82F6";
const FT40_COLOR = "#FF5C75";
const TEU_LINE_COLOR = "#F59E0B";

const TEU_TICKS = [0, 20, 40, 60, 80, 100];

const containerTickFormatter = (value: number) => `${value / 1_000_000}M`;
const teuTickFormatter = (value: number) => `${value}%`;

function buildContainerTicks(max: number) {
  const steps = Math.max(5, Math.ceil(max / CONTAINER_STEP));
  return Array.from({ length: steps + 1 }, (_, i) => i * CONTAINER_STEP);
}

function LegendLineMarker() {
  return (
    <svg
      width="22"
      height="10"
      viewBox="0 0 22 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <line x1="0" y1="5" x2="22" y2="5" stroke={TEU_LINE_COLOR} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const legendItems = [
  { label: "20 ft", swatch: "salesman-legend-swatch--ft20" },
  { label: "40 ft", swatch: "salesman-legend-swatch--ft40" },
  { label: "TEUs", line: true },
];

function SalesmanLegend() {
  return (
    <ul className="mt-1.5 flex items-center gap-5">
      {legendItems.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          {item.line ? (
            <LegendLineMarker />
          ) : (
            <span className={`h-2.5 w-2.5 shrink-0 rounded-[1px] ${item.swatch}`} />
          )}
          <span className="text-[10px] font-medium text-[#6B7280]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function SalesmanChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.92 : filters.tradeMode === "export" ? 1.06 : 1;

  const data = useMemo(
    () =>
      salesmanData.map((d) => ({
        ...d,
        ft20: Math.round(d.ft20 * CONTAINER_SCALE * multiplier),
        ft40: Math.round(d.ft40 * CONTAINER_SCALE * multiplier),
        teu: Math.min(100, Math.round(d.teu * (multiplier > 1 ? 1.02 : 0.98))),
      })),
    [multiplier],
  );

  const containerMax = useMemo(
    () => Math.max(...data.map((d) => Math.max(d.ft20, d.ft40))),
    [data],
  );

  const containerDomain = useMemo(() => {
    const rounded = Math.ceil(containerMax / CONTAINER_STEP) * CONTAINER_STEP;
    return Math.max(CONTAINER_STEP * 5, rounded);
  }, [containerMax]);

  const containerTicks = useMemo(() => buildContainerTicks(containerDomain), [containerDomain]);

  return (
    <ChartCard
      title="Salesmanwise Comparison - 20 ft, 40ft, TEUs"
      action={<AnalyticsChartToolbar />}
      showToolbar={false}
      compact
      fill
      delay={700}
      className="!pb-2"
    >
      <div className="analytics-chart-block flex min-h-0 flex-1 flex-col">
        <ResponsiveChartContainer size="md">
          <ComposedChart
            syncId="salesmanwise"
            data={data}
            margin={CHART_MARGIN}
            barGap={3}
            barCategoryGap="14%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="salesman"
              tick={{ fontSize: 9, fill: "#374151", fontWeight: 500 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
              interval={0}
              height={32}
              tickMargin={6}
              padding={{ left: 12, right: 12 }}
            />
            <YAxis
              yAxisId="left"
              tick={{ ...analyticsYAxisTick, textAnchor: "end" }}
              axisLine={false}
              tickLine={false}
              domain={[0, containerDomain]}
              ticks={containerTicks}
              tickFormatter={containerTickFormatter}
              width={36}
              tickMargin={4}
              label={{
                value: "# Containers",
                angle: -90,
                position: "left",
                style: { fontSize: 8, fill: "#9CA3AF", textAnchor: "middle" },
                offset: 0,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ ...analyticsYAxisTick, textAnchor: "start" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              ticks={TEU_TICKS}
              tickFormatter={teuTickFormatter}
              width={36}
              tickMargin={4}
              label={{
                value: "# TEUS",
                angle: 90,
                position: "right",
                style: { fontSize: 8, fill: "#9CA3AF", textAnchor: "middle" },
                offset: 0,
              }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => {
                if (name === "TEUs") return [`${value}%`, name];
                return [`${(value / 1_000_000).toFixed(0)}M`, name];
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="ft20"
              name="20 ft"
              fill={FT20_COLOR}
              radius={[3, 3, 0, 0]}
              maxBarSize={22}
            />
            <Bar
              yAxisId="left"
              dataKey="ft40"
              name="40 ft"
              fill={FT40_COLOR}
              radius={[3, 3, 0, 0]}
              maxBarSize={22}
            />
            <Line
              yAxisId="right"
              type="linear"
              dataKey="teu"
              name="TEUs"
              stroke={TEU_LINE_COLOR}
              strokeWidth={3}
              dot={{ r: 3.5, fill: TEU_LINE_COLOR, stroke: "#fff", strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: TEU_LINE_COLOR }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveChartContainer>
        <SalesmanLegend />
      </div>
    </ChartCard>
  );
}
