"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain, Clock, TrendingUp, Zap, CheckCircle2, Flame,
  RotateCcw, Lightbulb, ArrowUpRight,
  Star, Target, ChevronRight, Sparkles, BarChart2,
} from "lucide-react";

/* ──────────────────────────────────────
   DATA
──────────────────────────────────────*/
const weeklyData = [65, 72, 58, 80, 75, 90, 82];
const weekDays   = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const streakDays = [
  { day: "M", done: true  },{ day: "T", done: true  },{ day: "W", done: true  },
  { day: "T", done: true  },{ day: "F", done: true  },{ day: "S", done: true  },
  { day: "S", done: true  },
];

/* ──────────────────────────────────────
   SPARKLINE (simple SVG path)
──────────────────────────────────────*/
function Sparkline({ data, color = "#3a5a40", height = 36 }: { data: number[]; color?: string; height?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${x},${y}`;
  });
  const d = `M ${pts.join(" L ")}`;
  const fill = `M ${pts[0]} L ${pts.join(" L ")} L ${120},${height} L 0,${height} Z`;
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#grad-${color.replace("#","")})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ──────────────────────────────────────
   CIRCULAR GAUGE
──────────────────────────────────────*/
function Gauge({ value, size = 80, color = "#3a5a40", label }: { value: number; size?: number; color?: string; label?: string }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={stroke} />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-foreground leading-none">{value}%</span>
        {label && <span className="text-[9px] text-muted-foreground mt-0.5 font-medium">{label}</span>}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   FLIP CARD WRAPPER
──────────────────────────────────────*/
function FlipCard({ front, back, className = "", style = {} }: {
  front: React.ReactNode; back: React.ReactNode;
  className?: string; style?: React.CSSProperties;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000, ...style }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%" }}
      >
        {/* Front */}
        <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", position: "absolute", inset: 0 }}>
          {front}
        </div>
        {/* Back */}
        <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", position: "absolute", inset: 0, transform: "rotateY(180deg)" }}>
          {back}
        </div>
      </motion.div>

      {/* Flip hint */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
        <motion.div
          animate={{ rotate: flipped ? 180 : 0 }}
          transition={{ duration: 0.55 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center ${flipped ? "bg-white/30" : "bg-black/10"}`}
        >
          <RotateCcw className="w-3 h-3 text-current opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   CARD BASE STYLE
──────────────────────────────────────*/
const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.78)",
  border: "1px solid rgba(255,255,255,0.85)",
  boxShadow: "6px 6px 20px rgba(0,0,0,0.07), -4px -4px 14px rgba(255,255,255,0.9)",
  borderRadius: "1.5rem",
  height: "100%",
  overflow: "hidden",
};

const suggestionStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  border: "none",
  borderRadius: "1.5rem",
  height: "100%",
  overflow: "hidden",
});

/* ──────────────────────────────────────
   WEEKLY BAR CHART (SVG)
──────────────────────────────────────*/
function WeeklyChart() {
  const max = 100;
  const barW = 32;
  const gap = 18;
  const chartH = 110;
  return (
    <div className="flex items-end gap-0">
      {weeklyData.map((v, i) => {
        const h = (v / max) * chartH;
        const isMax = v === Math.max(...weeklyData);
        return (
          <div key={i} className="flex flex-col items-center" style={{ width: barW + gap }}>
            <div className="relative mb-1.5">
              {isMax && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary whitespace-nowrap">
                  {v}%
                </span>
              )}
              <div
                className="relative overflow-hidden"
                style={{ width: barW, height: chartH, display: "flex", alignItems: "flex-end" }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                  style={{
                    width: barW,
                    borderRadius: "8px 8px 4px 4px",
                    background: isMax
                      ? "linear-gradient(180deg, hsl(160,23%,25%) 0%, hsl(160,14%,38%) 100%)"
                      : "linear-gradient(180deg, rgba(58,90,64,0.25) 0%, rgba(58,90,64,0.12) 100%)",
                  }}
                />
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{weekDays[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────*/
export function InsightsContent() {
  /* ── 1. Attention Span — large rectangle with big number + sparkline ── */
  const attentionFront = (
    <div style={cardStyle} className="p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <Brain className="w-4 h-4 text-violet-600" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Attention Span</span>
        </div>
        <span className="text-[10px] bg-primary/8 text-primary font-semibold px-2.5 py-1 rounded-full">This week</span>
      </div>
      {/* Big number */}
      <div className="flex items-end gap-3 mt-3">
        <div>
          <div className="flex items-start gap-1">
            <span className="text-6xl font-black text-foreground leading-none">43</span>
            <span className="text-2xl font-bold text-foreground/50 mt-2">min</span>
            <ArrowUpRight className="w-5 h-5 text-emerald-500 mt-1.5 ml-1" />
          </div>
          <p className="text-sm text-muted-foreground mt-2 leading-snug">
            Average focus window per session. <span className="text-emerald-600 font-semibold">+8 min</span> vs last week.
          </p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <Sparkline data={[28, 35, 31, 40, 38, 45, 43]} color="#7c3aed" />
        </div>
      </div>
      {/* Color strip */}
      <div className="flex gap-1 mt-4 rounded-full overflow-hidden h-1.5">
        <div className="flex-1 bg-violet-400" />
        <div className="w-8 bg-violet-200" />
        <div className="w-4 bg-amber-300" />
      </div>
    </div>
  );
  const attentionBack = (
    <div style={suggestionStyle("linear-gradient(135deg,#7c3aed,#4f46e5)")} className="p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-sm">AI Suggestions</span>
        </div>
        <div className="space-y-3">
          {["Try 45-min deep work + 10-min break (Pomodoro+)", "Avoid phone 30 min before sessions", "Start with hardest topic when focus peaks (morning)"].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white/15 rounded-xl p-2.5">
              <span className="w-4 h-4 rounded-full bg-white/30 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <p className="text-white/90 text-xs leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-white/50 text-[10px] mt-3">Tap to flip back</p>
    </div>
  );

  /* ── 2. Avg Learning Time — tall card with ring ── */
  const learnFront = (
    <div style={cardStyle} className="p-5 flex flex-col items-center justify-between h-full">
      <div className="w-full flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Avg Learning Time</span>
      </div>
      <div className="flex flex-col items-center my-4">
        <Gauge value={68} size={100} color="#2563eb" label="Daily Goal" />
        <div className="mt-4 text-center">
          <p className="text-3xl font-black text-foreground">2h 18m</p>
          <p className="text-xs text-muted-foreground mt-1">per day · goal: 3h 30m</p>
        </div>
      </div>
      <div className="w-full space-y-1.5">
        {[{ label: "Mon–Fri", v: 72 }, { label: "Weekend", v: 45 }].map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
              <span>{r.label}</span><span>{r.v}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-blue-100 overflow-hidden">
              <motion.div className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }} animate={{ width: `${r.v}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const learnBack = (
    <div style={suggestionStyle("linear-gradient(135deg,#1d4ed8,#0ea5e9)")} className="p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-sm">To hit 3h 30m</span>
        </div>
        <div className="space-y-2.5">
          {["Add a 45-min evening session on weekdays", "Replace 1 scroll break with a micro-lesson", "Block calendar time for weekend study"].map((s, i) => (
            <div key={i} className="flex items-start gap-2 bg-white/15 rounded-xl p-2.5">
              <ChevronRight className="w-3.5 h-3.5 text-white/80 flex-shrink-0 mt-0.5" />
              <p className="text-white/90 text-xs leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-white/50 text-[10px] mt-3">You&apos;re 68% to your daily goal 💪</p>
    </div>
  );

  /* ── 3. Consistency Score — wide with bar chart ── */
  const consFront = (
    <div style={cardStyle} className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Consistency Score</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-600">
          <ArrowUpRight className="w-4 h-4" />
          <span className="text-sm font-bold">+12%</span>
        </div>
      </div>
      <div className="flex items-end justify-between flex-1">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-black text-foreground">84</span>
            <span className="text-2xl font-bold text-foreground/40">/ 100</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            You studied <span className="text-foreground font-semibold">6/7 days</span> this week
          </p>
        </div>
        <div className="pb-1">
          <WeeklyChart />
        </div>
      </div>
    </div>
  );
  const consBack = (
    <div style={suggestionStyle("linear-gradient(135deg,#059669,#10b981)")} className="p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-sm">Keep the streak going!</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Study at the same time daily", "Set a 'no-miss' commitment for Wed & Thu", "Log even 15-min sessions — consistency > duration", "Review yesterday's notes first thing in morning"].map((s, i) => (
            <div key={i} className="bg-white/15 rounded-xl p-2.5">
              <p className="text-white/90 text-xs leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 bg-white/15 rounded-xl px-3 py-2 flex items-center justify-between">
        <span className="text-white/80 text-xs font-medium">Next milestone</span>
        <span className="text-white font-bold text-sm">Score 90 🏆</span>
      </div>
    </div>
  );

  /* ── 4. Confidence Level — hexagon-ish round card ── */
  const confFront = (
    <div style={{...cardStyle, borderRadius:"2rem"}} className="p-5 flex flex-col items-center justify-center h-full text-center relative overflow-hidden">
      {/* Bg gradient blob */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-60" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center mb-3">
          <Zap className="w-5 h-5 text-amber-500" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Confidence Level</span>
        <div className="relative mb-2">
          <Gauge value={76} size={96} color="#f59e0b" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 max-w-[140px]">
          Based on quiz scores & self-ratings over 14 days
        </p>
        <div className="flex gap-1.5 mt-3">
          {["Math", "Science", "Lang"].map((t, i) => (
            <span key={t} className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
              i===0?"bg-amber-100 text-amber-700":i===1?"bg-orange-100 text-orange-700":"bg-yellow-100 text-yellow-700"
            }`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
  const confBack = (
    <div style={suggestionStyle("linear-gradient(135deg,#d97706,#f59e0b)")} className="p-5 flex flex-col justify-between h-full text-center">
      <div>
        <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
        <p className="text-white font-bold text-sm mb-3">Boost your confidence</p>
        <div className="space-y-2">
          {["Re-attempt quizzes you scored below 70%", "Teach the topic back to yourself (Feynman)", "Track wins daily in your journal"].map((s, i) => (
            <div key={i} className="bg-white/20 rounded-xl p-2.5">
              <p className="text-white text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── 5. Completion Rate — donut small card ── */
  const compFront = (
    <div style={cardStyle} className="p-5 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-rose-500" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Completion Rate</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-4xl font-black text-foreground">91<span className="text-xl text-foreground/40">%</span></p>
          <p className="text-xs text-muted-foreground mt-1">Tasks done this week</p>
          <div className="flex items-center gap-1 mt-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 text-xs font-semibold">+5% vs last week</span>
          </div>
        </div>
        <Gauge value={91} size={76} color="#f43f5e" />
      </div>
      <div className="mt-3 flex gap-1.5">
        <div className="flex-1 bg-rose-100 rounded-full h-1.5 overflow-hidden">
          <motion.div className="h-full bg-rose-500 rounded-full"
            initial={{ width: 0 }} animate={{ width: "91%" }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.4 }} />
        </div>
      </div>
    </div>
  );
  const compBack = (
    <div style={suggestionStyle("linear-gradient(135deg,#e11d48,#f43f5e)")} className="p-5 flex flex-col justify-between h-full">
      <div>
        <CheckCircle2 className="w-6 h-6 text-white mb-2" />
        <p className="text-white font-bold text-sm mb-3">Maintain your 91%</p>
        <div className="space-y-2">
          {["Start tasks within 5 min of session start", "Break big topics into ≤3 subtasks", "Mark done immediately for dopamine hit"].map((s, i) => (
            <div key={i} className="flex gap-2 bg-white/20 rounded-xl p-2.5">
              <span className="text-white font-bold text-xs w-4">{i+1}.</span>
              <p className="text-white/90 text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── 6. Streak Tracker — wide banner ── */
  const streakFront = (
    <div style={{...cardStyle, background:"linear-gradient(135deg,hsl(160,23%,25%) 0%,hsl(30,60%,50%) 100%)"}} className="p-5 flex items-center justify-between h-full overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_,i)=><div key={i} className="absolute w-32 h-32 rounded-full border-2 border-white" style={{right:-40+i*18,top:-30+i*8}} />)}
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-5 h-5 text-amber-300" />
          <span className="text-white font-bold">7-Day Streak</span>
          <span className="text-amber-300 text-lg">🔥</span>
        </div>
        <p className="text-white/60 text-xs">You haven&apos;t missed a day this week!</p>
      </div>
      <div className="flex gap-2 relative z-10">
        {streakDays.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08 + 0.3, type: "spring", stiffness: 400 }}
              className="w-9 h-9 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
            </motion.div>
            <span className="text-white/60 text-[9px] font-semibold">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
  const streakBack = (
    <div style={suggestionStyle("linear-gradient(135deg,hsl(160,40%,20%),hsl(30,70%,45%))")} className="p-5 flex items-center justify-between h-full">
      <div>
        <p className="text-white font-bold text-sm mb-2">🏆 Next Milestone</p>
        <p className="text-white/90 text-xs mb-1">Reach a <span className="font-bold">14-day streak</span> to unlock</p>
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Deep Focus Badge</span>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl">🎯</div>
        <p className="text-white/60 text-[10px] mt-2">7 days to go</p>
      </div>
    </div>
  );

  /* ── 7. Weekly Trend — large full-width area chart ── */
  const maxV = Math.max(...weeklyData);
  const chartH = 100;
  const chartW = 500;
  const padX = 20;
  const padTop = 14;
  const padBottom = 30;
  const svgW = chartW + padX * 2;
  const svgH = chartH + padTop + padBottom;
  const axisMax = Math.max(100, maxV);
  const stepX = chartW / (weeklyData.length - 1);
  const baselineY = padTop + chartH;
  const pts = weeklyData.map((v, i) => ({
    x: padX + i * stepX,
    y: padTop + (1 - v / axisMax) * chartH,
  }));
  const pathD = `M ${pts.map(p=>`${p.x},${p.y}`).join(" L ")}`;
  const fillD = `M ${pts[0].x},${pts[0].y} L ${pts.map(p=>`${p.x},${p.y}`).join(" L ")} L ${pts[pts.length-1].x},${baselineY} L ${pts[0].x},${baselineY} Z`;

  return (
    <main className="flex-1 overflow-y-auto px-5 pb-8 demo-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-primary" /> Personal Insights
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Tap any card to see AI-powered improvement tips</p>
        </div>
        <div className="flex gap-2">
          {["7 days", "30 days", "3 months"].map((t, i) => (
            <button key={t} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${i===0?"bg-primary text-white":"bg-white/70 text-foreground/60 hover:bg-white"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/*
        BENTO GRID — varied sizes
        Row 1: [Attention Span 2/3] [Learning Time 1/3]
        Row 2: [Consistency 5/8]   [Confidence 3/8]
        Row 3: [Streak 2/3]        [Completion 1/3]
        Row 4: Weekly Chart full
      */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>

        {/* Row 1 col 1-2: Attention Span */}
        <div style={{ gridColumn: "1/3", height: 200 }}>
          <FlipCard front={attentionFront} back={attentionBack} className="w-full h-full" />
        </div>

        {/* Row 1 col 3: Learning Time (tall, spans 2 rows) */}
        <div style={{ gridColumn: "3/4", gridRow: "1/3", height: 424 }}>
          <FlipCard front={learnFront} back={learnBack} className="w-full h-full" />
        </div>

        {/* Row 2 col 1-2: Consistency */}
        <div style={{ gridColumn: "1/3", height: 220 }}>
          <FlipCard front={consFront} back={consBack} className="w-full h-full" />
        </div>

        {/* Row 3 col 1: Streak (wide) */}
        <div style={{ gridColumn: "1/2", height: 110 }}>
          <FlipCard front={streakFront} back={streakBack} className="w-full h-full" />
        </div>

        {/* Row 3 col 2: Confidence */}
        <div style={{ gridColumn: "2/3", height: 200 }}>
          <FlipCard front={confFront} back={confBack} className="w-full h-full" />
        </div>

        {/* Row 3 col 3: Completion */}
        <div style={{ gridColumn: "3/4", height: 200 }}>
          <FlipCard front={compFront} back={compBack} className="w-full h-full" />
        </div>

        {/* Row 4: Weekly Trend Chart */}
        <div style={{ gridColumn: "1/4" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-3xl p-5"
            style={cardStyle}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-foreground text-base">Weekly Study Activity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Productivity score across all subjects</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Score %</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160,23%,25%)" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(160,23%,25%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map(g => (
                  <line key={g}
                    x1={padX} y1={padTop + (1 - g / axisMax) * chartH}
                    x2={padX + chartW} y2={padTop + (1 - g / axisMax) * chartH}
                    stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="4,4"
                  />
                ))}
                {/* Area fill */}
                <path d={fillD} fill="url(#areaGrad)" />
                {/* Line */}
                <motion.path d={pathD} fill="none" stroke="hsl(160,23%,25%)" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                />
                {/* Dots + labels */}
                {pts.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="hsl(160,23%,25%)" strokeWidth="2.5" />
                    <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9" fill="hsl(160,23%,25%)" fontWeight="700">
                      {weeklyData[i]}%
                    </text>
                    <text x={p.x} y={baselineY + 18} textAnchor="middle" fontSize="10" fill="hsl(160,10%,50%)" fontWeight="600">
                      {weekDays[i]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
