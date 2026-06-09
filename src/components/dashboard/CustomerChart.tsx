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
import { customerData } from "@/lib/mockData";
import { ChartCard } from "../ui/ChartCard";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 12,
};

export function CustomerChart() {
  const { filters } = useFilters();
  const multiplier =
    filters.tradeMode === "import" ? 0.87 : filters.tradeMode === "export" ? 1.1 : 1;

  const data = customerData.map((d) => ({
    ...d,
    ft20: Math.round(d.ft20 * multiplier),
    ft40: Math.round(d.ft40 * multiplier),
    teu: Math.round(d.teu * multiplier),
  }));

  return (
    <ChartCard
      title="Customerwise Comparison"
      subtitle="Multi-bar per customer with TEU trend overlay"
      delay={540}
    >
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} barGap={1}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="customer"
            tick={{ fontSize: 9, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-30}
            textAnchor="end"
            height={50}
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
          <Bar dataKey="ft20" name="20ft" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={8} />
          <Bar dataKey="ft40" name="40ft" fill="#ec4899" radius={[3, 3, 0, 0]} barSize={8} />
          <Line
            type="monotone"
            dataKey="teu"
            name="TEU Trend"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#f97316" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
