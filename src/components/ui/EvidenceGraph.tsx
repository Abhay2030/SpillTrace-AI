"use client";

import React from 'react';
import { Network, Satellite, Droplet, Clock, Navigation } from 'lucide-react';

export default function EvidenceGraph() {
  return (
    <div className="glass-card p-4 w-full text-[var(--text-primary)]">
      <h3 className="font-display font-medium text-sm flex items-center gap-2 mb-4">
        <Network size={16} className="text-[var(--accent-ocean)]" />
        EVIDENCE GRAPH
      </h3>

      <div className="flex flex-col gap-3">
        {/* Nodes */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-medium)] flex items-center justify-center">
            <Satellite size={14} className="text-[var(--accent-ocean)]" />
          </div>
          <div className="flex-1 border-b border-dashed border-[var(--border-medium)] relative">
             <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[var(--text-tertiary)] bg-[var(--surface-glass)] px-1">DETECTED</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-medium)] flex items-center justify-center">
             <Droplet size={14} className="text-[var(--risk-high)]" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-medium)] flex items-center justify-center">
            <Droplet size={14} className="text-[var(--risk-high)]" />
          </div>
          <div className="flex-1 border-b border-dashed border-[var(--border-medium)] relative">
             <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[var(--text-tertiary)] bg-[var(--surface-glass)] px-1">BACKTRACK</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-medium)] flex items-center justify-center">
             <Clock size={14} className="text-[var(--risk-medium)]" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-medium)] flex items-center justify-center">
             <Clock size={14} className="text-[var(--risk-medium)]" />
          </div>
          <div className="flex-1 border-b border-dashed border-[var(--border-medium)] relative">
             <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[var(--text-tertiary)] bg-[var(--surface-glass)] px-1">CORRELATED</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--risk-critical)] flex items-center justify-center">
             <Navigation size={14} className="text-[var(--risk-critical)]" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
         <div className="flex justify-between items-end">
            <div>
              <p className="text-xs font-mono text-[var(--text-tertiary)]">CANDIDATE 01 MATCH</p>
              <p className="text-2xl font-display font-medium text-[var(--risk-critical)]">94.2%</p>
            </div>
            <button className="text-xs font-mono text-[var(--accent-ocean)] hover:underline">VIEW FULL REPORT</button>
         </div>
      </div>
    </div>
  );
}
