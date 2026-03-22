"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  BarChart3,
  Bell,
  Settings,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { id: "dashboard", label: "Dashboard",    icon: LayoutDashboard, href: "/dashboard" },
  { id: "timetable", label: "Timetable",    icon: CalendarDays, href: "/timetable" },
  { id: "chat",      label: "Chat",         icon: MessageSquare, href: "/chat" },
  { id: "insights",  label: "Insights",     icon: BarChart3, href: "/insights" },
];

const bottomItems = [
  { id: "notifications", label: "Notifications", icon: Bell, href: "/notifications" },
  { id: "settings",      label: "Settings",      icon: Settings, href: "/settings" },
];

function getActiveNavId(pathname: string) {
  const allItems = [...navItems, ...bottomItems];
  const matchedItem = allItems
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return matchedItem?.id ?? "dashboard";
}

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeNav = getActiveNavId(pathname);

  const [expanded, setExpanded] = useState(false);

  // Auto-collapse after 7 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (expanded) {
      timer = setTimeout(() => {
        setExpanded(false);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [expanded]);

  return (
    <div className="flex items-center justify-center py-5 pl-4 flex-shrink-0 relative z-50">
      {/* The pill itself */}
      <motion.div
        layout
        animate={{ width: expanded ? 200 : 72 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex flex-col items-center justify-between h-full py-6 px-3 relative"
        style={{
          borderRadius: "2.5rem",
          background: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.80)",
          boxShadow: "6px 6px 20px rgba(0,0,0,0.08), -4px -4px 14px rgba(255,255,255,0.95), inset 0 1px 0 rgba(255,255,255,0.9)",
          minHeight: "calc(100vh - 40px)",
          overflow: "hidden"
        }}
      >
        {/* Toggle Expand Button */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-white/50 hover:bg-white/80 border border-white/80 rounded-l-md flex items-center justify-center shadow-neumorphic z-20 transition-colors"
        >
          {expanded ? <ChevronLeft className="w-3 h-3 text-primary" /> : <ChevronRight className="w-3 h-3 text-primary" />}
        </button>

        {/* Logo at top */}
        <motion.div layout className={`flex flex-col items-center gap-6 w-full ${expanded ? 'px-2' : ''}`}>
          <motion.div layout className={`flex items-center ${expanded ? 'w-full gap-3' : 'justify-center'}`}>
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-primary/20 bg-white shadow-neumorphic flex-shrink-0">
              <Image src="/images/app-icon.png" alt="Prominder" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-black text-primary text-lg whitespace-nowrap overflow-hidden"
                >
                  Prominder
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Separator */}
          <motion.div layout className="w-8 h-px bg-primary/10" />

          {/* Nav items */}
          <nav className="flex flex-col items-start gap-2 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <div key={item.id} className="relative group w-full">
                  <motion.button
                    layout
                    whileHover={{ scale: expanded ? 1.02 : 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (pathname !== item.href) {
                        router.push(item.href);
                      }
                    }}
                    className={`relative h-11 rounded-2xl flex items-center transition-all w-full ${
                      expanded ? 'px-3 justify-start gap-3' : 'w-11 justify-center mx-auto'
                    } ${
                      isActive
                        ? "bg-primary text-white shadow-neumorphic"
                        : "text-foreground/50 hover:text-primary hover:bg-primary/8"
                    }`}
                    style={isActive && !expanded ? {
                      boxShadow: "3px 3px 8px rgba(58,90,64,0.25), -2px -2px 6px rgba(255,255,255,0.8)",
                    } : {}}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-2xl bg-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      />
                    )}
                    <Icon className={`w-5 h-5 relative z-10 flex-shrink-0 ${isActive ? "text-white" : ""}`} />
                    
                    <AnimatePresence>
                      {expanded && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`relative z-10 font-bold text-sm whitespace-nowrap overflow-hidden ${isActive ? "text-white" : ""}`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* NEW badge for Insights */}
                    {item.id === "insights" && !expanded && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full flex items-center justify-center">
                        <Sparkles className="w-2 h-2 text-white" />
                      </span>
                    )}
                    {item.id === "insights" && expanded && (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute right-3 w-4 h-4 rounded-full flex items-center justify-center bg-accent/20 z-10"
                      >
                         <Sparkles className="w-2.5 h-2.5 text-accent" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Tooltip (only when collapsed) */}
                  {!expanded && (
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                      <div className="bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                        {item.label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </motion.div>

        {/* Bottom items */}
        <nav className="flex flex-col items-start gap-2 w-full">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <div key={item.id} className="relative group w-full">
                <motion.button
                  layout
                  whileHover={{ scale: expanded ? 1.02 : 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (pathname !== item.href) {
                      router.push(item.href);
                    }
                  }}
                  className={`relative h-11 rounded-2xl flex items-center transition-all w-full ${
                    expanded ? 'px-3 justify-start gap-3' : 'w-11 justify-center mx-auto'
                  } ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-foreground/40 hover:text-primary hover:bg-primary/8"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />

                  <AnimatePresence>
                    {expanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`relative z-10 font-bold text-sm whitespace-nowrap overflow-hidden ${isActive ? "text-white" : ""}`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Notification dot */}
                  {item.id === "notifications" && !expanded && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
                  )}
                  {item.id === "notifications" && expanded && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                      3
                    </span>
                  )}
                </motion.button>

                {/* Tooltip (only when collapsed) */}
                {!expanded && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    <div className="bg-foreground text-background text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                      {item.label}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-foreground" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
}
