"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, FastForward, Rewind, Volume2, Wind,
  CheckCircle2, Clock, BookOpen, Zap, TrendingUp, Target, Brain, Send, ChevronRight, Flame, BarChart2, CalendarDays, Sparkles
} from "lucide-react";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const topics = [
  { id: 1, name: "Calculus II",       color: "from-emerald-400 to-teal-500",    progress: 72, sessions: 8, tag: "Math" },
  { id: 2, name: "Physics Lab",       color: "from-blue-400 to-indigo-500",     progress: 45, sessions: 5, tag: "Science" },
  { id: 3, name: "History Essay",     color: "from-amber-400 to-orange-500",    progress: 88, sessions: 12, tag: "Humanities" },
  { id: 4, name: "French Grammar",    color: "from-rose-400 to-pink-500",       progress: 31, sessions: 3, tag: "Language" },
];

const recentSessions = [
  { subject: "Calculus II",   duration: "45 min", time: "9:00 AM",  score: 92 },
  { subject: "Physics Lab",   duration: "30 min", time: "11:00 AM", score: 78 },
  { subject: "History Essay", duration: "60 min", time: "2:00 PM",  score: 85 },
];

const upNext = {
  subject: "Biology 101",
  type: "Lecture & Notes",
  time: "3:00 PM - 4:30 PM",
  in: "45 mins"
};

const equalizerBars = [
  { peakHeight: 14, duration: 0.62 },
  { peakHeight: 20, duration: 0.95 },
  { peakHeight: 12, duration: 0.71 },
  { peakHeight: 18, duration: 0.88 },
  { peakHeight: 10, duration: 0.56 },
  { peakHeight: 19, duration: 1.02 },
  { peakHeight: 13, duration: 0.74 },
  { peakHeight: 17, duration: 0.91 },
  { peakHeight: 11, duration: 0.67 },
  { peakHeight: 21, duration: 1.08 },
  { peakHeight: 15, duration: 0.79 },
  { peakHeight: 16, duration: 0.84 },
  { peakHeight: 9, duration: 0.53 },
  { peakHeight: 18, duration: 0.97 },
  { peakHeight: 12, duration: 0.69 },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function CircularProgress({ value, size = 56, stroke = 5 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(58,90,64,0.1)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="hsl(160,23%,25%)" strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// LOW PRIORITY EXTRA CARDS (BELOW FOLD)
// ─────────────────────────────────────────────

function LearningCurveCard() {
  const pts = [20, 35, 30, 50, 68, 65, 85, 95];
  const max = 100;
  const w = 240, h = 60;
  const step = w / (pts.length - 1);
  const pathD = `M ${pts.map((v, i) => `${i * step},${h - (v / max) * h}`).join(" L ")}`;
  const fillD = `M 0,${h} L ${pts.map((v, i) => `${i * step},${h - (v / max) * h}`).join(" L ")} L ${w},${h} Z`;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      className="bg-white/70 rounded-3xl p-5 border border-white/80 shadow-neumorphic flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-emerald-500" /> Learning Curve
        </h3>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">+18% this month</span>
      </div>
      <div className="relative w-full overflow-hidden flex-1 flex items-end">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.3" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient>
          </defs>
          <path d={fillD} fill="url(#curveGrad)" />
          <motion.path d={pathD} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }} />
        </svg>
      </div>
    </motion.div>
  );
}

function FocusMusicCard() {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
      className="bg-white/70 rounded-3xl p-5 border border-white/80 shadow-neumorphic relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-violet-100/50 to-transparent pointer-events-none" />
      <div className="flex items-center justify-between z-10">
        <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center"><Volume2 className="w-3 h-3 text-violet-600" /></div>
          Deep Focus Beats
        </h3>
      </div>
      <div className="flex flex-col items-center mt-3 z-10">
        <p className="text-xs font-semibold text-foreground">Lo-Fi Study Mix</p>
        <p className="text-[10px] text-muted-foreground mb-3">Playing from Prominder Radio</p>
        <div className="flex items-end gap-1 mb-4 h-6">
          {equalizerBars.map((bar, i) => (
            <motion.div key={i} className="w-1 bg-violet-400 rounded-full" animate={playing ? { height: [8, bar.peakHeight, 8] } : { height: 4 }} transition={playing ? { repeat: Infinity, duration: bar.duration, ease: "easeInOut" } : {}} />
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors"><Rewind className="w-4 h-4" /></button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setPlaying(!playing)} className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center shadow-md shadow-violet-500/30">
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </motion.button>
          <button className="text-muted-foreground hover:text-foreground transition-colors"><FastForward className="w-4 h-4" /></button>
        </div>
      </div>
    </motion.div>
  );
}

function UnwindCard() {
  const [breathing, setBreathing] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
      className="bg-white/70 rounded-3xl p-5 border border-white/80 shadow-neumorphic flex flex-col justify-between relative overflow-hidden"
    >
      <div className="flex items-center justify-between z-10">
        <h3 className="font-bold text-foreground text-sm flex items-center gap-2"><Wind className="w-4 h-4 text-sky-500" /> Mindful Unwind</h3>
        <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-semibold">1 Min Break</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center mt-2 z-10">
        <div className="relative w-16 h-16 flex items-center justify-center cursor-pointer" onClick={() => setBreathing(!breathing)}>
          <motion.div className="absolute inset-0 rounded-full bg-sky-100 border border-sky-300 shadow-inner" animate={breathing ? { scale: [1, 1.8, 1] } : { scale: 1 }} transition={breathing ? { repeat: Infinity, duration: 8, ease: "easeInOut" } : {}} />
          <motion.div className="absolute bg-sky-400 rounded-full opacity-30 blur-md" animate={breathing ? { width: [40, 90, 40], height: [40, 90, 40] } : { width: 40, height: 40 }} transition={breathing ? { repeat: Infinity, duration: 8, ease: "easeInOut" } : {}} />
          <span className="relative z-10 text-[10px] font-bold text-sky-700">{breathing ? "Breathe" : "Start"}</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-6 text-center leading-tight">{breathing ? "Inhale slowly, exhale completely..." : "Tap the circle to start a quick breathing exercise"}</p>
      </div>
    </motion.div>
  );
}


// ─────────────────────────────────────────────
// MAIN COMPONENT EXPORT
// ─────────────────────────────────────────────

export function MainContent() {
  const [aiInput, setAiInput] = useState("");
  const [activeSession, setActiveSession] = useState(false);
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [aiFocused, setAiFocused] = useState(false);

  return (
    <div className="relative flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <main className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar relative" id="main-scroll-area">
        <div className="w-full max-w-5xl mx-auto space-y-8 mt-2">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ── LEFT COLUMN (High Priority) ── */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              
              {/* 1. Active Study Card */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, hsl(160,23%,25%) 0%, hsl(160,14%,35%) 100%)",
                  boxShadow: "8px 8px 24px rgba(58,90,64,0.25), -4px -4px 12px rgba(255,255,255,0.8)",
                }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 bg-white translate-x-12 -translate-y-12" />
                <div className="absolute bottom-0 right-16 w-24 h-24 rounded-full opacity-10 bg-white translate-y-8" />
                <div className="relative p-6 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">Active Topic</p>
                      <h2 className="text-white font-bold text-2xl">{activeTopic.name}</h2>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-white/70 text-sm">{activeTopic.sessions} sessions completed</span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/70 text-sm font-semibold">{activeTopic.progress}% done</span>
                      </div>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveSession(!activeSession)}
                    className="flex items-center gap-2 bg-white text-primary font-bold text-sm px-6 py-3.5 rounded-2xl hover:bg-white/90 transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-primary" />{activeSession ? "Pause" : "Start Session"}
                  </motion.button>
                </div>
                <div className="relative px-6 pb-5">
                  <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-white/80 rounded-full" initial={{ width: 0 }} animate={{ width: `${activeTopic.progress}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} />
                  </div>
                </div>
              </motion.div>

              {/* 2. Today's Progress Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: CheckCircle2, label: "Sessions",    value: "3",       sub: "today",    color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: Clock,        label: "Study Time",  value: "2h 15m",  sub: "logged",   color: "text-blue-600",    bg: "bg-blue-50" },
                  { icon: Flame,        label: "Streak",      value: "7 days",  sub: "on fire 🔥", color: "text-orange-500", bg: "bg-orange-50" },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 + 0.2 }}
                    className="bg-white/70 rounded-3xl p-5 border border-white/80 shadow-neumorphic"
                  >
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-3xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label} · {stat.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* 3. Today's Sessions List (High Priority) */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white/70 rounded-3xl p-5 border border-white/80 shadow-neumorphic"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" /> Today&apos;s Sessions
                  </h3>
                   <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">View history</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {recentSessions.map((session, i) => (
                    <motion.div key={i} whileHover={{ y: -2 }} className="flex flex-col gap-2 p-4 rounded-2xl bg-background/50 border border-transparent hover:border-border hover:shadow-sm transition-all focus:outline-none cursor-pointer">
                      <div className="flex items-center justify-between">
                         <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                           <Target className="w-4 h-4 text-primary" />
                         </div>
                         <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full shadow-sm">
                           <div className={`w-2 h-2 rounded-full ${session.score >= 85 ? "bg-emerald-500" : session.score >= 70 ? "bg-amber-500" : "bg-red-400"}`} />
                           <span className="text-xs font-bold text-foreground">{session.score}%</span>
                         </div>
                      </div>
                      <div className="mt-1">
                        <p className="font-bold text-foreground truncate leading-tight">{session.subject}</p>
                        <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1"><Clock className="w-3 h-3"/> {session.time} · {session.duration}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* ── RIGHT COLUMN (Medium Priority) ── */}
            <div className="space-y-6">
              
              {/* Up Next / Timetable Widget */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-primary rounded-3xl p-5 border border-primary-foreground/10 shadow-neumorphic relative overflow-hidden text-white"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-white/80" /> Up Next
                  </h3>
                  <span className="text-[10px] bg-white text-primary px-2 py-0.5 rounded-full font-bold shadow-sm">in {upNext.in}</span>
                </div>
                <div className="relative z-10 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
                   <p className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mb-1">{upNext.type}</p>
                   <p className="font-bold text-lg mb-2">{upNext.subject}</p>
                   <div className="flex items-center gap-1.5 text-xs text-white/90">
                     <Clock className="w-3.5 h-3.5" /> {upNext.time}
                   </div>
                </div>
              </motion.div>

              {/* Topics Overview */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="bg-white/70 rounded-3xl p-5 border border-white/80 shadow-neumorphic"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> Topics Overview
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {topics.slice(0, 3).map((topic) => (
                    <motion.button key={topic.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveTopic(topic)}
                      className={`relative rounded-2xl p-4 text-left overflow-hidden border-2 transition-all ${
                        activeTopic.id === topic.id ? "border-primary/40 bg-primary/5 shadow-sm" : "border-transparent bg-background/60 hover:bg-white/80"
                      }`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${topic.color}`} />
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{topic.tag}</span>
                          <p className="font-semibold text-sm text-foreground mt-0.5 truncate">{topic.name}</p>
                        </div>
                        <div className="flex-shrink-0 ml-2 relative">
                          <CircularProgress value={topic.progress} size={40} stroke={4} />
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-foreground rotate-90">{topic.progress}%</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 text-xs text-primary font-bold hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-center gap-1">
                   View all topics <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* ── LOW PRIORITY / CREATIVE CARDS (Below Fold) ── */}
          <div className="pt-8 mt-8 border-t border-border/60">
             <div className="mb-5">
               <h3 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-amber-500" /> Focus & Insights
               </h3>
               <p className="text-xs text-muted-foreground mt-1">Extra tools to unwind and observe your learning curve.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LearningCurveCard />
                <FocusMusicCard />
                <UnwindCard />
             </div>
          </div>

        </div>
      </main>

      {/* ── Sticky AI Assistant ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl z-40 px-4 pointer-events-none">
        <motion.div 
          animate={aiFocused ? { y: -10, scale: 1.02 } : { y: 0, scale: 1 }}
          className="bg-white/85 backdrop-blur-xl border border-white/90 p-2 rounded-full shadow-neumorphic-lg flex items-center gap-2 pointer-events-auto"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onFocus={() => setAiFocused(true)}
            onBlur={() => setAiFocused(false)}
            placeholder="Ask AI for study tips, topic summary, etc..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground mr-2 h-10"
          />
          <AnimatePresence>
            {aiInput.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-primary/30 mr-1"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
