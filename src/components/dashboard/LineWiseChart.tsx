"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { lineWiseData } from "@/lib/mockData";
import { ChartCard } from "../ui/ChartCard";
import {
  ANALYTICS_CHART_HEIGHT,
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

const SCALE = 1000;

const legendItems = [
  { label: "20 ft", swatch: "bg-[#DB2777]" },
  { label: "40 ft", swatch: "bg-[#60A5FA]" },
  { label: "TEUs", swatch: "bg-[#F97316]" },
];

function LineWiseLegend() {
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

export function LineWiseChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.9 : filters.tradeMode === "export" ? 1.08 : 1;

  const data = lineWiseData.map((d) => ({
    ...d,
    ft20: Math.round(d.ft20 * SCALE * multiplier),
    ft40: Math.round(d.ft40 * SCALE * multiplier),
    teu: Math.round(d.teu * SCALE * multiplier),
  }));

  return (
    <ChartCard title="Linewise Comparison - 20 ft, 40ft, TEU" compact showToolbar delay={380} className="!pb-2">
      <div className="analytics-chart-block">
        <ResponsiveContainer width="100%" height={ANALYTICS_CHART_HEIGHT}>
          <ComposedChart data={data} margin={analyticsChartMargin} barGap={0} barCategoryGap="22%">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="line"
              tick={{ ...analyticsXAxisTick, fontSize: 8 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-40}
              textAnchor="end"
              height={48}
              tickMargin={2}
              minTickGap={2}
              tickFormatter={(value: string) => value.replace("Line ", "L")}
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
            <Bar yAxisId="left" dataKey="ft20" name="20 ft" fill="#DB2777" radius={[1, 1, 0, 0]} barSize={7} />
            <Bar yAxisId="left" dataKey="ft40" name="40 ft" fill="#60A5FA" radius={[1, 1, 0, 0]} barSize={7} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="teu"
              name="TEUs"
              stroke="#F97316"
              strokeWidth={2}
              dot={{ r: 2, fill: "#F97316" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <LineWiseLegend />
      </div>
    </ChartCard>
  );
}
