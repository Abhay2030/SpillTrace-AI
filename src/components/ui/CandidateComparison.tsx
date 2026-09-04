"use client";

import React from 'react';
import { Ship, Scale, CheckCircle2, XCircle, ArrowRight, Database, ExternalLink } from 'lucide-react';
import { mockVessels } from '@/data/mockProviders';

export default function CandidateComparison() {
  const suspect = mockVessels.find((v) => v.isSuspect) || mockVessels[0];

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
              COUNTERFACTUAL AIS FORENSICS
            </h3>
            <p className="text-[10px] font-mono text-gray-400">MARINECADASTRE.GOV ATTRIBUTION</p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-0.5 rounded font-semibold">
          ACCESSAIS MATCHED
        </span>
      </div>

      <div className="space-y-3.5">
        {/* Candidate A (The High-Confidence Suspect) */}
        <div className="relative rounded-xl border-2 border-[#FF0055] p-4 bg-[#FF0055]/10 shadow-[0_0_20px_rgba(255,0,85,0.2)]">
          <div className="flex items-center justify-between mb-2 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded bg-[#FF0055] text-white flex items-center justify-center font-bold text-xs shrink-0">
                #1
              </div>
              <div className="min-w-0">
                <div className="font-mono font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 truncate">
                  {suspect.vesselName}
                  <span className="text-[9px] font-mono bg-[#FF0055] text-white font-bold px-1.5 py-0.2 rounded shrink-0">TARGET</span>
                </div>
                <div className="text-[10px] font-mono text-gray-300 truncate">
                  {suspect.imo} | {suspect.vesselTypeGroup}
                </div>
              </div>
            </div>
            
            <div className="text-right shrink-0">
              <div className="text-base sm:text-lg font-display font-bold text-[#FF0055]">{suspect.candidateScore}%</div>
              <div className="text-[9px] font-mono text-gray-400">MATCH SCORE</div>
            </div>
          </div>

          {/* MarineCadastre AIS Datasheet Summary Box */}
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono bg-black/50 border border-white/10 p-2 rounded-lg mb-3 text-gray-300">
            <div><span className="text-gray-400">MMSI:</span> {suspect.mmsi}</div>
            <div><span className="text-gray-400">CALLSIGN:</span> {suspect.callSign}</div>
            <div><span className="text-gray-400">SOG / COG:</span> {suspect.sog} kts / {suspect.cog}°</div>
            <div><span className="text-gray-400">DRAFT:</span> {suspect.dimensions.draft}m</div>
          </div>

          {/* Animated Match Meter */}
          <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-[#FF0055] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_#FF0055]" style={{ width: `${suspect.candidateScore}%` }} />
          </div>

          {/* Evidence Factors */}
          <ul className="space-y-1.5 text-xs font-mono text-gray-200">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
              <span><strong>Temporal Intersection:</strong> AIS broadcast at {suspect.baseDateTime.slice(11, 19)} UTC</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
              <span><strong>Hydrodynamic Drift:</strong> Reverse parcel trajectory overlaps slick origin</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#00FF66] shrink-0 mt-0.5" />
              <span><strong>Draft Change Anomaly:</strong> Heavy cargo draft of {suspect.dimensions.draft}m matching crude payload</span>
            </li>
          </ul>
        </div>

        {/* VS Badge */}
        <div className="flex items-center justify-center my-[-8px] relative z-10">
          <span className="bg-[#0B132B] text-gray-400 border border-white/15 text-[10px] font-mono px-3 py-0.5 rounded-full shadow">
            VS SECONDARY CANDIDATE (DISQUALIFIED)
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
                <div className="font-mono font-medium text-xs text-gray-300">MV PACIFIC STAR (IMO 9128301)</div>
                <div className="text-[10px] font-mono text-gray-400">Cargo (Code 70-79) | MMSI 367123987</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-display font-semibold text-gray-400">41.2%</div>
              <div className="text-[9px] font-mono text-gray-500">DISQUALIFIED</div>
            </div>
          </div>

          <ul className="space-y-1 text-[11px] font-mono text-gray-400">
            <li className="flex items-start gap-2 line-through decoration-[#FF0055]">
              <XCircle size={13} className="text-[#FF0055] shrink-0 mt-0.5" />
              <span>Missed spill origin zone by 6.4 nautical miles</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Forensic Report Button */}
      <button className="mt-4 w-full py-2.5 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] font-mono font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(0,240,255,0.15)]">
        <span>INSPECT MARINECADASTRE FORENSIC DOSSIER</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
