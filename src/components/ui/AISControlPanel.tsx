"use client";

import React, { useState } from 'react';
import { Ship, SlidersHorizontal, Eye, Lock, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AISControlPanel() {
  const [filterType, setFilterType] = useState('All');
  const [showRoutes, setShowRoutes] = useState(true);
  const [lockedTarget, setLockedTarget] = useState(true);

  const vesselCategories = [
    { type: 'All', count: 32, icon: '🌐' },
    { type: 'Tanker', count: 8, icon: '🛢️', suspectCount: 1 },
    { type: 'Cargo', count: 14, icon: '📦' },
    { type: 'Bulk', count: 6, icon: '⚓' },
    { type: 'Patrol', count: 4, icon: '🛡️' },
  ];

  return (
    <div className="glass-card p-5 w-full text-[var(--text-primary)] border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
            <Ship size={18} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wide text-white">
              AIS VESSEL TRAFFIC MONITOR
            </h3>
            <p className="text-[10px] font-mono text-gray-400">REAL-TIME TELEMETRY FEED</p>
          </div>
        </div>
        
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          32 VESSELS LIVE
        </span>
      </div>

      {/* Vessel Category Filter Buttons */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-mono text-gray-300 font-medium">FILTER BY CLASS</label>
          <span className="text-[10px] font-mono text-gray-400">1 TARGET MATCHED</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {vesselCategories.map(({ type, count, icon, suspectCount }) => {
            const isActive = filterType === type;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`relative px-2.5 py-2 text-xs font-mono rounded-lg border transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-[0_0_12px_rgba(0,240,255,0.3)] font-semibold'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-1">
                  <span>{icon}</span>
                  <span>{type}</span>
                </span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-[#00F0FF] text-black font-bold' : 'bg-black/40 text-gray-400'}`}>
                  {count}
                </span>

                {/* Suspect Alert Indicator */}
                {suspectCount && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF0055] animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Suspect Quick Card */}
      <div className="bg-[#FF0055]/10 border border-[#FF0055]/40 rounded-lg p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle size={16} className="text-[#FF0055] animate-pulse" />
          <div>
            <div className="text-xs font-mono font-bold text-[#FF0055]">TARGET: MT ALFA SEAWAY</div>
            <div className="text-[10px] font-mono text-gray-300">MMSI: 235890142 | SPEED: 14.2 KTS</div>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-[#FF0055] text-white font-bold px-2 py-0.5 rounded">
          98.4% MATCH
        </span>
      </div>

      {/* Interactive Control Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setShowRoutes(!showRoutes)}
          className={`flex items-center justify-center gap-1.5 text-xs font-mono py-2 rounded-lg border transition-all ${
            showRoutes
              ? 'bg-[#00A8E8]/20 border-[#00A8E8] text-[#00A8E8] font-medium'
              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
          }`}
        >
          <Eye size={14} />
          {showRoutes ? 'ROUTES VISIBLE' : 'HIDDEN ROUTES'}
        </button>

        <button
          onClick={() => setLockedTarget(!lockedTarget)}
          className={`flex items-center justify-center gap-1.5 text-xs font-mono py-2 rounded-lg border transition-all ${
            lockedTarget
              ? 'bg-[#FF0055]/20 border-[#FF0055] text-[#FF0055] font-semibold shadow-[0_0_10px_rgba(255,0,85,0.2)]'
              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
          }`}
        >
          <Lock size={14} />
          {lockedTarget ? 'LOCK SUSPECT' : 'UNLOCK CAM'}
        </button>
      </div>
    </div>
  );
}
