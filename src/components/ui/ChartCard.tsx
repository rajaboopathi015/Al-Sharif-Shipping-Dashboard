import type { ReactNode } from "react";
import { ChartCardToolbar } from "./ChartCardToolbar";

type ChartCardProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
  showToolbar?: boolean;
  compact?: boolean;
  hideHeader?: boolean;
};

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className = "",
  delay = 0,
  showToolbar = true,
  compact = false,
  hideHeader = false,
}: ChartCardProps) {
  return (
    <div
      className={`animate-fade-lift rounded-card border border-dashboard-border bg-white shadow-card ${compact ? "p-3" : "p-5"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {!hideHeader && (
        <div className={`flex items-start justify-between gap-2 ${compact ? "mb-1.5" : "mb-4"}`}>
          <div className="min-w-0 flex-1">
            <h3
              className={`font-semibold leading-snug text-dashboard-primary ${compact ? "text-[11px]" : "text-sm"}`}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-[10px] text-dashboard-secondary">{subtitle}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {action}
            {showToolbar && <ChartCardToolbar />}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
