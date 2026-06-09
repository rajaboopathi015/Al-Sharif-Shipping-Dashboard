"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { fiveYearData } from "@/lib/mockData";
import { AnalyticsChartToolbar } from "../ui/AnalyticsChartToolbar";
import { ChartCard } from "../ui/ChartCard";
import {
  analyticsChartMargin,
  analyticsLeftYAxisLabel,
  analyticsRightYAxisLabel,
  analyticsXAxisTick,
  analyticsYAxisTick,
  analyticsYTickFormatter,
  analyticsYTicks,
} from "./analyticsLayout";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 11,
};

const CHART_PLOT_HEIGHT = 194;

const BAR_RADIUS: [number, number, number, number] = [1, 1, 0, 0];

const SCALE = 185;

const legendItems = [
  { label: "20 ft", swatch: "bg-[#2563EB]" },
  { label: "40 ft", swatch: "bg-[#93C5FD]" },
  { label: "TEUs", swatch: "bg-[#F59E0B]" },
];

function FiveYearLegend() {
  return (
    <ul className="mt-1 flex items-center gap-4">
      {legendItems.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span className={`h-2 w-2 shrink-0 rounded-[1px] ${item.swatch}`} />
          <span className="text-[9px] font-medium text-[#6B7280]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function FiveYearChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.88 : filters.tradeMode === "export" ? 1.1 : 1;

  const data = [...fiveYearData]
    .reverse()
    .map((d) => ({
      year: d.year,
      ft20: Math.round(d.ft20 * SCALE * multiplier),
      ft40: Math.round(d.ft40 * SCALE * multiplier),
      teu: Math.round(d.teu * SCALE * multiplier),
    }));

  return (
    <ChartCard
      title="5 Year Comparison - 20 ft, 40ft, TEU"
      compact
      showToolbar={false}
      action={<AnalyticsChartToolbar />}
      delay={300}
      className="!pb-2"
    >
      <div className="analytics-chart-block">
        <ResponsiveContainer width="100%" height={CHART_PLOT_HEIGHT}>
          <BarChart data={data} barGap={0} barCategoryGap="32%" margin={analyticsChartMargin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="year"
              tick={analyticsXAxisTick}
              axisLine={false}
              tickLine={false}
              interval={0}
              height={22}
              tickMargin={6}
              padding={{ left: 16, right: 16 }}
            />
            <YAxis
              yAxisId="left"
              tick={{ ...analyticsYAxisTick, textAnchor: "end" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100000]}
              ticks={analyticsYTicks}
              tickFormatter={analyticsYTickFormatter}
              width={44}
              tickMargin={6}
              label={analyticsLeftYAxisLabel}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ ...analyticsYAxisTick, textAnchor: "start" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100000]}
              ticks={analyticsYTicks}
              tickFormatter={analyticsYTickFormatter}
              width={44}
              tickMargin={6}
              label={analyticsRightYAxisLabel}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number) => [`${(value / 1000).toFixed(0)}k`, ""]}
            />
            <Bar
              yAxisId="left"
              dataKey="ft20"
              name="20 ft"
              fill="#2563EB"
              radius={BAR_RADIUS}
              barSize={10}
            />
            <Bar
              yAxisId="left"
              dataKey="ft40"
              name="40 ft"
              fill="#93C5FD"
              radius={BAR_RADIUS}
              barSize={10}
            />
            <Bar
              yAxisId="right"
              dataKey="teu"
              name="TEUs"
              fill="#F59E0B"
              radius={BAR_RADIUS}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
        <FiveYearLegend />
      </div>
    </ChartCard>
  );
}
