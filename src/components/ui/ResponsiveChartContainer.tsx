"use client";

import type { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

export type ChartPlotSize = "analytics" | "sm" | "md" | "lg";

type ResponsiveChartContainerProps = {
  children: ReactElement;
  size?: ChartPlotSize;
  className?: string;
};

const sizeClass: Record<ChartPlotSize, string> = {
  analytics: "chart-plot--analytics",
  sm: "chart-plot--sm",
  md: "chart-plot--md",
  lg: "chart-plot--lg",
};

export function ResponsiveChartContainer({
  children,
  size = "md",
  className = "",
}: ResponsiveChartContainerProps) {
  return (
    <div className={`chart-plot ${sizeClass[size]} ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
