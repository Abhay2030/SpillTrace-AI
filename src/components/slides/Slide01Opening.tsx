"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/Components";

export default function Slide01Opening() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background: Solid near-black */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Orbital rings (Subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <motion.div
          className="w-[600px] h-[600px] rounded-full border border-[var(--border-subtle)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--border-subtle)]"
          style={{ transform: "translate(-50%, -50%) rotateX(60deg)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Globe placeholder (Maintained as hero moment) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full rounded-full relative"
          style={{
            background: "radial-gradient(circle at 35% 35%, #1A1A1A 0%, #0A0A0A 60%, #000000 100%)",
            boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.8), 0 0 60px rgba(0, 229, 255, 0.05)"
          }}
        >
          {/* Subtle Continent hints */}
          <div className="absolute top-[30%] left-[45%] w-[35%] h-[30%] opacity-[0.03]" style={{
            background: "var(--text-primary)",
            borderRadius: "40% 60% 50% 40%",
            transform: "rotate(-15deg)"
          }} />

          {/* Atmosphere edge */}
          <div className="absolute inset-0 rounded-full border border-[var(--border-subtle)] opacity-20" />

          {/* Minimal Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 200 200">
            <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="90" ry="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="30" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <ellipse cx="100" cy="100" rx="60" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </svg>

          {/* Anomaly blip */}
          <motion.div
            className="absolute top-[42%] left-[58%] w-2 h-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="w-full h-full rounded-full bg-[var(--accent-cyan)]" />
            <motion.div
              className="absolute inset-0 rounded-full border border-[var(--accent-cyan)]"
              animate={{ scale: [1, 2.5], opacity: [1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-[450px]">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <SectionLabel>SIH26143 — NTRO</SectionLabel>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mb-4 text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          SPILLTRACE AI
        </motion.h1>

        <motion.p
          className="text-sm md:text-base font-mono tracking-[0.2em] text-[var(--accent-cyan)] uppercase mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          FROM SPACE TO SUSPECT.
        </motion.p>
      </div>
    </div>
  );
}
