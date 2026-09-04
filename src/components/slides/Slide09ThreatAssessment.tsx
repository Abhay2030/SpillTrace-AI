"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, RiskBadge } from "@/components/ui/Components";
import { riskAssessment } from "@/data/slides";
import { MapPin } from "lucide-react";

export default function Slide09ThreatAssessment() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 06: IMPACT AI</SectionLabel>
        <SlideTitle title="ASSESS THE THREAT." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Minimal Map Visualization */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative flex items-center justify-center p-8">
              <svg className="w-full h-full" viewBox="0 0 500 375">
                {/* Clean Coastline */}
                <motion.path
                  d="M0 280 C40 270, 80 250, 120 260 C160 270, 200 240, 240 250 C280 260, 320 235, 360 240 C400 245, 440 230, 500 235 L500 375 L0 375 Z"
                  fill="var(--bg-tertiary)" 
                  stroke="var(--border-subtle)" 
                  strokeWidth="1"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.5 }} 
                />

                {/* Minimal Spill trajectory */}
                <motion.path
                  d="M200 140 C230 160, 260 180, 270 200 C280 220, 260 240, 240 250"
                  fill="none" 
                  stroke="var(--text-secondary)" 
                  strokeWidth="2" 
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }} 
                  transition={{ delay: 0.8, duration: 1.5, ease: "linear" }} 
                />

                {/* Spill zone outline */}
                <motion.ellipse 
                  cx="200" cy="140" rx="35" ry="25" 
                  fill="none" 
                  stroke="var(--text-primary)" 
                  strokeWidth="1" 
                  strokeDasharray="2 4"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 1 }} 
                />

                {/* Critical Threat zones only */}
                {[
                  { cx: 250, cy: 245, label: "Beach", color: "var(--accent-red)" },
                  { cx: 130, cy: 260, label: "Fishery", color: "var(--accent-amber)" },
                ].map((zone, i) => (
                  <motion.g key={zone.label} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + i * 0.2 }}>
                    <circle cx={zone.cx} cy={zone.cy} r="6" fill={zone.color} />
                    <circle cx={zone.cx} cy={zone.cy} r="14" fill="none" stroke={zone.color} strokeWidth="1" opacity="0.4" />
                  </motion.g>
                ))}
              </svg>
              
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)]">Impact Simulation</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Risk Assessment List */}
          <div className="flex flex-col justify-center h-full pt-4 space-y-10">
            <motion.p 
              className="text-2xl text-[var(--text-primary)] font-medium leading-snug"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
            >
              The investigation does not end at the source. We overlay trajectory models against sensitive coastal zones to prioritize response.
            </motion.p>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.6 }}
            >
              {riskAssessment.map((risk, i) => (
                <RiskBadge 
                  key={risk.category} 
                  level={risk.level as "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"}
                  label={risk.category} 
                  score={risk.score} 
                  delay={0.8 + i * 0.15} 
                />
              ))}
            </motion.div>

            <motion.div 
              className="pt-6 border-t border-[var(--border-subtle)]"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.2 }}
            >
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {["Coastline", "Beaches", "Fisheries", "Ports", "Protected Areas"].map((z) => (
                  <div key={z} className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-[var(--text-tertiary)]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]">{z}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
