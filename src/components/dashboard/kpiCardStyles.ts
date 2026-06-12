export const kpiCardShell =
  "animate-fade-lift flex h-[118px] overflow-hidden rounded-card shadow-card";

export const kpiLeftCol =
  "flex w-[42%] shrink-0 flex-col justify-between p-3 pr-1.5";

export const kpiIconWrap =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white";

export const kpiTitle = "text-xs font-medium text-white/90";

export const kpiValue = "text-[22px] font-bold leading-none tracking-tight text-white";

export const kpiBadge =
  "rounded-full bg-[#DCFCE7] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]";

export const kpiMuted = "text-[10px] text-white/70";

export const kpiChartCol =
  "kpi-chart-area flex h-full min-h-0 min-w-0 flex-1 flex-col self-stretch bg-transparent py-1 pr-1.5";

export const KPI_BAR_MARGIN = { top: 8, right: 0, left: -4, bottom: 14 };

export const KPI_AREA_MARGIN = { top: 8, right: 0, left: 0, bottom: 14 };

export const kpiXAxisTick = {
  fontSize: 8,
  fill: "#FFFFFF",
  fontWeight: 500,
};

export const kpiXAxisLine = { stroke: "rgba(255,255,255,0.5)" };

export const kpiXAxisProps = {
  dataKey: "year",
  axisLine: kpiXAxisLine,
  tickLine: false,
  tick: kpiXAxisTick,
  interval: 0,
  height: 16,
  tickMargin: 2,
  minTickGap: 0,
} as const;
