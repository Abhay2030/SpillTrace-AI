"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, staggerItem, StaggerChildren } from "@/components/ui/Components";
import { AlertTriangle, Satellite, Ship, Waves, Clock, HelpCircle } from "lucide-react";

export default function Slide02Problem() {
  const problems = [
    { icon: Waves, text: "The spill moves from its origin due to currents and wind" },
    { icon: Clock, text: "Environmental conditions change rapidly" },
    { icon: Ship, text: "Multiple vessels transit the area simultaneously" },
    { icon: AlertTriangle, text: "AIS traffic contains massive amounts of noise" },
    { icon: Satellite, text: "The actual source is hidden in the data" },
    { icon: HelpCircle, text: "Manual investigation is slow and complex" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>THE PROBLEM</SectionLabel>
        <SlideTitle
          title="THE OCEAN LEAVES EVIDENCE."
          subtitle="BUT THE SOURCE IS HIDDEN."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Clean, static split visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative flex">
              {/* Left half: SAR Image Representation */}
              <div className="w-1/2 h-full border-r border-[var(--border-subtle)] relative p-4 bg-[#0F1115]">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">SAR Imagery</span>
                <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 300" preserveAspectRatio="none">
                  <path
                    d="M50 100 C70 80, 120 90, 140 110 C160 130, 170 170, 150 200 C130 230, 90 240, 60 220 Z"
                    fill="#1A202C"
                    stroke="var(--border-subtle)"
                    strokeWidth="1"
                  />
                  <circle cx="100" cy="150" r="3" fill="var(--text-secondary)" />
                </svg>
              </div>

              {/* Right half: AIS Track Representation */}
              <div className="w-1/2 h-full relative p-4 bg-[var(--bg-primary)]">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">AIS Tracks</span>
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 200 300" preserveAspectRatio="none">
                  <line x1="20" y1="20" x2="180" y2="280" stroke="var(--text-tertiary)" strokeWidth="1" />
                  <line x1="180" y1="50" x2="30" y2="250" stroke="var(--text-tertiary)" strokeWidth="1" />
                  <line x1="100" y1="10" x2="100" y2="290" stroke="var(--text-tertiary)" strokeWidth="1" />
                  <line x1="10" y1="150" x2="190" y2="150" stroke="var(--text-tertiary)" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right: Problem statements (Typography driven) */}
          <div className="pt-2">
            <motion.p
              className="text-lg text-[var(--text-primary)] font-medium mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              By the time investigators observe an oil slick, the incident scene has drastically changed.
            </motion.p>

            <StaggerChildren className="space-y-4" staggerDelay={0.08}>
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  variants={staggerItem}
                >
                  <div className="w-6 h-6 rounded bg-[var(--bg-secondary)] flex items-center justify-center shrink-0 border border-[var(--border-subtle)] mt-0.5">
                    <p.icon className="w-3 h-3 text-[var(--text-secondary)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{p.text}</span>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </div>
  );
}
