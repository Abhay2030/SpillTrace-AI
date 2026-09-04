"use client";

import React from 'react';
import { Ship, ChevronRight } from 'lucide-react';

export default function CandidateComparison() {
  return (
    <div className="glass-card p-6 w-full text-[var(--text-primary)]">
      <h3 className="font-display font-medium text-lg mb-6 text-center">WHY THIS VESSEL?</h3>
      
      <div className="flex gap-4">
        {/* Candidate A (The Target) */}
        <div className="flex-1 rounded border-2 border-[var(--risk-critical)] p-4 bg-[var(--surface-glass)]">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Ship size={16} className="text-[var(--risk-critical)]" />
              <span className="font-mono font-medium text-sm">VESSEL 82A</span>
            </div>
            <span className="text-xs font-mono bg-[var(--risk-critical)] text-white px-2 py-1 rounded">MATCH</span>
          </div>
          
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-[var(--risk-critical)]">
               <span>+</span> <span>100% Time Match</span>
            </li>
            <li className="flex items-center gap-2 text-[var(--risk-critical)]">
               <span>+</span> <span>Direct Origin Overlap</span>
            </li>
            <li className="flex items-center gap-2 text-[var(--risk-critical)]">
               <span>+</span> <span>Drift Model Alignment</span>
            </li>
          </ul>
        </div>

        {/* Candidate B (Eliminated) */}
        <div className="flex-1 rounded border border-[var(--border-subtle)] p-4 opacity-70">
           <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Ship size={16} className="text-[var(--text-secondary)]" />
              <span className="font-mono font-medium text-sm">VESSEL 41C</span>
            </div>
          </div>
          
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
               <span>+</span> <span>Time Window Match</span>
            </li>
            <li className="flex items-center gap-2 opacity-50 line-through">
               <span>-</span> <span>Spatial Separation (4km)</span>
            </li>
            <li className="flex items-center gap-2 opacity-50 line-through">
               <span>-</span> <span>Course Deviates from Spill</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="btn-secondary w-full flex items-center justify-center gap-2">
          COMPARE ALL CANDIDATES <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
