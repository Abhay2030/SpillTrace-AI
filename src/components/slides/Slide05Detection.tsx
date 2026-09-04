"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, AnimatedCounter } from "@/components/ui/Components";
import { spillData } from "@/data/slides";

export default function Slide05Detection() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 01: DETECTION</SectionLabel>
        <SlideTitle title="SEE THE SPILL." />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Minimal Image Representation */}
          <motion.div 
            className="relative" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-subtle)] relative bg-[var(--bg-secondary)] p-6 flex items-center justify-center">
              {/* Minimal SVG Slick Representation */}
              <svg className="w-full h-full max-w-sm" viewBox="0 0 400 300">
                <motion.path
                  d="M140 100 C170 80, 250 90, 280 120 C310 150, 300 200, 270 230 C240 260, 180 255, 150 230 C120 200, 110 140, 140 100 Z"
                  fill="none" 
                  stroke="var(--accent-cyan)" 
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }} 
                />
                <motion.path
                  d="M140 100 C170 80, 250 90, 280 120 C310 150, 300 200, 270 230 C240 260, 180 255, 150 230 C120 200, 110 140, 140 100 Z"
                  fill="var(--accent-cyan)" 
                  opacity="0.1"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.1 }}
                  transition={{ delay: 1.8, duration: 0.8 }} 
                />
                {/* Centroid marker */}
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}>
                  <circle cx="210" cy="170" r="3" fill="var(--accent-cyan)" />
                  <line x1="210" y1="165" x2="210" y2="175" stroke="var(--bg-primary)" strokeWidth="1" />
                  <line x1="205" y1="170" x2="215" y2="170" stroke="var(--bg-primary)" strokeWidth="1" />
                </motion.g>
              </svg>
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[var(--text-tertiary)]" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[var(--text-tertiary)]" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[var(--text-tertiary)]" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--text-tertiary)]" />
            </div>
          </motion.div>

          {/* Right: Massive Confidence Number & Typography Data */}
          <div className="flex flex-col justify-center h-full pt-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm font-mono text-[var(--text-secondary)] uppercase tracking-widest mb-2">Confidence Level</p>
              <h2 className="text-8xl md:text-9xl font-display font-medium text-[var(--text-primary)] tracking-tighter">
                <AnimatedCounter value={spillData.confidence} decimals={1} suffix="%" />
              </h2>
            </motion.div>

            <motion.div 
              className="mt-12 space-y-6"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
            >
              {[
                { label: "Estimated Area", value: `${spillData.area} km²` },
                { label: "Centroid", value: `${spillData.centroid.lat}°N, ${spillData.centroid.lon}°E` },
                { label: "Classification", value: spillData.type },
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
