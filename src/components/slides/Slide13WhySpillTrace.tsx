"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, staggerItem, StaggerChildren } from "@/components/ui/Components";
import { competitorMatrix } from "@/data/slides";
import { Check, Minus } from "lucide-react";

const differentiators = [
  { title: "END-TO-END WORKFLOW", desc: "Detection to response monitoring in one unbroken chain of evidence." },
  { title: "EVIDENCE FUSION", desc: "Satellite, ocean, AIS, and environmental intelligence synthesized automatically." },
  { title: "EXPLAINABLE ATTRIBUTION", desc: "Every ranking is supported by verifiable geospatial factors, not black-box assumptions." },
  { title: "RESPONSE-ORIENTED", desc: "Moves beyond 'where is the spill?' to 'what needs attention right now?'" },
];

export default function Slide13WhySpillTrace() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl w-full mx-auto">
        <SectionLabel>DIFFERENTIATION</SectionLabel>
        <SlideTitle title="WHY SPILLTRACE AI?" />

        <div className="mt-16 grid grid-cols-1 xl:grid-cols-2 gap-16">
          {/* Comparison matrix - Minimalist */}
          <div className="overflow-x-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left py-4 pr-6 text-[var(--text-tertiary)] font-medium w-48">Capability</th>
                    {["Standard", "SpillTrace AI"].map((h, i) => (
                      <th key={h} className={`text-center py-4 px-2 font-mono text-[10px] uppercase tracking-widest ${i === 1 ? "text-[var(--accent-cyan)]" : "text-[var(--text-tertiary)]"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitorMatrix.slice(0, 8).map((row, ri) => (
                    <motion.tr key={row.capability} className="border-b border-[var(--border-subtle)]/50"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + ri * 0.05 }}>
                      <td className="py-3 pr-6 text-[var(--text-secondary)]">{row.capability}</td>
                      
                      {/* Standard (Aggregate of competitors) */}
                      <td className="text-center py-3">
                        {(row.satellite || row.trajectory || row.maritime || row.ais || row.emergency) && !row.spilltrace ? (
                           <Check className="w-4 h-4 mx-auto text-[var(--text-tertiary)]" />
                        ) : (row.satellite && row.trajectory && !row.spilltrace) ? (
                           <Check className="w-4 h-4 mx-auto text-[var(--text-tertiary)]" />
                        ) : (
                           <Minus className="w-4 h-4 mx-auto text-[var(--border-subtle)]" />
                        )}
                      </td>

                      {/* SpillTrace */}
                      <td className="text-center py-3 bg-[var(--accent-cyan)]/5">
                        {row.spilltrace ? (
                          <Check className="w-4 h-4 mx-auto text-[var(--accent-cyan)]" />
                        ) : (
                          <Minus className="w-4 h-4 mx-auto text-[var(--accent-cyan)]/30" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Differentiators & Closing */}
          <div className="flex flex-col h-full justify-between pt-4 pb-8 pl-8 border-l border-[var(--border-subtle)]">
            <StaggerChildren className="space-y-8" staggerDelay={0.15}>
              {differentiators.map((d, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <p className="text-sm font-mono text-[var(--accent-cyan)] uppercase tracking-widest mb-2">{d.title}</p>
                  <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{d.desc}</p>
                </motion.div>
              ))}
            </StaggerChildren>

            <motion.div 
              className="mt-16 pt-8 border-t border-[var(--border-subtle)]"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.5 }}
            >
              <h2 className="text-4xl font-display font-medium text-[var(--text-primary)] tracking-tight mb-4">
                SPILLTRACE AI
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[var(--text-tertiary)] tracking-widest uppercase">
                {["Detect", "Trace", "Attribute", "Assess", "Respond", "Monitor"].map((s, i) => (
                  <React.Fragment key={s}>
                    {i > 0 && <span className="text-[var(--accent-cyan)]">/</span>}
                    <span className={i === 5 ? "text-[var(--accent-cyan)]" : ""}>{s}</span>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
