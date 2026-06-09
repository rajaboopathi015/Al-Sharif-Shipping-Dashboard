"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { BLCountChart } from "./BLCountChart";
import { CustomerChart } from "./CustomerChart";
import { FiveYearChart } from "./FiveYearChart";
import { GlobeModule } from "./GlobeModule";
import { KPICards } from "./KPICards";
import { LineWiseChart } from "./LineWiseChart";
import { MonthlyPerformanceChart } from "./MonthlyPerformanceChart";
import { SalesmanChart } from "./SalesmanChart";

export function DashboardContent() {
  return (
    <div className="mx-auto max-w-[1440px]">
      <PageHeader currentPage="Current Page" />
      <KPICards />

      {/* Row 1: Charts (~40%) + Globe (~60%) */}
      <div className="mb-4 grid grid-cols-1 items-stretch gap-3 xl:grid-cols-12">
        <div className="flex flex-col gap-3 xl:col-span-5">
          <FiveYearChart />
          <LineWiseChart />
        </div>
        <div className="flex min-h-0 xl:col-span-7">
          <GlobeModule />
        </div>
      </div>

      {/* Row 2: Customer + Monthly */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CustomerChart />
        <MonthlyPerformanceChart />
      </div>

      {/* Row 3: Salesman + BL Count */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SalesmanChart />
        <BLCountChart />
      </div>
    </div>
  );
}
