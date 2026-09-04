"use client";

import React from 'react';
import { Ship, ChevronRight, Scale } from 'lucide-react';

export default function CandidateComparison() {
  return (
    <div className="glass-card p-6 w-full text-[var(--text-primary)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-medium text-sm flex items-center gap-2">
          <Scale size={16} className="text-[var(--accent-ocean)]" />
          COUNTERFACTUAL COMPARISON
        </h3>
        <span className="text-xs font-mono text-[var(--text-tertiary)]">WHY A {'>'} B?</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Candidate A (The Target) */}
        <div className="relative rounded border-2 border-[var(--risk-critical)] p-4 bg-[var(--risk-critical)]/5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Ship size={14} className="text-[var(--risk-critical)]" />
              <span className="font-mono font-bold text-sm text-[var(--risk-critical)]">CANDIDATE A: VESSEL 82A</span>
            </div>
            <span className="text-xs font-mono bg-[var(--risk-critical)] text-white px-2 py-0.5 rounded">94.2% SCORE</span>
          </div>
          
          <ul className="space-y-2 text-xs font-medium">
            <li className="flex items-center gap-2 text-[var(--text-primary)]">
               <span className="text-[var(--risk-critical)] font-bold">+</span> <span>Temporal Intersection: Perfect match at T-12h</span>
            </li>
            <li className="flex items-center gap-2 text-[var(--text-primary)]">
               <span className="text-[var(--risk-critical)] font-bold">+</span> <span>Spatial Overlap: Trajectory bisects origin zone</span>
            </li>
            <li className="flex items-center gap-2 text-[var(--text-primary)]">
               <span className="text-[var(--risk-critical)] font-bold">+</span> <span>Behavior: Suspicious speed reduction (12kts {'>'} 3kts)</span>
            </li>
          </ul>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center my-[-10px] relative z-10">
          <span className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono px-2 py-1 rounded-full">VERSUS</span>
        </div>

        {/* Candidate B (Eliminated) */}
        <div className="relative rounded border border-[var(--border-subtle)] p-4 bg-[var(--bg-primary)] opacity-80">
           <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Ship size={14} className="text-[var(--text-secondary)]" />
              <span className="font-mono font-medium text-sm text-[var(--text-secondary)]">CANDIDATE B: VESSEL 41C</span>
            </div>
            <span className="text-xs font-mono bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded">42.1% SCORE</span>
          </div>
          
          <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
               <span className="text-[var(--accent-ocean)]">+</span> <span>Temporal Intersection: Present in wider time window</span>
            </li>
            <li className="flex items-center gap-2 opacity-50 line-through decoration-[var(--risk-critical)] decoration-2">
               <span>-</span> <span>Spatial Overlap: Missed origin zone by 4.2 nautical miles</span>
            </li>
            <li className="flex items-center gap-2 opacity-50 line-through decoration-[var(--risk-critical)] decoration-2">
               <span>-</span> <span>Behavior: Maintained constant transit speed</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] text-center">
        <button className="text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent-ocean)] transition-colors tracking-widest flex justify-center items-center gap-1 w-full">
          OPEN FORENSIC PROFILE <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
