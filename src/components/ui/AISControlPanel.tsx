"use client";

import React, { useState } from 'react';
import { Ship, SlidersHorizontal, Eye, Lock, Download, ExternalLink, ShieldCheck, Database, Compass, AlertCircle } from 'lucide-react';
import { mockVessels } from '@/data/mockProviders';

export default function AISControlPanel() {
  const [filterCode, setFilterCode] = useState<number | 'ALL'>('ALL');
  const [showRoutes, setShowRoutes] = useState(true);
  const [lockedTarget, setLockedTarget] = useState(true);
  const [selectedNavStatus, setSelectedNavStatus] = useState<string>('ALL');

  // Official NOAA / BOEM MarineCadastre.gov AccessAIS Vessel Type Categories
  const marineCadastreCategories = [
    { code: 'ALL', groupName: 'All Classes', icon: '🌐', count: mockVessels.length },
    { code: 80, groupName: 'Code 80-89 (Tanker)', icon: '🛢️', count: 8, suspectCount: 1 },
    { code: 70, groupName: 'Code 70-79 (Cargo)', icon: '📦', count: 14 },
    { code: 30, groupName: 'Code 30 (Fishing)', icon: '🎣', count: 4 },
    { code: 60, groupName: 'Code 60-69 (Passenger)', icon: '🚢', count: 3 },
    { code: 35, groupName: 'Code 35 (Tug/Gov)', icon: '🛡️', count: 3 },
  ];

  // Export MarineCadastre.gov Datasheet format
  const exportMarineCadastreDatasheet = () => {
    const jsonStr = JSON.stringify(mockVessels, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `MarineCadastre_AccessAIS_Telemetry_Export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card p-5 w-full text-[var(--text-primary)] border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
            <Database size={18} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wide text-white flex items-center gap-1.5">
              MARINECADASTRE.GOV AIS FEED
              <a
                href="https://marinecadastre.gov/accessais/"
                target="_blank"
                rel="noreferrer"
                title="View MarineCadastre.gov AccessAIS Data Dictionary"
                className="text-gray-400 hover:text-[#00F0FF] transition-colors"
              >
                <ExternalLink size={12} />
              </a>
            </h3>
            <p className="text-[10px] font-mono text-gray-400">NOAA / BOEM ACCESSAIS COMPLIANT</p>
          </div>
        </div>
        
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30 px-2 py-0.5 rounded-full font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          ACCESSAIS VERIFIED
        </span>
      </div>

      {/* Official MarineCadastre Type Code Filter */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-mono text-gray-300 font-medium">MARINECADASTRE TYPE CODES</label>
          <span className="text-[10px] font-mono text-[#00F0FF]">NOAA CLASS A/B</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {marineCadastreCategories.map(({ code, groupName, icon, count, suspectCount }) => {
            const isActive = filterCode === code;
            return (
              <button
                key={String(code)}
                onClick={() => setFilterCode(code as any)}
                className={`relative px-2.5 py-2 text-[11px] font-mono rounded-lg border transition-all duration-200 flex items-center justify-between ${
                  isActive
                    ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-white shadow-[0_0_12px_rgba(0,240,255,0.3)] font-semibold'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/25 hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span>{icon}</span>
                  <span className="truncate">{groupName}</span>
                </span>

                {suspectCount && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF0055] animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Suspect Telemetry Card (MarineCadastre Specs) */}
      <div className="bg-[#FF0055]/10 border border-[#FF0055]/40 rounded-xl p-3.5 mb-4 shadow-[0_0_15px_rgba(255,0,85,0.15)]">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-[#FF0055] shrink-0 animate-pulse" />
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                MT ALFA SEAWAY
                <span className="text-[9px] font-mono bg-[#FF0055] text-white font-bold px-1.5 py-0.2 rounded">SUSPECT</span>
              </div>
              <div className="text-[10px] font-mono text-gray-300">
                MMSI: 235890142 | IMO: 9481920 | CALLSIGN: WDB9182
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-[#FF0055] text-white font-bold px-2 py-0.5 rounded shrink-0">
            98.4% MATCH
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono bg-black/40 p-2 rounded-lg text-gray-300">
          <div><span className="text-gray-400">TYPE CODE:</span> 80 (TANKER)</div>
          <div><span className="text-gray-400">SOG / COG:</span> 14.2 kts / 142°</div>
          <div><span className="text-gray-400">DRAFT:</span> 14.8m</div>
        </div>
      </div>

      {/* Interactive Control & Export Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setShowRoutes(!showRoutes)}
          className={`flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-lg border transition-all ${
            showRoutes
              ? 'bg-[#00A8E8]/20 border-[#00A8E8] text-[#00A8E8] font-semibold'
              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
          }`}
        >
          <Eye size={13} />
          {showRoutes ? 'ROUTES ON' : 'ROUTES OFF'}
        </button>

        <button
          onClick={() => setLockedTarget(!lockedTarget)}
          className={`flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-lg border transition-all ${
            lockedTarget
              ? 'bg-[#FF0055]/20 border-[#FF0055] text-[#FF0055] font-semibold shadow-[0_0_10px_rgba(255,0,85,0.2)]'
              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
          }`}
        >
          <Lock size={13} />
          {lockedTarget ? 'LOCKED' : 'UNLOCKED'}
        </button>

        <button
          onClick={exportMarineCadastreDatasheet}
          className="flex items-center justify-center gap-1 text-[11px] font-mono py-2 rounded-lg border border-[#00F0FF]/40 bg-[#00F0FF]/15 text-[#00F0FF] hover:bg-[#00F0FF]/25 font-semibold transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
        >
          <Download size={13} />
          EXPORT AIS
        </button>
      </div>
    </div>
  );
}
