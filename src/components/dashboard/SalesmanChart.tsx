"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { salesmanData } from "@/lib/mockData";
import { ChartCard } from "../ui/ChartCard";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 12,
};

export function SalesmanChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.92 : filters.tradeMode === "export" ? 1.06 : 1;

  const data = salesmanData.map((d) => ({
    ...d,
    teu: Math.round(d.teu * multiplier),
    performance: Math.round(d.performance * (multiplier > 1 ? 1.02 : 0.98)),
  }));

  return (
    <ChartCard
      title="Salesmanwise Comparison"
      subtitle="TEU volume with performance % overlay"
      delay={700}
    >
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="salesman"
            tick={{ fontSize: 10, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[50, 100]}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
          />
          <Bar
            yAxisId="left"
            dataKey="teu"
            name="TEU Volume"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
            barSize={22}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="performance"
            name="Performance %"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#10b981" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
