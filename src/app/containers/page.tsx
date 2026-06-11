import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Box } from "lucide-react";

export default function ContainersPage() {
  return (
    <AppShell>
      <PageContainer>
        <PageHeader title="Containers" currentPage="Containers" showFilters={false} />
        <div className="flex flex-col items-center justify-center rounded-card border border-dashboard-border bg-white py-24 shadow-card">
          <Box className="mb-4 h-12 w-12 text-blue-500" />
          <h2 className="text-xl font-bold text-dashboard-primary">Containers</h2>
          <p className="mt-2 text-sm text-dashboard-secondary">
            Container inventory module — coming soon
          </p>
        </div>
      </PageContainer>
    </AppShell>
  );
}
