import { CalendarDays } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopBar } from "@/components/dashboard/TopBar";

export default function TimetablePage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <DashboardTopBar title="Timetable" />
        <main className="flex-1 overflow-y-auto px-5 pb-8 demo-scrollbar">
          <div className="rounded-3xl p-6 border border-white/80 bg-white/70 shadow-neumorphic">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Timetable</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Timetable view is now route-enabled. You can add this section content next without changing sidebar navigation wiring.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
