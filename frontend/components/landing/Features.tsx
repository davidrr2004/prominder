import { motion } from "framer-motion";
import { BrainCircuit, MessageCircle, RefreshCcw, ScanLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "Chat-Based Study Planning",
    description:
      "Describe your subjects, available hours, and exam timeline in simple language. Prominder turns it into a clean weekly plan.",
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-secondary" />,
    title: "Adaptive Timetable Generation",
    description:
      "Prominder prioritizes difficult subjects, balances your workload, and recalculates your timetable as your progress changes.",
  },
  {
    icon: <ScanLine className="w-6 h-6 text-accent" />,
    title: "Exam Schedule OCR",
    description:
      "Upload a photo of your exam timetable or syllabus and let Prominder extract key dates automatically.",
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-tertiary" />,
    title: "Smart Rescheduling",
    description:
      "Missed a study block? Prominder quickly reorganizes your remaining week so you stay on track without stress.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Everything you need to plan smarter
          </h2>
          <p className="text-text-description text-lg">
            Replace rigid planners with an AI assistant that builds study plans, adapts when life changes, and keeps
            your exam prep consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/30 border-primary/20 hover:border-primary/40 hover:bg-white/50 transition-all duration-300 shadow-neumorphic">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-neumorphic">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-description leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
