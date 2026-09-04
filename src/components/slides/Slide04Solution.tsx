"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, PipelineStep } from "@/components/ui/Components";

const steps = [
  { num: "01", title: "DETECT", desc: "SAR AI segmentation" },
  { num: "02", title: "ANALYZE", desc: "Area & confidence" },
  { num: "03", title: "TRACE", desc: "Drift modelling" },
  { num: "04", title: "FILTER", desc: "AIS correlation" },
  { num: "05", title: "ATTRIBUTE", desc: "Evidence scoring" },
  { num: "06", title: "EXPLAIN", desc: "Clear reasoning" },
  { num: "07", title: "ASSESS", desc: "Threat impact" },
  { num: "08", title: "RESPOND", desc: "Digital twin" },
];

export default function Slide04Solution() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-[1400px] w-full mx-auto">
        <SectionLabel>THE SOLUTION</SectionLabel>
        <SlideTitle title="ONE INCIDENT." subtitle="ONE INTELLIGENCE PIPELINE." />

        {/* Pipeline Diagram */}
        <div className="mt-24 relative px-4">
          {/* Base connector line */}
          <motion.div 
            className="absolute top-4 left-10 right-10 h-px bg-[var(--border-subtle)] hidden lg:block"
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ delay: 0.3, duration: 1 }} 
            style={{ transformOrigin: "left" }} 
          />
          
          {/* Active progress line (subtle) */}
          <motion.div 
            className="absolute top-4 left-10 right-10 h-px bg-[var(--text-primary)] hidden lg:block opacity-30"
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }} 
            style={{ transformOrigin: "left" }} 
          />

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12 lg:gap-4 relative z-10">
            {steps.map((step, i) => (
              <PipelineStep 
                key={step.num} 
                number={step.num} 
                title={step.title} 
                description={step.desc} 
                isActive={true} 
                delay={0.4 + i * 0.1} 
              />
            ))}
          </div>
        </div>

        <motion.p 
          className="text-lg text-[var(--text-secondary)] mt-24 max-w-2xl"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5 }}
        >
          SpillTrace AI transforms a fragmented investigation into a single, continuous chain of evidence—from orbital detection to operational response.
        </motion.p>
      </div>
    </div>
  );
}
