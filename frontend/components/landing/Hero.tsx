import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ onOpenSignup }: { onOpenSignup: () => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-8 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/Untitled design.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 z-10 " aria-hidden="true" />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-background/28 via-background/10 to-background/55"
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center max-w-3xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground leading-tight"
            >
              Plan Smarter,
              <br />
              Study Better
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-text-description mb-10 max-w-lg leading-relaxed"
            >
              Prominder is your AI study companion. Chat to build your timetable, upload exam schedules, and get
              adaptive plans that keep you consistent and organized.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                size="lg"
                onClick={onOpenSignup}
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-3 shadow-neumorphic group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-primary hover:bg-primary/5 text-primary font-semibold rounded-full px-8 py-3"
              >
                See Details
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
