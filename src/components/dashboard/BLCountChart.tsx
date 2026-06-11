"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { blCountData } from "@/lib/mockData";
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

const CHART_MARGIN = { top: 12, right: 12, left: 2, bottom: 0 };
const SCALE = 1000;

const IMPORT_COLOR = "#3B82F6";
const EXPORT_COLOR = "#166534";

const Y_TICKS = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];

const VALUE_LABEL_TEXT = "#111827";

type LineValueLabelProps = {
  x?: number;
  y?: number;
  value?: number;
  bg: string;
  offsetY?: number;
};

function LineValueLabel({ x, y, value, bg, offsetY = -22 }: LineValueLabelProps) {
  if (x == null || y == null || value == null) return null;

  const text = `${Math.round(value / 1000)}k`;
  const width = Math.max(26, text.length * 6.5 + 10);

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y + offsetY}
        width={width}
        height={15}
        rx={3}
        fill={bg}
      />
      <text
        x={x}
        y={y + offsetY + 11}
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

function BLCountLegend() {
  const items = [
    { label: "Import", color: IMPORT_COLOR },
    { label: "Export", color: EXPORT_COLOR },
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

export function BLCountChart() {
  const { filters } = useFilters();
  const importMult = filters.tradeMode === "export" ? 0.7 : 1;
  const exportMult = filters.tradeMode === "import" ? 0.7 : 1;

  const data = useMemo(
    () =>
      blCountData.map((d) => ({
        ...d,
        import: Math.round(d.import * SCALE * importMult),
        export: Math.round(d.export * SCALE * exportMult),
      })),
    [exportMult, importMult],
  );

  return (
    <ChartCard
      title="Monthly BL Count - Import & Export"
      action={<AnalyticsChartToolbar />}
      showToolbar={false}
      compact
      fill
      delay={780}
      className="!pb-2"
    >
      <div className="analytics-chart-block flex min-h-0 flex-1 flex-col">
        <ResponsiveChartContainer size="md">
          <LineChart data={data} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: "#374151", fontWeight: 500 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
              interval={0}
              height={32}
              tickMargin={6}
              padding={{ left: 16, right: 16 }}
            />
            <YAxis
              tick={{ ...analyticsYAxisTick, textAnchor: "end" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100000]}
              ticks={Y_TICKS}
              tickFormatter={analyticsYTickFormatter}
              width={36}
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
            <Line
              type="monotone"
              dataKey="import"
              name="Import"
              stroke={IMPORT_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: IMPORT_COLOR, stroke: "#fff", strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: IMPORT_COLOR }}
              label={<LineValueLabel bg="#DBEAFE" offsetY={6} />}
            />
            <Line
              type="monotone"
              dataKey="export"
              name="Export"
              stroke={EXPORT_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: EXPORT_COLOR, stroke: "#fff", strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: EXPORT_COLOR }}
              label={<LineValueLabel bg="#DCFCE7" offsetY={-24} />}
            />
          </LineChart>
        </ResponsiveChartContainer>
        <BLCountLegend />
      </div>
    </ChartCard>
  );
}
