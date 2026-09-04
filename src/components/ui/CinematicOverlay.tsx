"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

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
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">MARITIME INCIDENT INTELLIGENCE</p>
          <h1 className="text-5xl md:text-7xl font-display font-medium text-[var(--text-primary)] mb-2 tracking-tight">
            SPILLTRACE AI
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-lg mb-8">
            FROM SPACE TO SUSPECT.
          </p>
          <div className="flex gap-4">
            <Link href="/investigate" className="btn-primary pointer-events-auto">
              Start Investigation
            </Link>
            <Link href="/about" className="btn-secondary pointer-events-auto">
              Explore How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Chapter 01: Detect */}
      <section className="chapter-panel chapter-01 h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">01 / DETECT</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight max-w-xl">
            THE OCEAN LEAVES EVIDENCE.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md">
            Something changed at sea. The satellite found it. Now find where it came from.
          </p>
        </div>
      </section>
      
      {/* Chapter 02: Trace */}
      <section className="chapter-panel chapter-02 h-[150vh] flex items-center justify-end text-right px-12 md:px-24">
        <div className="content pointer-events-auto max-w-xl">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">02 / TRACE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight">
            REWIND THE OCEAN.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light ml-auto">
            Reverse environmental factors to reconstruct historical particle movement.
          </p>
        </div>
      </section>

      {/* Chapter 03: Correlate */}
      <section className="chapter-panel chapter-03 h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">03 / CORRELATE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight max-w-xl">
            ELIMINATE NOISE.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md">
            247 vessels were present. Only 3 match the origin probability corridor.
          </p>
        </div>
      </section>

      {/* Chapter 04: Attribute */}
      <section className="chapter-panel chapter-04 h-[150vh] flex items-center justify-center text-center px-12 md:px-24">
        <div className="content pointer-events-auto max-w-2xl">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">04 / ATTRIBUTE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight">
            WHO COULD BE THE SOURCE?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light mx-auto">
            Every ranking is supported by verifiable geospatial factors.
          </p>
        </div>
      </section>

      {/* Chapter 05: Explain */}
      <section className="chapter-panel chapter-05 h-[150vh] flex items-center justify-end text-right px-12 md:px-24">
        <div className="content pointer-events-auto max-w-xl">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">05 / EXPLAIN</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight">
            WHY THIS VESSEL?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light ml-auto">
            TIME MATCH. SPATIAL MATCH. DRIFT MATCH.
          </p>
        </div>
      </section>

      {/* Chapter 06: Assess */}
      <section className="chapter-panel chapter-06 h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">06 / ASSESS</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight max-w-xl">
            PREDICT THE THREAT.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md">
            <span className="text-critical">ECOLOGICAL: HIGH</span>. COASTAL: MEDIUM. FISHERIES: HIGH.
          </p>
        </div>
      </section>

      {/* Chapter 07: Respond */}
      <section className="chapter-panel chapter-07 h-[150vh] flex items-center justify-center text-center px-12 md:px-24">
        <div className="content pointer-events-auto max-w-2xl">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">07 / RESPOND</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight">
            FROM INTELLIGENCE TO ACTION.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light mx-auto">
            RECOMMENDED RESPONSE OPTIONS
          </p>
        </div>
      </section>

      {/* Chapter 08: Simulate */}
      <section className="chapter-panel chapter-08 h-[150vh] flex items-center px-12 md:px-24">
        <div className="content pointer-events-auto">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">08 / SIMULATE</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight max-w-xl">
            DIGITAL TWIN.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md">
            COMPARE SCENARIOS BEFORE DEPLOYMENT.
          </p>
        </div>
      </section>

      {/* Chapter 09: Monitor */}
      <section className="chapter-panel chapter-09 h-[150vh] flex items-center justify-end text-right px-12 md:px-24">
        <div className="content pointer-events-auto max-w-xl">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">09 / MONITOR</p>
          <h2 className="text-4xl md:text-6xl font-display font-medium text-[var(--text-primary)] mb-4 tracking-tight">
            CONTINUOUS MONITORING.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light ml-auto">
            NEW SATELLITE OBSERVATION. UPDATE SPILL.
          </p>
        </div>
      </section>

      {/* Final Hero */}
      <section className="chapter-panel chapter-10 h-[150vh] flex items-center justify-center text-center px-12 md:px-24">
        <div className="content pointer-events-auto max-w-2xl">
          <p className="text-xs font-mono text-cyan tracking-[0.2em] mb-4">END-TO-END INTELLIGENCE</p>
          <h1 className="text-5xl md:text-7xl font-display font-medium text-[var(--text-primary)] mb-2 tracking-tight">
            SPILLTRACE AI
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-lg mx-auto mb-8">
            FROM SPACE TO SUSPECT.
          </p>
          <div className="flex justify-center">
            <Link href="/investigate" className="btn-primary pointer-events-auto">
              Start an Investigation
            </Link>
          </div>
        </div>
      </section>

      {/* Blank space to scroll past the end */}
      <div className="h-[20vh]" />
    </div>
  );
}
