"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  CheckCheck,
  BookMarked,
  Sparkles,
  Maximize2,
  Minimize2,
} from "lucide-react";

// ── Journal entries per date (keyed as YYYY-MM-DD) ──
const journalData: Record<string, { mood: string; entry: string; highlights: string[] }> = {
  "2026-03-19": {
    mood: "😊",
    entry: "Great session on Calculus today. Finally cracked the chain rule! Physics quiz went better than expected.",
    highlights: ["Completed Calculus II – Chapter 4", "Physics quiz: 87%"],
  },
  "2026-03-20": {
    mood: "😤",
    entry: "Struggled with French conjugations. Need to revisit the subjunctive chapter tomorrow. History essay outline done.",
    highlights: ["French Grammar – struggled", "History essay outline ✓"],
  },
  "2026-03-21": {
    mood: "🔥",
    entry: "Today is going strong! Finished 3 sessions before noon. The Pomodoro method is working wonders.",
    highlights: ["3 sessions completed", "7-day streak achieved 🔥"],
  },
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// Session-completed dates for highlighting
const completedDates = new Set([
  "2026-03-01","2026-03-03","2026-03-05","2026-03-08","2026-03-10",
  "2026-03-12","2026-03-15","2026-03-17","2026-03-19","2026-03-20","2026-03-21",
]);

function pad(n: number) { return n.toString().padStart(2, "0"); }
function dateKey(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

export function RightPanel() {
  const today = new Date(2026, 2, 21); // March 21 2026
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(dateKey(today.getFullYear(), today.getMonth(), today.getDate()));
  const [journalText, setJournalText]   = useState(journalData[selectedDate]?.entry ?? "");
  const [saved, setSaved] = useState(false);
  const [isJournalExpanded, setIsJournalExpanded] = useState(false);

  // Profile 3D interaction logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleProfileMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleProfileLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const firstDay  = new Date(viewYear, viewMonth, 1).getDay();
  const daysCount = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const selectDate = (day: number) => {
    const key = dateKey(viewYear, viewMonth, day);
    setSelectedDate(key);
    setJournalText(journalData[key]?.entry ?? "");
    setSaved(false);
  };

  const goJournalPrev = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    setSelectedDate(key);
    setJournalText(journalData[key]?.entry ?? "");
    setSaved(false);
  };
  const goJournalNext = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    setSelectedDate(key);
    setJournalText(journalData[key]?.entry ?? "");
    setSaved(false);
  };

  const handleSave = () => {
    journalData[selectedDate] = {
      mood: journalData[selectedDate]?.mood ?? "📝",
      entry: journalText,
      highlights: journalData[selectedDate]?.highlights ?? [],
    };
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selDateObj      = new Date(selectedDate);
  const selDay          = selDateObj.getDate();
  const selMonthName    = MONTHS[selDateObj.getMonth()];
  const currentEntry    = journalData[selectedDate];
  const isToday         = selectedDate === dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <>
      <aside className="w-72 xl:w-80 flex-shrink-0 flex flex-col gap-4 py-5 pr-5 overflow-y-auto no-scrollbar relative z-10 h-full">
        
        {/* ── User Profile Header ── */}
        <div style={{ perspective: 1000 }} className="relative z-10">
          <motion.div 
            onMouseMove={handleProfileMove}
            onMouseLeave={handleProfileLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="flex flex-col items-center justify-center py-5 bg-white/60 border border-white/80 rounded-3xl shadow-neumorphic relative"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-neumorphic text-muted-foreground hover:text-primary transition-colors"
              style={{ transform: "translateZ(20px)" }}
            >
              <PenLine className="w-3.5 h-3.5" />
            </motion.button>

            <div className="relative mb-3" style={{ transform: "translateZ(40px)" }}>
              <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 border-[3px] border-white shadow-neumorphic-lg flex-shrink-0 relative">
                <div className="w-full h-full bg-gradient-to-tr from-violet-300 via-pink-200 to-amber-100 flex items-center justify-center">
                  <span className="text-2xl font-black text-violet-800/40">EH</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-lg font-bold text-foreground flex items-center gap-1.5" style={{ transform: "translateZ(30px)" }}>
              Esther Howard
              <div className="w-3.5 h-3.5 bg-violet-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">✓</div>
            </h2>
            <p className="text-xs text-muted-foreground font-medium mt-0.5" style={{ transform: "translateZ(20px)" }}>Elementary</p>
          </motion.div>
        </div>

        {/* ── Mini Calendar ── */}
        <div className="rounded-3xl p-4 border border-white/80 flex-shrink-0" style={{ background: "rgba(255,255,255,0.72)" }}>
          {/* Calendar implementation... */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-foreground text-sm">{MONTHS[viewMonth]} {viewYear}</h3>
            <div className="flex items-center gap-1">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goToPrevMonth}
                className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors"
              ><ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" /></motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goToNextMonth}
                className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors"
              ><ChevronRight className="w-3.5 h-3.5 text-muted-foreground" /></motion.button>
            </div>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const key      = dateKey(viewYear, viewMonth, day);
              const isActive = key === selectedDate;
              const isTod    = key === dateKey(today.getFullYear(), today.getMonth(), today.getDate());
              const isDone   = completedDates.has(key);
              return (
                <motion.button key={i} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => selectDate(day)}
                  className={`relative mx-auto w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium transition-all ${
                    isActive ? "bg-primary text-white shadow-neumorphic" : isTod ? "text-primary font-bold border-2 border-primary/40" : "text-foreground/70 hover:bg-primary/10"
                  }`}
                >
                  {day}
                  {isDone && !isActive && <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Compact Journal (Right Panel View) ── */}
        <div className="rounded-3xl overflow-hidden border border-white/80 flex flex-col min-h-[300px]" style={{ background: "rgba(255,255,255,0.72)" }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: "linear-gradient(90deg, hsl(160,23%,25%) 0%, hsl(160,14%,38%) 100%)" }}>
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-white/80" />
              <span className="text-white font-bold text-sm">Journal</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsJournalExpanded(true)} className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-white" />
              </motion.button>
            </div>
          </div>
          <div className="relative p-4 flex-1 flex flex-col">
            {/* Handwriting lined paper block */}
            <div className="flex-1 rounded-xl border border-primary/10 bg-yellow-50/50 p-3 pt-4 relative overflow-hidden flex flex-col"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(58,90,64,0.15) 31px, rgba(58,90,64,0.15) 32px)",
                backgroundAttachment: "local",
                backgroundPositionY: "12px",
              }}
            >
               <textarea
                  value={journalText}
                  onChange={(e) => { setJournalText(e.target.value); setSaved(false); }}
                  placeholder="How are you feeling about your studies?"
                  className="w-full flex-1 bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground/30 text-lg relative z-10"
                  style={{ fontFamily: "'Caveat', cursive", lineHeight: "32px", minHeight: "150px" }}
                />
            </div>
          </div>
        </div>
      </aside>

      {/* ── Expanded Journal Modal ── */}
      <AnimatePresence>
        {isJournalExpanded && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsJournalExpanded(false)} />
            <motion.div 
              layoutId="journal-paper"
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-border"
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(90deg, hsl(160,23%,25%) 0%, hsl(160,14%,38%) 100%)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 mr-6 text-white text-xl">
                    <span>{currentEntry?.mood ?? "📝"}</span> Mood
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goJournalPrev} className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors"><ChevronLeft className="w-4 h-4 text-white" /></motion.button>
                  <div className="px-3 text-center text-white">
                    <p className="font-bold text-lg leading-none">{selMonthName} {selDay}, {selDateObj.getFullYear()}</p>
                    {isToday && <p className="text-white/60 text-xs mt-1">Today</p>}
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={goJournalNext} className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors"><ChevronRight className="w-4 h-4 text-white" /></motion.button>
                </div>
                <div className="flex items-center gap-3">
                   <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave}
                      className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${saved ? "bg-emerald-500 text-white" : "bg-white text-primary"}`}
                    >
                      {saved ? <><CheckCheck className="w-4 h-4" /> Saved</> : <><PenLine className="w-4 h-4" /> Save</>}
                   </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsJournalExpanded(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/15 hover:bg-white/25 transition-colors">
                    <Minimize2 className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex overflow-hidden">
                {/* HighlightsSidebar */}
                <div className="w-64 border-r border-border/50 bg-background/30 p-6 flex flex-col">
                  {currentEntry?.highlights?.length ? (
                     <>
                      <h4 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500"/> Day&apos;s Highlights</h4>
                      <div className="space-y-3">
                        {currentEntry.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 bg-white p-3 rounded-2xl shadow-sm border border-border/50">
                            <CheckCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm font-medium text-foreground">{h}</span>
                          </div>
                        ))}
                      </div>
                     </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 opacity-50">
                      <BookMarked className="w-10 h-10 mb-2"/>
                      <p className="text-sm">No highlights for this day yet.</p>
                    </div>
                  )}
                </div>
                {/* Wide Text Area */}
                <div className="flex-1 bg-yellow-50/40 p-10 pt-12 relative overflow-y-auto"
                   style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, rgba(58,90,64,0.15) 39px, rgba(58,90,64,0.15) 40px)",
                    backgroundAttachment: "local",
                    backgroundPositionY: "14px",
                  }}
                >
                  <textarea
                    value={journalText}
                    onChange={(e) => { setJournalText(e.target.value); setSaved(false); }}
                    placeholder="Reflect on your day..."
                    className="w-full h-full min-h-[500px] bg-transparent resize-none focus:outline-none placeholder:text-muted-foreground/30 text-2xl text-foreground font-medium"
                    style={{ fontFamily: "'Caveat', cursive", lineHeight: "40px" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
