"use client";

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
import { customerData } from "@/lib/mockData";
import { AnalyticsChartToolbar } from "../ui/AnalyticsChartToolbar";
import { ChartCard } from "../ui/ChartCard";
import { ResponsiveChartContainer } from "../ui/ResponsiveChartContainer";
import {
  analyticsLeftYAxisLabel,
  analyticsRightYAxisLabel,
  analyticsYAxisTick,
  analyticsYTickFormatter,
  analyticsYTicks,
} from "./analyticsLayout";

const tooltipStyle = {
  borderRadius: 4,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 11,
};

const CUSTOMER_CHART_MARGIN = {
  top: 6,
  right: 14,
  left: 4,
  bottom: 0,
};
const SCALE = 1000;

const FT20_COLOR = "#FF5C75";
const FT40_COLOR = "#3B82F6";
const TEU_LINE_COLOR = "#1B7A3D";

const legendItems = [
  { label: "20 ft", swatch: "bg-[#FF5C75]" },
  { label: "40 ft", swatch: "bg-[#3B82F6]" },
  { label: "TEUs", line: true },
];

function CustomerLegend() {
  return (
    <ul className="mt-1 flex items-center gap-4">
      {legendItems.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          {item.line ? (
            <span className="h-0.5 w-3 shrink-0 rounded-full bg-[#1B7A3D]" />
          ) : (
            <span className={`h-2 w-2 shrink-0 rounded-[1px] ${item.swatch}`} />
          )}
          <span className="text-[9px] font-medium text-[#6B7280]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

function TeuValueLabel({
  x,
  y,
  value,
}: {
  x?: number;
  y?: number;
  value?: number;
}) {
  if (x == null || y == null || value == null) return null;

  const text = `${Math.round(value / 1000)}K`;
  const width = Math.max(30, text.length * 7 + 10);

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 22}
        width={width}
        height={16}
        rx={3}
        fill="#DCFCE7"
      />
      <text
        x={x}
        y={y - 11}
        textAnchor="middle"
        fill="#111827"
        fontSize={9}
        fontWeight={600}
      >
        {text}
      </text>
    </g>
  );
}

export function CustomerChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.87 : filters.tradeMode === "export" ? 1.1 : 1;

  const data = customerData.map((d) => ({
      ...d,
      ft20: Math.round(d.ft20 * SCALE * multiplier),
      ft40: Math.round(d.ft40 * SCALE * multiplier),
      teu: Math.round(d.teu * SCALE * multiplier),
    }));

  return (
    <ChartCard
      title="Customerwise Comparison - 20 ft, 40ft, TEUs"
      action={<AnalyticsChartToolbar />}
      showToolbar={false}
      compact
      fill
      delay={540}
      className="!pb-2"
    >
      <div className="analytics-chart-block flex min-h-0 flex-1 flex-col">
        <ResponsiveChartContainer size="lg">
          <ComposedChart
            data={data}
            margin={CUSTOMER_CHART_MARGIN}
            barCategoryGap="10%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="customer"
              tick={{ fontSize: 9, fill: "#374151", fontWeight: 500 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
              interval={0}
              angle={-40}
              textAnchor="end"
              height={54}
              tickMargin={4}
              minTickGap={0}
            />
            <YAxis
              yAxisId="left"
              tick={{ ...analyticsYAxisTick, textAnchor: "end" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100000]}
              ticks={analyticsYTicks}
              tickFormatter={analyticsYTickFormatter}
              width={38}
              tickMargin={4}
              label={{ ...analyticsLeftYAxisLabel, offset: 0 }}
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
              width={38}
              tickMargin={4}
              label={{ ...analyticsRightYAxisLabel, offset: 0 }}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value: number, name: string) => [
                `${(value / 1000).toFixed(0)}k`,
                name,
              ]}
            />
            <Bar
              yAxisId="left"
              dataKey="ft20"
              name="20 ft"
              stackId="containers"
              fill={FT20_COLOR}
              radius={[0, 0, 0, 0]}
              barSize={30}
            />
            <Bar
              yAxisId="left"
              dataKey="ft40"
              name="40 ft"
              stackId="containers"
              fill={FT40_COLOR}
              radius={[2, 2, 0, 0]}
              barSize={30}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="teu"
              name="TEUs"
              stroke={TEU_LINE_COLOR}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: TEU_LINE_COLOR }}
              label={<TeuValueLabel />}
            />
          </ComposedChart>
        </ResponsiveChartContainer>
        <CustomerLegend />
      </div>
    </ChartCard>
  );
}
