"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNavigation() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--surface-glass)] backdrop-blur-md py-4 border-b border-[var(--border-subtle)] shadow-[var(--shadow-elegant)]' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            <span className="text-[var(--text-primary)] font-display font-medium tracking-widest text-sm">SPILLTRACE AI</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-[0.2em] text-[var(--text-secondary)]">
            <Link href="/investigate" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/investigate' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>INVESTIGATE</Link>
            <Link href="/analytics" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/analytics' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>ANALYTICS</Link>
            <Link href="/response" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/response' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>RESPONSE</Link>
            <Link href="/about" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/about' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>ABOUT</Link>
          </div>

          <div>
            <Link href="/investigate" className="btn-primary">
              START INVESTIGATION
            </Link>
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
