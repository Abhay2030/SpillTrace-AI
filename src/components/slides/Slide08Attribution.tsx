"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, ScoreBar, AnimatedCounter, ExpandableDetail, staggerItem, StaggerChildren } from "@/components/ui/Components";
import { vesselCandidates } from "@/data/slides";

export default function Slide08Attribution() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 04 & 05: ATTRIBUTION & EXPLAINABILITY</SectionLabel>
        <SlideTitle title="WHO CAUSED IT?" subtitle="PROGRESSIVE EVIDENCE DISCLOSURE" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Vessel Ranking List */}
          <div className="flex flex-col h-full pt-4">
            <motion.p 
              className="text-2xl text-[var(--text-primary)] font-medium leading-snug mb-8"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
            >
              The intelligence pipeline isolates 3 candidate vessels. Click to reveal the AI's reasoning.
            </motion.p>

            <StaggerChildren className="space-y-4" staggerDelay={0.1}>
              {vesselCandidates.map((v, i) => (
                <motion.div key={v.id} variants={staggerItem}>
                  <ExpandableDetail 
                    title={<span className="flex items-center gap-4"><span className="text-[var(--text-tertiary)]">#{String(v.rank).padStart(2, "0")}</span> {v.name}</span>}
                    defaultExpanded={i === 0}
                  >
                    <div className="py-4 space-y-8">
                      {/* Score Summary */}
                      <div className="flex items-end justify-between border-b border-[var(--border-subtle)] pb-4">
                        <div>
                          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Evidence Score</p>
                          <span className="text-4xl font-display font-medium text-[var(--accent-cyan)]">
                            <AnimatedCounter value={v.evidenceScore} decimals={1} duration={1} />
                          </span>
                        </div>
                        <span className={`text-xs font-mono px-3 py-1 border rounded-sm ${
                          v.confidence === "HIGH" ? "text-red-400 border-red-400/30" :
                          v.confidence === "MEDIUM" ? "text-amber-400 border-amber-400/30" :
                          "text-[var(--text-secondary)] border-[var(--border-subtle)]"
                        }`}>
                          {v.confidence} CONFIDENCE
                        </span>
                      </div>

                      {/* Factor Breakdowns */}
                      <div className="space-y-4">
                        <ScoreBar label="Temporal" value={v.factors.temporal} delay={0.2} />
                        <ScoreBar label="Spatial" value={v.factors.spatial} delay={0.3} />
                        <ScoreBar label="Trajectory" value={v.factors.trajectory} delay={0.4} />
                      </div>

                      {/* Explainable AI Reasons */}
                      <div className="pt-4 space-y-3 bg-[var(--bg-secondary)] p-4 rounded-lg border border-[var(--border-subtle)]">
                        <p className="text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-4">AI Reasoning</p>
                        {v.reasons.map((r, ri) => (
                          <div key={ri} className="flex items-start gap-3">
                            <span className={`text-sm mt-0.5 font-mono ${r.positive ? "text-[var(--accent-cyan)]" : "text-amber-500"}`}>
                              {r.positive ? "+" : "−"}
                            </span>
                            <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{r.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ExpandableDetail>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>

          {/* Right: Technical Explanation */}
          <div className="flex flex-col justify-center h-full space-y-12 pl-12 border-l border-[var(--border-subtle)]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              <p className="text-xl text-[var(--text-primary)] font-medium leading-relaxed">
                We do not use black-box models. Every attribution score is broken down into verifiable, geospatial factors.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
            >
              {[
                { label: "Methodology", value: "Weighted Evidence Architecture" },
                { label: "Explainability", value: "SHAP Feature Attribution" },
                { label: "Legal Admissibility", value: "Deterministic Rule Validation" },
              ].map((item, i) => (
                <div key={item.label} className="border-l-2 border-[var(--border-subtle)] pl-4 py-1">
                  <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-lg text-[var(--text-secondary)] font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
