export type TradeMode = "combined" | "import" | "export";

export type FilterState = {
  period: string;
  line: string;
  customer: string;
  salesman: string;
  region: string;
  country: string;
  containerCategory: string;
  tradeMode: TradeMode;
};

export type GlobePoint = {
  lat: number;
  lng: number;
  name: string;
  volume: number;
  intensity: "low" | "medium" | "high";
};

export type YearComparison = {
  year: string;
  ft20: number;
  ft40: number;
  teu: number;
};

export type LineComparison = {
  line: string;
  ft20: number;
  ft40: number;
  teu: number;
};

export type CustomerComparison = {
  customer: string;
  ft20: number;
  ft40: number;
  teu: number;
};

export type MonthlyPerformance = {
  month: string;
  ft20: number;
  ft40: number;
  teu: number;
};

export type YearlyMonthPerformance = {
  month: string;
  y2021: number;
  y2022: number;
  y2023: number;
  y2024: number;
  y2025: number;
};

export type PerformanceMetric = "teu" | "ft20" | "ft40";

export type SalesmanComparison = {
  salesman: string;
  ft20: number;
  ft40: number;
  /** TEU share (0–100) for the overlay line */
  teu: number;
};

export type BLCount = {
  month: string;
  import: number;
  export: number;
};
