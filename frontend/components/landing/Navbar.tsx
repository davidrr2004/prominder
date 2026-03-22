"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLogin: () => void;
  onGetStarted: () => void;
}

export function Navbar({ onLogin, onGetStarted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const y = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && y > 70) return true;
        if (prev && y < 30) return false;
        return prev;
      });
      ticking = false;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home",         href: "hero" },
    { label: "How it Works", href: "how-it-works" },
    { label: "Services",     href: "features" },
    { label: "Connect",      href: "footer" },
  ];

  const spring = { type: "spring" as const, stiffness: 170, damping: 28, mass: 1 };

  /* ──────────────────────────────────────────────────
   * Strategy: Two separate containers — flat row and
   * pill. Each group (logo, links, actions) has the
   * SAME layoutId in both. framer-motion tracks each
   * group's real screen position and physically
   * animates it from one container to the other.
   * The flat row is hidden (visibility:hidden) when
   * scrolled so it doesn't show, but still takes up
   * space to reserve the header height.
   * ──────────────────────────────────────────────────*/

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

        {/* ───── DESKTOP ───── */}
        <LayoutGroup>
          <div className="hidden lg:block">

            {/* ── FLAT ROW (always in DOM, invisible when scrolled) ── */}
            {/* This reserves the header height and provides the source positions */}
            <div
              className="flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-8 py-4 pointer-events-auto"
              style={{ visibility: isScrolled ? "hidden" : "visible" }}
            >
              {/* Logo */}
              <motion.div
                layoutId="nav-logo"
                transition={spring}
                className="flex items-center gap-2.5 select-none flex-shrink-0"
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-primary/20 bg-white/60 shadow-neumorphic flex-shrink-0">
                  <Image src="/images/app-icon.png" alt="Prominder" width={36} height={36} className="w-full h-full object-cover" priority />
                </div>
                <span className="text-lg font-bold text-foreground whitespace-nowrap">Prominder</span>
              </motion.div>

              {/* Nav links */}
              <motion.div
                layoutId="nav-links"
                transition={spring}
                className="flex items-center gap-0.5"
              >
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-foreground/75 hover:text-primary font-medium px-4 py-2 rounded-xl hover:bg-white/40 transition-all text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>

              {/* Action buttons */}
              <motion.div
                layoutId="nav-actions"
                transition={spring}
                className="flex items-center gap-2 flex-shrink-0"
              >
                <button
                  type="button"
                  onClick={onLogin}
                  className="flex items-center gap-1.5 text-foreground/75 hover:text-primary font-medium px-4 py-2 rounded-xl hover:bg-white/40 transition-all text-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </button>
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full shadow-neumorphic hover:bg-primary/90 hover:scale-105 transition-all"
                >
                  Get Started
                </button>
              </motion.div>
            </div>

            {/* ── PILL (centered, appears when scrolled) ── */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  key="pill-wrapper"
                  className="absolute top-0 left-0 right-0 flex justify-center pointer-events-auto"
                  style={{ paddingTop: 10 }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                >
                  {/* Pill background */}
                  <motion.div
                    className="flex items-center gap-1 relative"
                    style={{
                      padding: "8px 10px",
                      borderRadius: 9999,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.86) 0%, rgba(255,255,255,0.60) 55%, rgba(58,90,64,0.09) 100%)",
                      backdropFilter: "blur(7px)",
                      WebkitBackdropFilter: "blur(7px)",
                      border: "1px solid rgba(255,255,255,0.74)",
                      boxShadow:
                        "0 8px 36px rgba(0,0,0,0.10), 0 1.5px 0 rgba(255,255,255,0.95) inset, 0 -1px 0 rgba(0,0,0,0.04) inset",
                    }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={spring}
                  >
                    {/* Logo inside pill */}
                    <motion.div
                      layoutId="nav-logo"
                      transition={spring}
                      className="flex items-center gap-2 pl-1 pr-2.5 select-none flex-shrink-0"
                    >
                      <div className="w-7 h-7 rounded-xl overflow-hidden border border-primary/15 flex-shrink-0">
                        <Image src="/images/app-icon.png" alt="Prominder" width={28} height={28} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-bold text-foreground/90 tracking-tight whitespace-nowrap">Prominder</span>
                    </motion.div>

                    <div className="w-px h-4 bg-primary/20 mx-1 flex-shrink-0" />

                    {/* Nav links inside pill */}
                    <motion.div
                      layoutId="nav-links"
                      transition={spring}
                      className="flex items-center"
                      style={{ gap: 2 }}
                    >
                      {navItems.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => scrollToSection(item.href)}
                          className="text-foreground/70 hover:text-primary font-medium text-sm px-3.5 py-1.5 rounded-full hover:bg-white/70 transition-all whitespace-nowrap"
                        >
                          {item.label}
                        </button>
                      ))}
                    </motion.div>

                    <div className="w-px h-4 bg-primary/20 mx-1 flex-shrink-0" />

                    {/* Action buttons inside pill */}
                    <motion.div
                      layoutId="nav-actions"
                      transition={spring}
                      className="flex items-center gap-2 flex-shrink-0"
                    >
                      <button
                        type="button"
                        onClick={onLogin}
                        className="flex items-center gap-1.5 text-foreground/70 hover:text-primary font-medium text-sm px-3.5 py-1.5 rounded-full hover:bg-white/70 transition-all"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={onGetStarted}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-4 py-1.5 rounded-full shadow-sm hover:scale-105 transition-all"
                      >
                        Get Started
                      </button>
                    </motion.div>

                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </LayoutGroup>

        {/* ── MOBILE HEADER ── */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-primary/25 bg-white/60 shadow-neumorphic">
              <Image src="/images/app-icon.png" alt="Prominder" width={36} height={36} className="w-full h-full object-cover" priority />
            </div>
            <span className="text-lg font-bold text-foreground">Prominder</span>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-b border-primary/10 px-4 py-4 space-y-4"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-primary/10 space-y-2">
              <Button variant="ghost" size="sm" type="button" onClick={onLogin}
                className="w-full justify-center text-foreground bg-white/45 border border-primary/20">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button size="sm" type="button" onClick={onGetStarted}
                className="w-full bg-primary text-white font-semibold rounded-full shadow-neumorphic">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
