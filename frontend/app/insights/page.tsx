"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopBar } from "@/components/dashboard/TopBar";
import { InsightsContent } from "@/components/dashboard/InsightsContent";

export default function InsightsPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardTopBar title="Insights" />
        <InsightsContent />
      </div>
    </div>
  );
}
