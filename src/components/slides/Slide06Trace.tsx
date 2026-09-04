"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel } from "@/components/ui/Components";

export default function Slide06Trace() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 02: DRIFT MODELLING</SectionLabel>
        <SlideTitle title="REWIND THE OCEAN." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Minimal schematic map */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative flex items-center justify-center p-8">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Minimal Grid */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
                </pattern>
                <rect width="400" height="300" fill="url(#grid)" />

                {/* Backward trajectory line */}
                <motion.path
                  d="M280 150 Q230 150 200 180 T120 220"
                  fill="none" 
                  stroke="var(--text-secondary)" 
                  strokeWidth="2" 
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ delay: 0.8, duration: 1.5, ease: "linear" }} 
                />

                {/* Forward trajectory line */}
                <motion.path
                  d="M280 150 Q320 150 340 120 T380 90"
                  fill="none" 
                  stroke="var(--accent-cyan)" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ delay: 2.3, duration: 1, ease: "linear" }} 
                />

                {/* Origin point */}
                <motion.circle 
                  cx="120" cy="220" r="4" 
                  fill="var(--text-primary)" 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 2.3 }} 
                />
                
                <motion.text x="120" y="240" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace" textAnchor="middle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                  ORIGIN (T-24h)
                </motion.text>

                {/* Current point */}
                <motion.circle 
                  cx="280" cy="150" r="4" 
                  fill="var(--accent-cyan)" 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 0.6 }} 
                />
                <motion.text x="280" y="170" fill="var(--text-primary)" fontSize="10" fontFamily="monospace" textAnchor="middle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                  OBSERVED (T₀)
                </motion.text>
              </svg>
            </div>
          </motion.div>

          {/* Right: Typography data */}
          <div className="flex flex-col justify-center h-full pt-4 space-y-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <p className="text-xl text-[var(--text-primary)] font-medium leading-relaxed">
                By integrating <span className="text-[var(--accent-cyan)]">HYCOM</span> ocean currents and <span className="text-[var(--accent-cyan)]">GFS</span> wind fields, we mathematically reverse the drift of the spill to isolate its exact location of origin.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
            >
              {[
                { label: "Origin Coordinates", value: "18.31°N, 71.48°E" },
                { label: "Estimated Discharge", value: "T₀ − 24h" },
                { label: "Drift Model", value: "OpenDrift Particle Simulation" },
              ].map((item, i) => (
                <div key={item.label} className="border-l-2 border-[var(--border-subtle)] pl-4 py-1">
                  <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xl text-[var(--text-secondary)] font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
