"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Maximize, Search } from "lucide-react";

export default function GlobalNavigation() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--surface-glass)] backdrop-blur-md py-3 border-b border-[var(--border-subtle)] shadow-[var(--shadow-elegant)]' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative flex items-center justify-center shrink-0">
              <img 
                src="/logo.png" 
                alt="SpillTrace AI Logo" 
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]" 
              />
              <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${isLive ? 'bg-[var(--risk-critical)]' : 'bg-[var(--accent-cyan)]'} animate-pulse`} />
            </div>
            <span className="text-[var(--text-primary)] font-display font-bold tracking-widest text-sm sm:text-base group-hover:text-[#00F0FF] transition-colors whitespace-nowrap">
              SPILLTRACE <span className="text-[#00F0FF]">AI</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[10px] font-mono tracking-[0.2em] text-[var(--text-secondary)] whitespace-nowrap">
            <Link href="/investigate" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/investigate' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>INVESTIGATE</Link>
            <Link href="/analytics" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/analytics' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>ANALYTICS</Link>
            <Link href="/response" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/response' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>RESPONSE</Link>
            <Link href="/about" className={`hover:text-[var(--accent-ocean)] transition-colors ${pathname === '/about' ? 'text-[var(--accent-ocean)] font-bold' : ''}`}>ABOUT</Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Live/Demo Toggle */}
            <button 
              onClick={() => setIsLive(!isLive)}
              className={`hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest px-2 py-1 rounded border transition-colors ${isLive ? 'border-[var(--risk-critical)] text-[var(--risk-critical)]' : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'}`}
            >
              {isLive ? 'LIVE' : 'DEMO'}
            </button>

            {/* Command Palette Hint */}
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--bg-secondary)] px-2 py-1 rounded border border-[var(--border-subtle)]">
              <Search size={12} />
              <span>CTRL+K</span>
            </div>

            {/* Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            >
              <Maximize size={16} />
            </button>

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
