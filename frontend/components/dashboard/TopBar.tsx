"use client";

import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardTopBarProps {
  title?: string;
}

export function DashboardTopBar({ title = "Dashboard" }: DashboardTopBarProps) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="flex items-center gap-4 px-6 pt-5 pb-3 flex-shrink-0">
      {/* Logo + page title */}
      <div className="flex items-center gap-3 min-w-[160px]">
        <div>
          <h1 className="text-xl font-bold text-foreground leading-tight">{title}</h1>
          <p className="text-xs text-muted-foreground">Saturday, 21 March 2026</p>
        </div>
      </div>

      {/* Search — center */}
      <div className="flex-1 max-w-md mx-auto">
        <motion.div
          animate={{ scale: searchFocused ? 1.01 : 1 }}
          transition={{ duration: 0.15 }}
          className="relative"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search topics, sessions, notes…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/70 border border-white/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all shadow-neumorphic-inset"
          />
        </motion.div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-9 h-9 rounded-2xl bg-white/70 border border-white/70 flex items-center justify-center shadow-neumorphic hover:bg-white transition-all"
        >
          <Bell className="w-4 h-4 text-foreground/70" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </motion.button>
      </div>
    </div>
  );
}
