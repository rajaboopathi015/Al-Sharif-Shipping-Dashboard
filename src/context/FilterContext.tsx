"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FilterState, TradeMode } from "@/lib/types";

const defaultFilters: FilterState = {
  period: "Current year",
  line: "All",
  customer: "All",
  salesman: "All",
  region: "All",
  country: "All",
  containerCategory: "All",
  tradeMode: "combined",
};

type FilterContextValue = {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  setTradeMode: (mode: TradeMode) => void;
  resetFilters: () => void;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const value = useMemo<FilterContextValue>(
    () => ({
      filters,
      setFilter: (key, value) =>
        setFilters((prev) => ({ ...prev, [key]: value })),
      setTradeMode: (mode) =>
        setFilters((prev) => ({ ...prev, tradeMode: mode })),
      resetFilters: () => setFilters(defaultFilters),
    }),
    [filters],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
