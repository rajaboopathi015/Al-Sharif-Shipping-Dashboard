"use client";

import { FilterProvider } from "@/context/FilterContext";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`min-h-screen pt-14 transition-[padding-left] duration-300 ease-in-out lg:pt-0 ${
        collapsed ? "lg:pl-[72px]" : "lg:pl-[272px]"
      }`}
    >
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <FilterProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-dashboard-bg">
          <Sidebar />
          <MainContent>{children}</MainContent>
        </div>
      </SidebarProvider>
    </FilterProvider>
  );
}
