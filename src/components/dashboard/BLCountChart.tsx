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
import { blCountData } from "@/lib/mockData";
import { ChartCard } from "../ui/ChartCard";

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid #E5E7EB",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: 12,
};

export function BLCountChart() {
  const { filters } = useFilters();
  const importMult = filters.tradeMode === "export" ? 0.7 : 1;
  const exportMult = filters.tradeMode === "import" ? 0.7 : 1;

  const data = blCountData.map((d) => ({
    ...d,
    import: Math.round(d.import * importMult),
    export: Math.round(d.export * exportMult),
  }));

  return (
    <ChartCard
      title="Monthly BL Count"
      subtitle="Import & Export bill of lading trends"
      delay={780}
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
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
          />
          <Line
            type="monotone"
            dataKey="import"
            name="Import"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="export"
            name="Export"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
