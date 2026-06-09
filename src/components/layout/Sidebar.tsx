"use client";

import {
  ChevronLeft,
  ChevronRight,
  Menu,
  MoreHorizontal,
  Palette,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { AlSharifLogo } from "./AlSharifLogo";
import { sidebarNavItems } from "./sidebarNav";

function isNavActive(pathname: string, href: string, label: string) {
  if (label === "Home") return false;
  if (label === "Shipping Container Lines") return pathname === "/";
  if (label === "Division Performance - Revised") return pathname.startsWith("/analytics");
  if (label === "Shipping Revenue") return false;
  if (label === "Shipping Non Containers - Operation") return pathname.startsWith("/containers");
  if (label === "Shipping PDA Operation") return false;
  return pathname.startsWith(href);
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  const isExpanded = mobileOpen || !collapsed;

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-dashboard-border bg-white shadow-card lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5 text-dashboard-primary" />
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-label="Close navigation overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[272px] flex-col overflow-hidden rounded-r-[20px] border-r border-dashboard-border bg-white shadow-card transition-[width] duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${!mobileOpen && collapsed ? "lg:w-[72px]" : "lg:w-[272px]"}`}
      >
        <button
          type="button"
          onClick={closeMobile}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-dashboard-secondary hover:bg-gray-100 lg:hidden"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div
          className={`shrink-0 px-4 pt-5 pb-3 ${isExpanded ? "" : "flex flex-col items-center"}`}
        >
          <AlSharifLogo collapsed={!isExpanded} />

          {isExpanded ? (
            <div className="relative mt-3 w-full">
              <div className="h-px w-full bg-[#E5E7EB]" />
              <button
                type="button"
                onClick={toggleCollapsed}
                className="absolute -right-1 top-1/2 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#9CA3AF] transition hover:border-[#D1D5DB] hover:text-[#6B7280] lg:flex"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="mt-3 flex w-full flex-col items-center gap-3">
              <div className="h-px w-10 bg-[#E5E7EB]" />
              <button
                type="button"
                onClick={toggleCollapsed}
                className="hidden h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#9CA3AF] transition hover:border-[#D1D5DB] hover:text-[#6B7280] lg:flex"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={`flex flex-1 flex-col overflow-y-auto overflow-x-hidden py-2 ${
            isExpanded ? "px-3" : "items-center px-2"
          }`}
        >
          {sidebarNavItems.map((item) => {
            const active = isNavActive(pathname, item.href, item.label);
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                title={!isExpanded ? item.label : undefined}
                onClick={closeMobile}
                className={`group mb-1 flex items-center rounded-xl transition-colors ${
                  isExpanded ? "gap-3 px-3 py-2.5" : "h-10 w-10 justify-center"
                } ${
                  active
                    ? "bg-[#EEF2FF] text-[#1F2937]"
                    : "text-[#374151] hover:bg-[#F9FAFB]"
                }`}
              >
                <Icon
                  className={`shrink-0 ${isExpanded ? "h-5 w-5" : "h-[18px] w-[18px]"}`}
                  strokeWidth={1.75}
                />
                {isExpanded && (
                  <span className="text-[13px] font-medium leading-snug">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`shrink-0 border-t border-[#E5E7EB] ${isExpanded ? "px-3 py-3" : "flex flex-col items-center gap-3 px-2 py-4"}`}
        >
          <Link
            href="/settings"
            onClick={closeMobile}
            title={!isExpanded ? "Theme Settings" : undefined}
            className={`flex items-center transition-colors ${
              isExpanded
                ? "gap-2.5 rounded-xl bg-[#EEF4FF] px-3 py-2.5 text-[13px] font-medium text-[#374151] hover:bg-[#E8EFFE]"
                : "h-10 w-10 justify-center rounded-xl bg-[#F5E6E0] text-[#374151] hover:bg-[#EDD9D0]"
            }`}
          >
            <Palette
              className={`shrink-0 ${isExpanded ? "h-5 w-5" : "h-[18px] w-[18px]"}`}
              strokeWidth={1.75}
            />
            {isExpanded && <span>Theme Settings</span>}
          </Link>

          {isExpanded && <div className="my-3 h-px bg-[#E5E7EB]" />}

          <div
            className={`flex items-center ${isExpanded ? "gap-2.5 px-1" : "justify-center"}`}
          >
            <div
              className={`shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-blue-600 ${
                isExpanded ? "h-9 w-9" : "h-9 w-9"
              }`}
            >
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
                A
              </div>
            </div>

            {isExpanded && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#111827]">Ahmed</p>
                  <p className="truncate text-[11px] text-[#9CA3AF]">Joined in August 2014</p>
                </div>
                <button
                  type="button"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] text-[#9CA3AF] transition hover:bg-[#F9FAFB] hover:text-[#6B7280]"
                  aria-label="User menu"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
