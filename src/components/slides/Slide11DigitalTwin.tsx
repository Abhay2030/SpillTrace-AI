"use client";

import React from "react";
import { motion } from "framer-motion";
import { SlideTitle, SectionLabel, staggerItem, StaggerChildren } from "@/components/ui/Components";

const assets = [
  { label: "RV-01 Response Vessel", target: "Spill Zone Alpha", color: "var(--accent-cyan)" },
  { label: "SK-01 Skimmer", target: "High-density Slick", color: "var(--text-secondary)" },
  { label: "BM-01 Boom Team", target: "Coastal Deflection", color: "var(--text-secondary)" },
];

export default function Slide11DigitalTwin() {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[var(--bg-primary)] px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl w-full mx-auto">
        <SectionLabel>STEP 08: DIGITAL TWIN</SectionLabel>
        <SlideTitle title="WHERE SHOULD THEY GO?" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Minimal Digital Twin Map */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative flex items-center justify-center p-8">
              <svg className="w-full h-full" viewBox="0 0 600 375">
                {/* Coastline Line-art */}
                <motion.path 
                  d="M0 300 C80 280, 160 290, 240 275 C320 260, 400 270, 480 255 C520 248, 560 240, 600 245 L600 375 L0 375 Z"
                  fill="none" 
                  stroke="var(--border-subtle)" 
                  strokeWidth="1"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.5 }} 
                />

                {/* Minimal Spill Zone */}
                <motion.ellipse 
                  cx="280" cy="180" rx="40" ry="25" 
                  fill="none" 
                  stroke="var(--text-secondary)" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 0.7 }} 
                />

                {/* Response Assets Routing */}
                {[
                  { x: 150, y: 100, targetX: 250, targetY: 170, color: "var(--accent-cyan)", label: "RV-01" },
                  { x: 400, y: 120, targetX: 300, targetY: 175, color: "var(--text-secondary)", label: "SK-01" },
                  { x: 450, y: 270, targetX: 380, targetY: 260, color: "var(--text-secondary)", label: "BM-01" },
                ].map((asset, i) => (
                  <motion.g key={asset.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.2 }}>
                    <motion.line 
                      x1={asset.x} y1={asset.y} 
                      x2={asset.targetX} y2={asset.targetY}
                      stroke={asset.color} 
                      strokeWidth="1" 
                      strokeDasharray="2,4"
                      initial={{ pathLength: 0 }} 
                      animate={{ pathLength: 1 }} 
                      transition={{ delay: 1.2 + i * 0.2, duration: 1 }} 
                    />
                    <circle cx={asset.x} cy={asset.y} r="4" fill="var(--bg-primary)" stroke={asset.color} strokeWidth="1.5" />
                    <text x={asset.x} y={asset.y - 10} fill={asset.color} fontSize="8" fontFamily="monospace" textAnchor="middle">
                      {asset.label}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Right: Asset Allocation List */}
          <div className="flex flex-col justify-center h-full pt-4">
            <motion.p 
              className="text-2xl text-[var(--text-primary)] font-medium leading-snug mb-12"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
            >
              Response optimization using a lightweight digital twin, mapping available assets to priority zones.
            </motion.p>

            <div className="space-y-6">
              <p className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest border-b border-[var(--border-subtle)] pb-2">
                Recommended Deployment
              </p>
              
              <StaggerChildren className="space-y-4" staggerDelay={0.1}>
                {assets.map((asset, i) => (
                  <motion.div key={asset.label} variants={staggerItem} className="flex items-center gap-6">
                    <span 
                      className="text-sm font-mono tracking-widest uppercase w-16"
                      style={{ color: asset.color }}
                    >
                      {asset.label.split(" ")[0]}
                    </span>
                    <div className="flex-1">
                      <p className="text-[var(--text-primary)] font-medium">{asset.label.substring(asset.label.indexOf(" ") + 1)}</p>
                      <p className="text-sm text-[var(--text-tertiary)]">→ {asset.target}</p>
                    </div>
                  </motion.div>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
