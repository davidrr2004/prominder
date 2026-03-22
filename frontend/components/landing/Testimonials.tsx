import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I used to spend hours color-coding my planner. Now I just tell Prominder my exam dates and my week is organized in minutes.",
    name: "Sarah Jenkins",
    role: "Pre-Med Student, UCLA",
    gradient: "from-primary to-secondary",
  },
  {
    quote:
      "Adaptive rescheduling is a lifesaver. When I miss a study session, Prominder rebalances everything without overwhelming me.",
    name: "Marcus Chen",
    role: "Computer Science, MIT",
    gradient: "from-secondary to-tertiary",
  },
  {
    quote:
      "The OCR exam import is brilliant. I upload my schedule once and Prominder maps out my revision plan automatically.",
    name: "Elena Rodriguez",
    role: "Law Student, NYU",
    gradient: "from-accent to-highlight-error",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Loved by focused students</h2>
          <p className="text-text-description text-lg">Join students planning smarter with Prominder AI.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/40 backdrop-blur-sm border border-primary/20 p-8 rounded-3xl relative shadow-neumorphic"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              <p className="text-foreground text-lg leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-lg shadow-neumorphic`}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t.name}</h4>
                  <p className="text-sm text-text-description">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
