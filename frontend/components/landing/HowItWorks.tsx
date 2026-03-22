import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Tell Prominder your goals",
    desc: "Share your subjects, exam dates, and preferred study hours through a simple conversational flow.",
  },
  {
    num: "02",
    title: "Get your personalized timetable",
    desc: "Receive a balanced weekly study plan that prioritizes your hardest subjects and upcoming deadlines.",
  },
  {
    num: "03",
    title: "Adapt when plans change",
    desc: "If you miss sessions or fall behind, Prominder reshapes your plan so you can recover without burnout.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-background relative border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground"
            >
              How it works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-description text-lg mb-8"
            >
              We simplified study planning into three intuitive steps so you can focus on learning instead of manual
              calendar management.
            </motion.p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white/40 border-4 border-background shadow-neumorphic-lg flex items-center justify-center mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl font-display font-bold text-primary">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-text-description text-sm leading-relaxed max-w-[250px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
