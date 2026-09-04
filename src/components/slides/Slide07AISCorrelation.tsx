"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, AnimatedCounter } from "@/components/ui/Components";
import { filteringStages } from "@/data/slides";
import { Filter } from "lucide-react";

export default function Slide07AISCorrelation() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 03: AIS CORRELATION</SectionLabel>
        <SlideTitle title="FIND THE TRAFFIC THAT MATTERS." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Progressive filtering text */}
          <div className="flex flex-col h-full pt-4 pr-12 border-r border-[var(--border-subtle)]">
            <motion.p 
              className="text-2xl text-[var(--text-primary)] font-medium leading-snug mb-8"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
            >
              The ocean is noisy. We use progressive filtering to reduce hundreds of vessel tracks down to a small, mathematically isolated evidence set.
            </motion.p>
            
            <motion.div 
              className="mt-auto"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest mb-4">Filtering Criteria</p>
              <div className="flex flex-wrap gap-2">
                {["Location", "Time", "Speed", "Heading", "Trajectory", "Behavior"].map((c) => (
                  <span key={c} className="text-xs font-mono px-3 py-1 border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-sm">{c}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Clean Funnel Visual */}
          <div className="flex flex-col justify-center space-y-6 pl-4">
            {filteringStages.map((stage, i) => (
              <motion.div 
                key={stage.label} 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[var(--text-secondary)] tracking-wide w-32">{stage.label}</span>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <motion.div 
                    className="h-px bg-[var(--text-primary)]" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(stage.count / 247) * 100}%` }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.8, ease: "easeOut" }} 
                  />
                  <span className={`text-2xl md:text-3xl font-mono ${i === filteringStages.length - 1 ? "text-[var(--accent-cyan)] font-bold" : "text-[var(--text-primary)]"}`}>
                    <AnimatedCounter value={stage.count} duration={1.5} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
