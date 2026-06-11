"use client";

import { FilterProvider } from "@/context/FilterContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <main className="w-full min-w-0 flex-1 lg:p-2">{children}</main>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <FilterProvider>
      <SidebarProvider>
        <div className="min-h-screen w-full bg-dashboard-bg">
          <div className="flex min-h-screen flex-col p-2.5 pt-14 lg:flex-row lg:gap-2.5 lg:p-2.5 lg:pt-2.5">
            <Sidebar />
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </SidebarProvider>
    </FilterProvider>
  );
}
