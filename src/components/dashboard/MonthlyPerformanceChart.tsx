"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilters } from "@/context/FilterContext";
import { monthlyPerformance } from "@/lib/mockData";
import { ChartCard } from "../ui/ChartCard";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 12,
};

export function MonthlyPerformanceChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.9 : filters.tradeMode === "export" ? 1.08 : 1;

  const data = monthlyPerformance.map((d) => ({
    ...d,
    ft20: Math.round(d.ft20 * multiplier),
    ft40: Math.round(d.ft40 * multiplier),
    teu: Math.round(d.teu * multiplier),
  }));

  return (
    <ChartCard
      title="Monthly Performance"
      subtitle="20ft, 40ft & TEU monthly trends (Jan–Dec)"
      delay={620}
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}K`}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
          />
          <Line
            type="monotone"
            dataKey="ft20"
            name="20ft"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="ft40"
            name="40ft"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="teu"
            name="TEU"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
