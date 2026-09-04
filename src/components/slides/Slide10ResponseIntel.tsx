"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, staggerItem, StaggerChildren } from "@/components/ui/Components";
import { MapPin, CloudRain, Waves, Shield, Truck, ArrowRight, Plus, Equal } from "lucide-react";

const decisionInputs = [
  { icon: Waves, label: "Spill Severity" },
  { icon: CloudRain, label: "Weather State" },
  { icon: MapPin, label: "Coastal Distance" },
  { icon: Shield, label: "Sensitive Zones" },
  { icon: Truck, label: "Available Assets" },
];

export default function Slide10ResponseIntel() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 07: RESPONSE AI</SectionLabel>
        <SlideTitle title="FROM DETECTION TO ACTION." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Decision flow diagram (Minimal) */}
          <div className="flex flex-col h-full pt-4 pr-12 border-r border-[var(--border-subtle)]">
            <h3 className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-8">Decision Support Logic</h3>
            
            <div className="space-y-4">
              {decisionInputs.map((input, i) => (
                <motion.div 
                  key={input.label} 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded border border-[var(--border-subtle)] flex items-center justify-center bg-[var(--bg-secondary)]">
                    <input.icon className="w-4 h-4 text-[var(--text-tertiary)]" />
                  </div>
                  <span className="text-lg text-[var(--text-primary)] font-medium">{input.label}</span>
                  {i < decisionInputs.length - 1 && <Plus className="w-4 h-4 text-[var(--text-tertiary)] ml-auto" />}
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="flex justify-center my-6" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.9 }}
            >
              <Equal className="w-6 h-6 text-[var(--text-secondary)]" />
            </motion.div>

            <motion.div 
              className="px-6 py-4 border-l-2 border-[var(--accent-cyan)] bg-[var(--bg-secondary)]"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 1 }}
            >
              <span className="text-lg font-medium text-[var(--text-primary)] tracking-wide">
                Prioritized Response Strategy
              </span>
            </motion.div>
          </div>

          {/* Right: Typography driven questions */}
          <div className="flex flex-col justify-center space-y-12 pl-4">
            <motion.p 
              className="text-2xl text-[var(--text-primary)] font-medium leading-snug"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
            >
              The AI does not autonomously deploy resources. It synthesizes complex inputs to answer critical operational questions for human experts.
            </motion.p>

            <StaggerChildren className="space-y-4" staggerDelay={0.1}>
              {[
                "Where is the oil going?",
                "What coastal infrastructure is at risk?",
                "Where should responders prioritize containment?",
                "What cleanup resources are closest?",
                "What requires immediate monitoring?",
              ].map((q, i) => (
                <motion.div key={i} className="flex items-start gap-4" variants={staggerItem}>
                  <ArrowRight className="w-5 h-5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span className="text-xl text-[var(--text-secondary)] leading-relaxed">{q}</span>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </div>
  );
}
