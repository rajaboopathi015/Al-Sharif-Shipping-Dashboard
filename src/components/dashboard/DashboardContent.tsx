"use client";

import { PageContainer } from "@/components/layout/PageContainer";
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
    <PageContainer>
      <PageHeader currentPage="Current Page" />
      <KPICards />

      {/* Row 1: Charts (~42%) + Globe (~58%) — globe height tracks left column */}
      <div className="analytics-globe-row mb-2 grid grid-cols-1 gap-2 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-2 lg:col-span-5">
          <FiveYearChart />
          <LineWiseChart />
        </div>
        <div className="globe-module-cell lg:col-span-7">
          <GlobeModule />
        </div>
      </div>

      {/* Row 2: Customer + Monthly */}
      <div className="mb-2 grid grid-cols-1 items-stretch gap-2 lg:grid-cols-2">
        <CustomerChart />
        <MonthlyPerformanceChart />
      </div>

      {/* Row 3: Salesman + BL Count */}
      <div className="grid grid-cols-1 items-stretch gap-2 lg:grid-cols-2">
        <SalesmanChart />
        <BLCountChart />
      </div>
    </PageContainer>
  );
}
