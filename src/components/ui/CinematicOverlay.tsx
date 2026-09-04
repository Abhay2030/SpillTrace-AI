"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP ScrollTrigger setup to fade in chapters
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".chapter-panel") as HTMLElement[];
      
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".content"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: panel,
              start: "top center",
              end: "center center",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10 pointer-events-none">
      
      {/* Chapter 00: Landing Hero */}
      <section className="chapter-panel h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-[var(--accent-cyan)] tracking-[0.2em] mb-4">ANOMALY DETECTED</p>
          <h1 className="text-5xl md:text-7xl font-display font-medium text-white mb-2 tracking-tight">
            SPILLTRACE AI
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-lg mb-8">
            FROM SPACE TO SUSPECT.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-[var(--accent-cyan)] text-[var(--bg-primary)] font-medium text-sm rounded uppercase tracking-wider hover:bg-white transition-colors">
              Start Investigation
            </button>
            <button className="px-6 py-3 border border-[var(--border-subtle)] text-white font-medium text-sm rounded uppercase tracking-wider hover:bg-[var(--bg-secondary)] transition-colors">
              Explore How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Chapter 01: Detect */}
      <section className="chapter-panel h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-[var(--accent-cyan)] tracking-[0.2em] mb-4">01 / DETECT</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-4 tracking-tight max-w-xl">
            THE OCEAN LEAVES EVIDENCE.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md">
            Something changed at sea. The satellite found it. Now find where it came from.
          </p>
        </div>
      </section>
      
      {/* Chapter 02: Trace */}
      <section className="chapter-panel h-[150vh] flex items-center justify-end text-right px-12 md:px-24">
        <div className="content pointer-events-auto max-w-xl">
          <p className="text-xs font-mono text-[var(--accent-cyan)] tracking-[0.2em] mb-4">02 / TRACE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-4 tracking-tight">
            REWIND THE OCEAN.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light ml-auto">
            Reverse environmental factors to reconstruct historical particle movement.
          </p>
        </div>
      </section>

      {/* Chapter 03: Correlate */}
      <section className="chapter-panel h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-[var(--accent-cyan)] tracking-[0.2em] mb-4">03 / CORRELATE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-4 tracking-tight max-w-xl">
            ELIMINATE NOISE.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md">
            247 vessels were present. Only 3 match the origin probability corridor.
          </p>
        </div>
      </section>

      {/* Chapter 04: Attribute */}
      <section className="chapter-panel h-[150vh] flex items-center justify-center text-center px-12 md:px-24">
        <div className="content pointer-events-auto max-w-2xl">
          <p className="text-xs font-mono text-[var(--accent-cyan)] tracking-[0.2em] mb-4">04 / ATTRIBUTE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white mb-4 tracking-tight">
            WHO COULD BE THE SOURCE?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light mx-auto">
            Every ranking is supported by verifiable geospatial factors.
          </p>
        </div>
      </section>

      {/* Blank space to scroll past the end */}
      <div className="h-[50vh]" />
    </div>
  );
}
