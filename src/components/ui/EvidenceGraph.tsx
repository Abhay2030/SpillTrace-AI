"use client";

import React from 'react';
import { Network, Satellite, Waves, Clock, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';

export default function EvidenceGraph() {
  const pipelineNodes = [
    {
      id: 1,
      step: 'DETECTION',
      label: 'SAR Satellite Anomaly',
      detail: 'Sentinel-1 SAR Radar',
      icon: Satellite,
      status: 'VERIFIED',
      color: '#00F0FF',
    },
    {
      id: 2,
      step: 'HYDRODYNAMICS',
      label: 'Drift Trajectory Rewind',
      detail: '2.8 kts Current Model',
      icon: Waves,
      status: 'VERIFIED',
      color: '#00A8E8',
    },
    {
      id: 3,
      step: 'CORRELATION',
      label: 'AIS Vessel Intersection',
      detail: 'Spatial/Temporal Lock',
      icon: Clock,
      status: 'VERIFIED',
      color: '#FFB703',
    },
    {
      id: 4,
      step: 'ATTRIBUTION',
      label: 'Suspect Match Found',
      detail: 'MT ALFA SEAWAY',
      icon: ShieldAlert,
      status: 'HIGH CONFIDENCE',
      color: '#FF0055',
    },
  ];

  return (
    <div className="glass-card p-5 w-full text-[var(--text-primary)] border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
            <Network size={18} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wide text-white">
              INTELLIGENCE EVIDENCE GRAPH
            </h3>
            <p className="text-[10px] font-mono text-gray-400">PROVENANCE PIPELINE</p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
          <CheckCircle size={11} /> 4 STAGES CHAINED
        </span>
      </div>

      {/* Step Pipeline Flow */}
      <div className="relative space-y-3 pl-2">
        {/* Connecting Vertical Track Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00F0FF] via-[#FFB703] to-[#FF0055] opacity-60 z-0" />

        {pipelineNodes.map((node) => {
          const IconComponent = node.icon;
          return (
            <div key={node.id} className="relative z-10 flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-2.5 hover:border-white/20 transition-all">
              <div
                className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border shadow"
                style={{ backgroundColor: `${node.color}15`, borderColor: `${node.color}50`, color: node.color }}
              >
                <IconComponent size={16} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-gray-400 truncate">
                    STAGE 0{node.id} // {node.step}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded shrink-0 whitespace-nowrap"
                    style={{ backgroundColor: `${node.color}20`, color: node.color }}
                  >
                    {node.status}
                  </span>
                </div>
                <div className="text-xs font-mono font-semibold text-white truncate">{node.label}</div>
                <div className="text-[10px] font-mono text-gray-400 truncate">{node.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Overall Confidence Score */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between bg-black/30 p-3 rounded-lg">
        <div>
          <div className="text-[10px] font-mono text-gray-400 uppercase">VERIFIED ATTRIBUTION PROBABILITY</div>
          <div className="text-2xl font-display font-bold text-[#FF0055] tracking-tight flex items-baseline gap-1">
            98.4%
            <span className="text-xs font-mono text-gray-400 font-normal">HIGH CERTAINTY</span>
          </div>
        </div>

        <button className="px-3 py-1.5 bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-mono font-semibold rounded-md transition-all flex items-center gap-1">
          <span>REPORT</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
