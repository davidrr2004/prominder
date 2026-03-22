"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { BookOpenCheck, GraduationCap, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

type AuthMode = "signin" | "signup";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInPageFallback />}>
      <SignInPageContent />
    </Suspense>
  );
}

function SignInPageFallback() {
  return <main className="min-h-screen bg-background" />;
}

function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = useMemo<AuthMode>(() => {
    return searchParams.get("mode") === "signup" ? "signup" : "signin";
  }, [searchParams]);
  const [mode, setMode] = useState<AuthMode>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    router.replace(`/signin?mode=${nextMode}`);
  };

  const isSignIn = mode === "signin";
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden rounded-3xl border border-primary/15 bg-white/45 shadow-neumorphic-lg">
        <section className="hidden lg:flex lg:w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-secondary/80" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
            <div>
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/40">
                  <Image src="/images/app-icon.png" alt="Prominder logo" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <span className="text-xl font-bold">Prominder</span>
              </Link>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold leading-tight">
                Welcome back to your
                <br />
                smarter study routine
              </h1>
              <p className="max-w-md text-white/90 text-base leading-relaxed">
                Plan exams, track progress, and stay consistent with AI-powered guidance designed for students.
              </p>

              <div className="grid grid-cols-1 gap-3 max-w-md">
                <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-md">
                  <BookOpenCheck className="h-5 w-5" />
                  <span className="text-sm">Adaptive study timetables</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-md">
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-sm">Exam-focused recommendations</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-md">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm">Private and secure by default</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/80">Built for students who want consistency without burnout.</p>
          </div>
        </section>

        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md h-[640px] max-h-[80vh] flex flex-col">
            <div className="inline-flex w-full rounded-full border border-primary/20 bg-white/55 p-1 shadow-neumorphic">
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className={`w-1/2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isSignIn ? "bg-primary text-white" : "text-foreground hover:bg-primary/10"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`w-1/2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  !isSignIn ? "bg-primary text-white" : "text-foreground hover:bg-primary/10"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="space-y-2 mt-7">
              <p className="text-sm font-medium text-text-description">{isSignIn ? "Sign in" : "Create account"}</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">
                {isSignIn ? "Continue your study plan" : "Start your smarter study journey"}
              </h2>
              <p className="text-sm text-text-description">
                {isSignIn
                  ? "Use your account credentials to access your timetable."
                  : "Create your account to generate AI-powered timetables and stay organized."}
              </p>
            </div>

            <div className="mt-7 flex-1 overflow-hidden">
              <motion.div
                className="flex h-full w-[200%]"
                animate={{ x: isSignIn ? "0%" : "-50%" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 280, damping: 30, mass: 0.8 }
                }
              >
                <form className="h-full w-1/2 pr-2 space-y-5" aria-hidden={!isSignIn}>
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@college.edu"
                      autoComplete="email"
                      disabled={!isSignIn}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <button type="button" className="text-xs text-primary hover:underline" disabled={!isSignIn}>
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={!isSignIn}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <InteractiveHoverButton type="button" text="Sign In" className="w-full" disabled={!isSignIn} />
                    <InteractiveHoverButton
                      type="button"
                      text="Sign Up"
                      className="w-full"
                      onClick={() => switchMode("signup")}
                    />
                  </div>
                </form>

                <form className="h-full w-1/2 pl-2 pr-2 space-y-5 overflow-y-auto demo-scrollbar" aria-hidden={isSignIn}>
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" type="text" placeholder="Alex Johnson" autoComplete="name" disabled={isSignIn} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@college.edu"
                      autoComplete="email"
                      disabled={isSignIn}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      disabled={isSignIn}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      disabled={isSignIn}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <InteractiveHoverButton
                      type="button"
                      text="Create Account"
                      className="w-full"
                      dotClassName="left-[10%] top-1/2 -translate-y-1/2 group-hover:translate-y-0"
                      disabled={isSignIn}
                    />
                    <InteractiveHoverButton
                      type="button"
                      text="Sign In"
                      className="w-full"
                      onClick={() => switchMode("signin")}
                    />
                  </div>
                </form>
              </motion.div>
            </div>

            <div className="relative py-2 mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-primary/15" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wide text-text-description">
                <span className="bg-background px-3">Student-first platform</span>
              </div>
            </div>

            <p className="text-sm text-text-description text-center">
              {isSignIn ? "New to Prominder? " : "Already have an account? "}
              <button
                type="button"
                className="text-primary font-semibold hover:underline"
                onClick={() => switchMode(isSignIn ? "signup" : "signin")}
              >
                {isSignIn ? "Create an account" : "Sign in instead"}
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
