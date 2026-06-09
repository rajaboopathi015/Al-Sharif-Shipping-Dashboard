"use client";

import { Ft20KpiCard } from "./Ft20KpiCard";
import { Ft40KpiCard } from "./Ft40KpiCard";
import { MatchbackKpiCard } from "./MatchbackKpiCard";
import { TeuKpiCard } from "./TeuKpiCard";

export function KPICards() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <TeuKpiCard />
      <Ft20KpiCard />
      <Ft40KpiCard />
      <MatchbackKpiCard />
    </div>
  );
}
