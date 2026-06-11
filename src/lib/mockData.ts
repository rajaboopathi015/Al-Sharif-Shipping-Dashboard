import type {
  BLCount,
  CustomerComparison,
  GlobePoint,
  LineComparison,
  MonthlyPerformance,
  PerformanceMetric,
  SalesmanComparison,
  YearComparison,
  YearlyMonthPerformance,
} from "./types";

export const filterOptions = {
  periods: ["Current year", "Last Year", "Last 12 Months", "Q1 2025", "Q2 2025"],
  lines: ["All", "Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
  customers: ["All", "Customer 1", "Customer 2", "Customer 3", "Customer 4"],
  salesmen: ["All", "SM-1", "SM-2", "SM-3", "SM-4", "SM-5"],
  regions: ["All", "Asia Pacific", "Europe", "Americas", "Middle East", "Africa"],
  countries: ["All", "India", "China", "Korea", "Australia", "Germany", "USA"],
  containerCategories: ["All", "Dry", "Reefer", "Open Top", "Flat Rack"],
};

export const kpiData = {
  totalTeu: {
    value: 522,
    change: "+4.2%",
    yearlyTrend: [
      { year: "2025", value: 5220 },
      { year: "2024", value: 5350 },
      { year: "2023", value: 5200 },
      { year: "2022", value: 5000 },
      { year: "2021", value: 4750 },
    ],
  },
  total20ft: {
    value: 325,
    change: "+4.2%",
    yearlyTrend: [
      { year: "2025", value: 3250 },
      { year: "2024", value: 2350 },
      { year: "2023", value: 2650 },
      { year: "2022", value: 2850 },
      { year: "2021", value: 3100 },
    ],
  },
  total40ft: {
    value: 456,
    change: "+4.2%",
    yearlyTrend: [
      { year: "2025", value: 4300 },
      { year: "2024", value: 4800 },
      { year: "2023", value: 3600 },
      { year: "2022", value: 4000 },
      { year: "2021", value: 4200 },
    ],
  },
  matchback: {
    value: 39.75,
    change: "+4.2%",
    exportVolume: 395.0,
    importVolume: 489.1,
  },
};

export const fiveYearData: YearComparison[] = [
  { year: "2021", ft20: 280, ft40: 390, teu: 475 },
  { year: "2022", ft20: 295, ft40: 410, teu: 500 },
  { year: "2023", ft20: 310, ft40: 430, teu: 520 },
  { year: "2024", ft20: 318, ft40: 445, teu: 535 },
  { year: "2025", ft20: 325, ft40: 456, teu: 522 },
];

export const lineWiseData: LineComparison[] = [
  { line: "Line 1", ft20: 72, ft40: 88, teu: 82 },
  { line: "Line 2", ft20: 68, ft40: 80, teu: 75 },
  { line: "Line 3", ft20: 62, ft40: 74, teu: 68 },
  { line: "Line 4", ft20: 58, ft40: 68, teu: 62 },
  { line: "Line 5", ft20: 54, ft40: 64, teu: 58 },
  { line: "Line 6", ft20: 50, ft40: 58, teu: 52 },
  { line: "Line 7", ft20: 46, ft40: 54, teu: 48 },
  { line: "Line 8", ft20: 42, ft40: 48, teu: 42 },
  { line: "Line 9", ft20: 38, ft40: 44, teu: 38 },
  { line: "Line 10", ft20: 32, ft40: 38, teu: 32 },
];

/** Major shipping ports & harbours — map/globe highlight locations */
export const globePoints: GlobePoint[] = [
  { lat: 18.9497, lng: 72.9512, name: "Jawaharlal Nehru Port (Nhava Sheva)", volume: 125000, intensity: "high" },
  { lat: 31.355, lng: 121.588, name: "Port of Shanghai", volume: 198000, intensity: "high" },
  { lat: 35.079, lng: 129.075, name: "Port of Busan", volume: 87000, intensity: "medium" },
  { lat: -37.841, lng: 144.946, name: "Port of Melbourne", volume: 54000, intensity: "medium" },
  { lat: 51.9496, lng: 4.1453, name: "Port of Rotterdam", volume: 156000, intensity: "high" },
  { lat: 1.2644, lng: 103.82, name: "Port of Singapore (PSA)", volume: 72000, intensity: "medium" },
  { lat: 25.0025, lng: 55.1081, name: "Jebel Ali Port", volume: 48000, intensity: "low" },
  { lat: 6.9497, lng: 79.8428, name: "Port of Colombo", volume: 62000, intensity: "medium" },
  { lat: 2.9998, lng: 101.392, name: "Port Klang", volume: 58000, intensity: "medium" },
  { lat: 19.0534, lng: -104.3188, name: "Port of Manzanillo", volume: 35000, intensity: "low" },
];

export const customerData: CustomerComparison[] = [
  { customer: "Customer 1", ft20: 45, ft40: 62, teu: 76 },
  { customer: "Customer 2", ft20: 42, ft40: 58, teu: 71 },
  { customer: "Customer 3", ft20: 38, ft40: 52, teu: 64 },
  { customer: "Customer 4", ft20: 35, ft40: 48, teu: 58 },
  { customer: "Customer 5", ft20: 32, ft40: 45, teu: 54 },
  { customer: "Customer 6", ft20: 28, ft40: 40, teu: 48 },
  { customer: "Customer 7", ft20: 25, ft40: 36, teu: 43 },
  { customer: "Customer 8", ft20: 22, ft40: 32, teu: 38 },
  { customer: "Customer 9", ft20: 18, ft40: 28, teu: 32 },
  { customer: "Customer 10", ft20: 15, ft40: 24, teu: 27 },
  { customer: "Others", ft20: 25, ft40: 31, teu: 41 },
];

export const monthlyPerformance: MonthlyPerformance[] = [
  { month: "Jan", ft20: 15, ft40: 32, teu: 90 },
  { month: "Feb", ft20: 18, ft40: 35, teu: 60 },
  { month: "Mar", ft20: 20, ft40: 38, teu: 55 },
  { month: "Apr", ft20: 19, ft40: 36, teu: 58 },
  { month: "May", ft20: 22, ft40: 40, teu: 62 },
  { month: "Jun", ft20: 24, ft40: 42, teu: 65 },
  { month: "Jul", ft20: 21, ft40: 39, teu: 52 },
  { month: "Aug", ft20: 23, ft40: 41, teu: 68 },
  { month: "Sep", ft20: 25, ft40: 43, teu: 72 },
  { month: "Oct", ft20: 22, ft40: 40, teu: 64 },
  { month: "Nov", ft20: 20, ft40: 38, teu: 58 },
  { month: "Dec", ft20: 24, ft40: 44, teu: 70 },
];

const yearFactors = {
  y2021: 0.72,
  y2022: 0.8,
  y2023: 0.88,
  y2024: 0.94,
  y2025: 1,
} as const;

function buildYearlyPerformance(metric: PerformanceMetric): YearlyMonthPerformance[] {
  return monthlyPerformance.map((row) => ({
    month: row.month,
    y2021: Math.round(row[metric] * yearFactors.y2021),
    y2022: Math.round(row[metric] * yearFactors.y2022),
    y2023: Math.round(row[metric] * yearFactors.y2023),
    y2024: Math.round(row[metric] * yearFactors.y2024),
    y2025: Math.round(row[metric] * yearFactors.y2025),
  }));
}

export const yearlyTeuPerformance = buildYearlyPerformance("teu");
export const yearlyFt20Performance = buildYearlyPerformance("ft20");
export const yearlyFt40Performance = buildYearlyPerformance("ft40");

export const salesmanData: SalesmanComparison[] = [
  { salesman: "SM-1", ft20: 62, ft40: 78, teu: 92 },
  { salesman: "SM-2", ft20: 55, ft40: 68, teu: 84 },
  { salesman: "SM-3", ft20: 48, ft40: 62, teu: 76 },
  { salesman: "SM-4", ft20: 44, ft40: 56, teu: 70 },
  { salesman: "SM-5", ft20: 40, ft40: 52, teu: 64 },
  { salesman: "SM-6", ft20: 36, ft40: 46, teu: 58 },
  { salesman: "SM-7", ft20: 32, ft40: 42, teu: 52 },
  { salesman: "SM-8", ft20: 28, ft40: 36, teu: 46 },
  { salesman: "SM-9", ft20: 24, ft40: 32, teu: 40 },
  { salesman: "Others", ft20: 38, ft40: 50, teu: 56 },
];

export const blCountData: BLCount[] = [
  { month: "Jan", import: 12, export: 50 },
  { month: "Feb", import: 18, export: 44 },
  { month: "Mar", import: 22, export: 52 },
  { month: "Apr", import: 28, export: 46 },
  { month: "May", import: 32, export: 58 },
  { month: "Jun", import: 38, export: 48 },
  { month: "Jul", import: 42, export: 62 },
  { month: "Aug", import: 48, export: 54 },
  { month: "Sep", import: 50, export: 68 },
  { month: "Oct", import: 44, export: 56 },
  { month: "Nov", import: 52, export: 72 },
  { month: "Dec", import: 58, export: 64 },
];

export const intensityColor: Record<GlobePoint["intensity"], string> = {
  low: "#f97316",
  medium: "#84cc16",
  high: "#15803d",
};
