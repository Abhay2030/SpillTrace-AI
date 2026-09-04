"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel } from "@/components/ui/Components";
import { Satellite, Ship, Waves } from "lucide-react";

export default function Slide03IntelligenceGap() {
  const sources = [
    { icon: Satellite, title: "SATELLITE", output: "\"Something is there.\"" },
    { icon: Ship, title: "AIS DATA", output: "\"These vessels were there.\"" },
    { icon: Waves, title: "OCEAN MODEL", output: "\"This is how it moved.\"" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>THE GAP</SectionLabel>
        <SlideTitle title="DETECTION IS NOT ATTRIBUTION." />
        
        <motion.p
          className="text-lg text-[var(--text-secondary)] mt-6 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Data lives in silos. The intelligence required to definitively attribute a spill to a vessel requires a fusion layer that currently does not exist.
        </motion.p>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {sources.map((source, i) => (
              <motion.div 
                key={source.title} 
                className="flex flex-col border-l border-[var(--border-subtle)] pl-6 py-2"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <source.icon className="w-5 h-5 text-[var(--text-tertiary)]" />
                  <h3 className="text-sm font-medium tracking-widest text-[var(--text-primary)]">{source.title}</h3>
                </div>
                <p className="text-xl font-display text-[var(--text-secondary)] leading-tight">{source.output}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="pt-12 border-t border-[var(--border-subtle)]"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[var(--accent-cyan)]" />
              <p className="text-xl font-medium text-[var(--text-primary)]">
                SpillTrace provides the missing fusion layer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
