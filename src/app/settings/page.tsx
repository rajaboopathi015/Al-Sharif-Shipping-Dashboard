import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageContainer>
        <PageHeader title="Settings" currentPage="Settings" showFilters={false} />
        <div className="flex flex-col items-center justify-center rounded-card border border-dashboard-border bg-white py-24 shadow-card">
          <Settings className="mb-4 h-12 w-12 text-blue-500" />
          <h2 className="text-xl font-bold text-dashboard-primary">Settings</h2>
          <p className="mt-2 text-sm text-dashboard-secondary">
            Dashboard configuration — coming soon
          </p>
        </div>
      </PageContainer>
    </AppShell>
  );
}
