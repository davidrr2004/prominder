"use client";

import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopBar } from "@/components/dashboard/TopBar";
import { MainContent } from "@/components/dashboard/MainContent";
import { RightPanel } from "@/components/dashboard/RightPanel";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left pill sidebar */}
      <DashboardSidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardTopBar title="Dashboard" />
        <div className="flex flex-1 overflow-hidden pr-4">
          <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
            <MainContent />
          </div>

          {/* Vertical separator between feed and panel */}
          <div
            className="w-px my-6 mx-2 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(58,90,64,0.04) 0%, rgba(58,90,64,0.22) 50%, rgba(58,90,64,0.04) 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.55)",
            }}
          />

          <div className="pl-1 h-full flex flex-col overflow-hidden">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
