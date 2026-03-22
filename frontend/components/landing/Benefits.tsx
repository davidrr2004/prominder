import { motion } from "framer-motion";
import { Clock, HeartPulse, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Save Hours Every Week",
    desc: "Stop manually dragging study blocks around. Prominder builds your plan in seconds so you can start studying faster.",
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-highlight-error" />,
    title: "Reduce Exam Stress",
    desc: "Know exactly what to study next and when. Remove planning fatigue and focus on execution.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-secondary" />,
    title: "Improve Consistency",
    desc: "Use adaptive reminders and evolving plans that match your pace so you keep momentum throughout the semester.",
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/30 border border-primary/20 hover:bg-white/50 transition-all shadow-neumorphic"
            >
              <div className="mb-6 p-4 rounded-2xl bg-primary/10 shadow-neumorphic">{benefit.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
              <p className="text-text-description leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
