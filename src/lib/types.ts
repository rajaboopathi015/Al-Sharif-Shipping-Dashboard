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

export type SalesmanComparison = {
  salesman: string;
  teu: number;
  performance: number;
};

export type BLCount = {
  month: string;
  import: number;
  export: number;
};
