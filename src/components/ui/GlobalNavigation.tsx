"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export default function GlobalNavigation() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md py-4 border-b border-[var(--border-subtle)]' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            <span className="text-white font-display font-medium tracking-widest text-sm">SPILLTRACE AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-[0.2em] text-[var(--text-secondary)]">
            <a href="#" className="hover:text-white transition-colors">INVESTIGATE</a>
            <a href="#" className="hover:text-white transition-colors">ANALYTICS</a>
            <a href="#" className="hover:text-white transition-colors">RESPONSE</a>
            <a href="#" className="hover:text-white transition-colors">ABOUT</a>
          </div>

          <div>
            <button className="text-[10px] font-mono tracking-widest px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-secondary)] transition-colors rounded">
              START INVESTIGATION
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Vertical Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4">
        <div className="h-32 w-px bg-[var(--border-subtle)] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-[var(--accent-cyan)] origin-top"
            style={{ scaleY: scrollYProgress, bottom: 0 }}
          />
        </div>
        <span className="text-[9px] font-mono text-[var(--text-tertiary)] tracking-widest" style={{ writingMode: 'vertical-rl' }}>
          SCROLL PROGRESS
        </span>
      </div>
    </>
  );
}
