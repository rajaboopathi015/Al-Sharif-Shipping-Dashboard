/** Shared chart plot height for the analytics row (charts + globe). */
export const ANALYTICS_CHART_HEIGHT = 194;

export const analyticsXAxisTick = {
  fontSize: 9,
  fill: "#6B7280",
  textAnchor: "middle" as const,
};

export const analyticsYTicks = [0, 20000, 40000, 60000, 80000, 100000];

export const analyticsYTickFormatter = (value: number) => `${value / 1000}k`;

export const analyticsYAxisTick = {
  fontSize: 8,
  fill: "#6B7280",
};

export const analyticsChartMargin = {
  top: 10,
  right: 22,
  left: 10,
  bottom: 8,
};

export const analyticsLeftYAxisLabel = {
  value: "# Containers",
  angle: -90,
  position: "left" as const,
  style: { fontSize: 8, fill: "#9CA3AF", textAnchor: "middle" },
};

export const analyticsRightYAxisLabel = {
  value: "# TEUs",
  angle: 90,
  position: "right" as const,
  style: { fontSize: 8, fill: "#9CA3AF", textAnchor: "middle" },
};
