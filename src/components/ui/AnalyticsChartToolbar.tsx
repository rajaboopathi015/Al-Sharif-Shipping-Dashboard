import { Maximize2, MoreHorizontal, Palette } from "lucide-react";

const icons = [Palette, Maximize2, MoreHorizontal];
const labels = ["Chart theme", "Expand chart", "More options"];

export function AnalyticsChartToolbar() {
  return (
    <div className="flex items-center gap-1">
      {icons.map((Icon, i) => (
        <button
          key={labels[i]}
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md text-dashboard-secondary transition hover:bg-dashboard-bg hover:text-dashboard-primary"
          aria-label={labels[i]}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
