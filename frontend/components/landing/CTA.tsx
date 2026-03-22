import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA({ onOpenSignup }: { onOpenSignup: () => void }) {
  return (
    <section className="py-32 relative border-t border-primary/10 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Ready to study smarter?
          </h2>
          <p className="text-xl text-text-description mb-10 max-w-2xl mx-auto">
            Start with Prominder and get an AI-powered timetable that adapts as your semester evolves.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto px-12 py-6 text-lg bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-neumorphic"
              onClick={onOpenSignup}
            >
              Get Started Free
            </Button>
            <span className="text-sm text-text-description">No credit card required. Designed for students.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
