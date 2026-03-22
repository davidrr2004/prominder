"use client";

import { useRouter } from "next/navigation";
import { Benefits } from "@/components/landing/Benefits";
import { CTA } from "@/components/landing/CTA";
import { DemoPreview } from "@/components/landing/DemoPreview";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Navbar } from "@/components/landing/Navbar";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  const router = useRouter();

  const onLoginClick = () => {
    router.push("/signin?mode=signin");
  };

  const onGetStartedClick = () => {
    router.push("/signin?mode=signup");
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar onLogin={onLoginClick} onGetStarted={onGetStartedClick} />

      <main>
        <Hero onOpenSignup={onGetStartedClick} />
        <DemoPreview />
        <Features />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <CTA onOpenSignup={onGetStartedClick} />
      </main>

      <Footer />
    </div>
  );
}
