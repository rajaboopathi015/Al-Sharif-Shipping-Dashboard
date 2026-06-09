"use client";

import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import { useFilters } from "@/context/FilterContext";
import { filterOptions } from "@/lib/mockData";
import type { TradeMode } from "@/lib/types";

const filterKeys = [
  { key: "period" as const, label: "Period", options: filterOptions.periods },
  { key: "line" as const, label: "Line", options: filterOptions.lines },
  { key: "customer" as const, label: "Customer", options: filterOptions.customers },
  { key: "salesman" as const, label: "Salesman", options: filterOptions.salesmen },
  { key: "region" as const, label: "Region", options: filterOptions.regions },
  { key: "country" as const, label: "Country", options: filterOptions.countries },
  {
    key: "containerCategory" as const,
    label: "Container Category",
    options: filterOptions.containerCategories,
  },
];

const tradeModes: { value: TradeMode; label: string }[] = [
  { value: "combined", label: "Combined" },
  { value: "import", label: "Import" },
  { value: "export", label: "Export" },
];

type PageHeaderProps = {
  title?: string;
  currentPage?: string;
  showFilters?: boolean;
};

export function PageHeader({
  title = "Shipping Container Lines",
  currentPage = "Current Page",
  showFilters = true,
}: PageHeaderProps) {
  const { filters, setFilter, setTradeMode, resetFilters } = useFilters();

  return (
    <div className="sticky top-0 z-30 -mx-4 mb-5 bg-dashboard-bg px-4 pb-3 pt-1 md:-mx-6 md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-5">
        {/* Left: breadcrumb + title */}
        <div className="shrink-0">
          <div className="mb-0.5 flex items-center gap-1 text-[11px] text-dashboard-secondary">
            <span>Home</span>
            <ChevronRight className="h-3 w-3 text-gray-300" />
            <span>{currentPage}</span>
          </div>
          <h1 className="text-lg font-bold leading-tight tracking-tight text-[#1a2b4a] md:text-xl">
            {title}
          </h1>
        </div>

        {/* Right: filter bar — single row on desktop */}
        {showFilters && (
          <div className="flex min-w-0 flex-1 justify-end">
            <div className="flex w-full items-stretch overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-card xl:w-auto">
              <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 py-1.5 scrollbar-thin xl:flex-nowrap">
                {filterKeys.map(({ key, label, options }) => (
                  <div
                    key={key}
                    className="relative shrink-0 rounded-md bg-[#F3F4F6] px-2 py-1"
                  >
                    <label className="flex cursor-pointer items-center gap-0.5 whitespace-nowrap text-[11px]">
                      <span className="text-dashboard-secondary">{label} :</span>
                      <select
                        value={filters[key]}
                        onChange={(e) => setFilter(key, e.target.value)}
                        className="max-w-[72px] cursor-pointer appearance-none bg-transparent pr-3.5 font-medium text-dashboard-primary outline-none xl:max-w-none"
                        aria-label={label}
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                    <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-dashboard-secondary" />
                  </div>
                ))}

                <div className="mx-0.5 h-5 w-px shrink-0 bg-gray-200" />

                <div className="flex shrink-0 items-center gap-2.5 px-1">
                  {tradeModes.map((mode) => (
                    <label
                      key={mode.value}
                      className="flex cursor-pointer items-center gap-1 whitespace-nowrap text-[11px]"
                    >
                      <input
                        type="radio"
                        name="tradeMode"
                        checked={filters.tradeMode === mode.value}
                        onChange={() => setTradeMode(mode.value)}
                        className="h-3 w-3 accent-[#2563eb]"
                      />
                      <span
                        className={
                          filters.tradeMode === mode.value
                            ? "font-medium text-dashboard-primary"
                            : "text-dashboard-secondary"
                        }
                      >
                        {mode.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="flex shrink-0 items-center gap-1.5 bg-[#3B4B6B] px-3.5 py-2 text-[11px] font-medium text-white transition hover:bg-[#2f3d57] sm:px-4 sm:text-xs"
              >
                <Filter className="h-3.5 w-3.5" />
                All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
