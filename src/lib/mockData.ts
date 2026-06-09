import type {
  BLCount,
  CustomerComparison,
  GlobePoint,
  LineComparison,
  MonthlyPerformance,
  SalesmanComparison,
  YearComparison,
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

export const globePoints: GlobePoint[] = [
  { lat: 20.5937, lng: 78.9629, name: "India", volume: 125000, intensity: "high" },
  { lat: 35.8617, lng: 104.1954, name: "China", volume: 198000, intensity: "high" },
  { lat: 35.9078, lng: 127.7669, name: "Korea", volume: 87000, intensity: "medium" },
  { lat: -25.2744, lng: 133.7751, name: "Australia", volume: 54000, intensity: "medium" },
  { lat: 51.1657, lng: 10.4515, name: "Europe", volume: 156000, intensity: "high" },
  { lat: 1.3521, lng: 103.8198, name: "Singapore", volume: 72000, intensity: "medium" },
  { lat: 25.2048, lng: 55.2708, name: "UAE", volume: 48000, intensity: "low" },
  { lat: 23.6345, lng: -102.5528, name: "Mexico", volume: 35000, intensity: "low" },
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
  { month: "Jan", ft20: 24, ft40: 34, teu: 41 },
  { month: "Feb", ft20: 26, ft40: 36, teu: 44 },
  { month: "Mar", ft20: 28, ft40: 38, teu: 47 },
  { month: "Apr", ft20: 27, ft40: 37, teu: 45 },
  { month: "May", ft20: 29, ft40: 40, teu: 49 },
  { month: "Jun", ft20: 31, ft40: 42, teu: 52 },
  { month: "Jul", ft20: 30, ft40: 41, teu: 50 },
  { month: "Aug", ft20: 32, ft40: 44, teu: 54 },
  { month: "Sep", ft20: 33, ft40: 45, teu: 55 },
  { month: "Oct", ft20: 34, ft40: 46, teu: 57 },
  { month: "Nov", ft20: 35, ft40: 48, teu: 59 },
  { month: "Dec", ft20: 36, ft40: 50, teu: 62 },
];

export const salesmanData: SalesmanComparison[] = [
  { salesman: "SM-1", teu: 68, performance: 92 },
  { salesman: "SM-2", teu: 62, performance: 88 },
  { salesman: "SM-3", teu: 58, performance: 85 },
  { salesman: "SM-4", teu: 54, performance: 82 },
  { salesman: "SM-5", teu: 50, performance: 78 },
  { salesman: "SM-6", teu: 46, performance: 75 },
  { salesman: "SM-7", teu: 42, performance: 72 },
  { salesman: "SM-8", teu: 38, performance: 68 },
  { salesman: "SM-9", teu: 34, performance: 65 },
  { salesman: "SM-10", teu: 30, performance: 62 },
];

export const blCountData: BLCount[] = [
  { month: "Jan", import: 420, export: 580 },
  { month: "Feb", import: 445, export: 610 },
  { month: "Mar", import: 480, export: 640 },
  { month: "Apr", import: 460, export: 620 },
  { month: "May", import: 495, export: 655 },
  { month: "Jun", import: 520, export: 680 },
  { month: "Jul", import: 510, export: 670 },
  { month: "Aug", import: 535, export: 695 },
  { month: "Sep", import: 550, export: 710 },
  { month: "Oct", import: 565, export: 725 },
  { month: "Nov", import: 580, export: 740 },
  { month: "Dec", import: 600, export: 760 },
];

export const intensityColor: Record<GlobePoint["intensity"], string> = {
  low: "#f97316",
  medium: "#84cc16",
  high: "#15803d",
};
