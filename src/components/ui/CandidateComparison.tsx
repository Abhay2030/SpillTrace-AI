"use client";

import React, { useState } from 'react';
import { Ship, Scale, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CandidateComparison() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'forensics'>('all');

  return (
    <div className="glass-card p-5 w-full text-[var(--text-primary)] border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FFB703]/10 border border-[#FFB703]/30 flex items-center justify-center text-[#FFB703]">
            <Scale size={18} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wide text-white">
              COUNTERFACTUAL VESSEL MATCHING
            </h3>
            <p className="text-[10px] font-mono text-gray-400">EXPLAINABLE AI ATTRIBUTION</p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-0.5 rounded font-semibold">
          AI RANKED
        </span>
      </div>

      <div className="space-y-3.5">
        {/* Candidate A (The High-Confidence Suspect) */}
        <div className="relative rounded-xl border-2 border-[#FF0055] p-4 bg-[#FF0055]/10 shadow-[0_0_20px_rgba(255,0,85,0.2)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#FF0055] text-white flex items-center justify-center font-bold text-xs">
                #1
              </div>
              <div>
                <div className="font-mono font-bold text-sm text-white flex items-center gap-1.5">
                  MT ALFA SEAWAY
                  <span className="text-[9px] font-mono bg-[#FF0055] text-white font-bold px-1.5 py-0.2 rounded">SUSPECT</span>
                </div>
                <div className="text-[10px] font-mono text-gray-300">IMO 9481920 | OIL TANKER</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-display font-bold text-[#FF0055]">98.4%</div>
              <div className="text-[9px] font-mono text-gray-400">MATCH SCORE</div>
            </div>
          </div>

          {/* Animated Match Meter */}
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-[#FF0055] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#FF0055]" style={{ width: '98.4%' }} />
          </div>

          {/* Evidence Factors */}
          <ul className="space-y-1.5 text-xs font-mono text-gray-200">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
              <span><strong>Temporal Intersection:</strong> Course bisected origin zone at T-12.4h</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
              <span><strong>Hydrodynamic Drift:</strong> Reverse parcel trajectory overlaps slick origin</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
              <span><strong>Anomalous Speed:</strong> Speed dropped from 14.2 kts → 3.1 kts in origin zone</span>
            </li>
          </ul>
        </div>

        {/* VS Badge */}
        <div className="flex items-center justify-center my-[-8px] relative z-10">
          <span className="bg-[#0B132B] text-gray-400 border border-white/15 text-[10px] font-mono px-3 py-0.5 rounded-full shadow">
            VS SECONDARY CANDIDATE
          </span>
        </div>

        {/* Candidate B (Eliminated Secondary Vessel) */}
        <div className="relative rounded-xl border border-white/10 p-3.5 bg-white/5 opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gray-700 text-gray-300 flex items-center justify-center font-bold text-xs">
                #2
              </div>
              <div>
                <div className="font-mono font-medium text-xs text-gray-300">MV PACIFIC STAR (CONTAINER)</div>
                <div className="text-[10px] font-mono text-gray-400">IMO 9128301 | TRANSIT</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-display font-semibold text-gray-400">41.2%</div>
              <div className="text-[9px] font-mono text-gray-500">DISQUALIFIED</div>
            </div>
          </div>

          {/* Disqualification factors */}
          <ul className="space-y-1 text-[11px] font-mono text-gray-400">
            <li className="flex items-start gap-2 line-through decoration-[#FF0055]">
              <XCircle size={13} className="text-[#FF0055] shrink-0 mt-0.5" />
              <span>Missed spill origin by 6.4 nautical miles</span>
            </li>
            <li className="flex items-start gap-2 text-gray-400">
              <CheckCircle2 size={13} className="text-gray-500 shrink-0 mt-0.5" />
              <span>Maintained constant speed of 18.5 kts (No anomalies)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Forensic Report Button */}
      <button className="mt-4 w-full py-2.5 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] font-mono font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(0,240,255,0.15)]">
        <span>OPEN DETAILED ATTRIBUTION DOSSIER</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
