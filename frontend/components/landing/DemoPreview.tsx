import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  MessageSquare,
  MoreHorizontal,
  Send,
} from "lucide-react";

export function DemoPreview() {
  return (
    <section className="py-12 relative z-20 -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl border border-primary/20 bg-white/40 backdrop-blur-2xl shadow-neumorphic-lg overflow-hidden flex flex-col md:flex-row min-h-[680px]"
        >
          <div className="md:hidden w-full h-12 bg-primary/5 border-b border-primary/20 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          <div className="w-full md:w-1/3 border-r border-primary/20 flex flex-col bg-white/20">
            <div className="h-16 border-b border-primary/20 flex items-center px-6">
              <MessageSquare className="w-5 h-5 text-primary mr-3" />
              <span className="font-semibold text-foreground">Prominder Assistant</span>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto demo-scrollbar">
              <div className="flex flex-col items-end">
                <div className="bg-primary/20 text-primary border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[90%] text-sm">
                  I have 3 exams next week: Calculus, Physics, and History. Can you make a plan? I can study 4 hours a
                  day.
                </div>
                <span className="text-xs text-text-description mt-2">Just now</span>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-white/60 border border-primary/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[95%] text-sm leading-relaxed text-foreground">
                  I have generated a focused study plan for you. <br />
                  <br />
                  I prioritized <strong>Calculus</strong> as it historically requires more practice time, and scheduled
                  lighter review blocks for <strong>History</strong>.
                  <br />
                  <br />
                  Let me know if you want to adjust the hours!
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-primary/20">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask for adjustments..."
                  className="w-full bg-white/60 border border-primary/20 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-primary/50 text-foreground placeholder-text-description"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary rounded-lg text-white shadow-neumorphic">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col bg-white/30">
            <div className="h-16 border-b border-primary/20 flex items-center justify-between px-8">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">This Week&apos;s Plan</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-description">
                <span>Oct 12 - Oct 18</span>
                <MoreHorizontal className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 p-8 overflow-auto demo-scrollbar">
              <div className="grid grid-cols-5 gap-4 h-full min-w-[500px]">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-text-description mb-4">
                    {day}
                  </div>
                ))}

                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 h-24 relative overflow-hidden group shadow-neumorphic">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    <p className="text-xs font-semibold text-primary mb-1">Calculus II</p>
                    <p className="text-[10px] text-text-description">9:00 - 11:00 AM</p>
                    <p className="text-[10px] text-foreground/70 mt-1">Practice sets Ch 4</p>
                  </div>
                  <div className="bg-white/50 border border-primary/20 rounded-xl p-3 h-16 shadow-neumorphic">
                    <p className="text-xs font-semibold text-foreground mb-1">History Review</p>
                    <p className="text-[10px] text-text-description">2:00 - 3:00 PM</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-secondary/15 border border-secondary/30 rounded-xl p-3 h-32 relative overflow-hidden shadow-neumorphic">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
                    <p className="text-xs font-semibold text-secondary mb-1">Physics Lab</p>
                    <p className="text-[10px] text-text-description">10:00 - 1:00 PM</p>
                    <p className="text-[10px] text-foreground/70 mt-1">Kinematics Review</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 h-24 relative overflow-hidden group shadow-neumorphic">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                    <p className="text-xs font-semibold text-primary mb-1">Calculus II</p>
                    <p className="text-[10px] text-text-description">9:00 - 11:00 AM</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 flex items-center gap-2 shadow-neumorphic">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-700 font-medium">Task Done</span>
                  </div>
                </div>

                <div className="space-y-3 pt-12">
                  <div className="bg-white/50 border border-primary/20 rounded-xl p-3 h-20 shadow-neumorphic">
                    <p className="text-xs font-semibold text-foreground mb-1">History Essay</p>
                    <p className="text-[10px] text-text-description">1:00 - 3:00 PM</p>
                  </div>
                  <div className="bg-secondary/15 border border-secondary/30 rounded-xl p-3 h-24 relative overflow-hidden shadow-neumorphic">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
                    <p className="text-xs font-semibold text-secondary mb-1">Physics Prep</p>
                    <p className="text-[10px] text-text-description">4:00 - 6:00 PM</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-accent/15 border border-accent/30 rounded-xl p-3 h-32 relative overflow-hidden shadow-neumorphic">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                    <p className="text-xs font-semibold text-accent mb-1">Mock Exam</p>
                    <p className="text-[10px] text-text-description">9:00 - 12:00 PM</p>
                    <p className="text-[10px] text-foreground/70 mt-1">Calculus Full Test</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
