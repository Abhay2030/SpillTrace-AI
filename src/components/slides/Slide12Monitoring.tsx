"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, AnimatedCounter, staggerItem, StaggerChildren } from "@/components/ui/Components";
import { monitoringTimeline } from "@/data/slides";
import { RefreshCw } from "lucide-react";

export default function Slide12Monitoring() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 09: CONTINUOUS MONITORING</SectionLabel>
        <SlideTitle title="CLOSED-LOOP INTELLIGENCE." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Minimal typographic loop */}
          <div className="flex flex-col h-full pt-4 pr-12 border-r border-[var(--border-subtle)]">
            <motion.p 
              className="text-2xl text-[var(--text-primary)] font-medium leading-snug mb-8"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
            >
              The incident does not end after the first response. The intelligence pipeline loops continuously.
            </motion.p>
            
            <div className="mt-8 space-y-6 relative border-l-2 border-[var(--border-subtle)] pl-6 ml-2">
              <StaggerChildren className="space-y-6" staggerDelay={0.15}>
                {[
                  "New satellite imagery acquired",
                  "Compare observation against digital twin forecast",
                  "Quantify response effectiveness",
                  "Adjust priority & re-allocate resources",
                ].map((step, i) => (
                  <motion.div key={i} variants={staggerItem} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-cyan)]" />
                    <span className="text-lg text-[var(--text-secondary)]">{step}</span>
                  </motion.div>
                ))}
              </StaggerChildren>
              
              <motion.div 
                className="absolute -bottom-8 -left-3 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1.5 }}
              >
                <div className="w-px h-6 bg-[var(--border-subtle)]" />
                <RefreshCw className="w-4 h-4 text-[var(--accent-cyan)] animate-spin-slow" />
              </motion.div>
            </div>
          </div>

          {/* Right: Bar chart timeline */}
          <div className="flex flex-col justify-center h-full pt-4 space-y-12">
            <div>
              <motion.p 
                className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-6"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.6 }}
              >
                Simulated Containment Progress
              </motion.p>
              
              <div className="space-y-6">
                {monitoringTimeline.map((entry, i) => (
                  <motion.div key={entry.time} className="flex items-center gap-6"
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.8 + i * 0.15 }}>
                    <span className="text-sm font-mono text-[var(--text-secondary)] w-12 shrink-0">{entry.time}</span>
                    <div className="flex-1">
                      <div className="h-1 bg-[var(--bg-tertiary)]">
                        <motion.div 
                          className="h-full bg-[var(--text-primary)]" 
                          style={{
                            background: i === 0 ? "var(--text-primary)" : i === monitoringTimeline.length - 1 ? "var(--accent-cyan)" : "var(--text-secondary)"
                          }}
                          initial={{ width: 0 }} 
                          animate={{ width: `${(entry.area / 8.4) * 100}%` }}
                          transition={{ delay: 1 + i * 0.2, duration: 1, ease: "easeOut" }} 
                        />
                      </div>
                    </div>
                    <span className="text-xl font-mono text-[var(--text-primary)] w-24 text-right">
                      <AnimatedCounter value={entry.area} decimals={1} suffix=" km²" duration={1} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="pt-6 border-t border-[var(--border-subtle)] flex items-end justify-between"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 2 }}
            >
              <span className="text-sm text-[var(--text-secondary)]">Simulated Surface Area Reduction</span>
              <span className="text-4xl font-display font-medium text-[var(--accent-cyan)]">
                <AnimatedCounter value={62} suffix="%" duration={1.5} />
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
