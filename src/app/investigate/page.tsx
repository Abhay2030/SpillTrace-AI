"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import AISControlPanel from "@/components/ui/AISControlPanel";
import EvidenceGraph from "@/components/ui/EvidenceGraph";
import CandidateComparison from "@/components/ui/CandidateComparison";
import InvestigationTimeline from "@/components/ui/InvestigationTimeline";
import DataProvenance from "@/components/ui/DataProvenance";
import { ShieldAlert, Compass, Layers, FileSpreadsheet, Activity } from "lucide-react";

const GlobalNavigation = dynamic(
  () => import("@/components/ui/GlobalNavigation"),
  { ssr: false }
);

const InvestigationMap = dynamic(
  () => import("@/components/map/InvestigationMap"),
  { ssr: false }
);

export default function InvestigatePage() {
  const [activeBoardTab, setActiveBoardTab] = useState<'all' | 'traffic' | 'forensics'>('all');

  return (
    <main className="w-full min-h-screen bg-[#020610] text-white flex flex-col relative overflow-hidden">
      <GlobalNavigation />
      
      <div className="flex-1 mt-[72px] p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-72px)] overflow-hidden">
        
        {/* Left Sidebar (Interactive Command Board) */}
        <div className="w-full lg:w-[420px] flex-shrink-0 h-full flex flex-col gap-3.5 overflow-y-auto pr-1.5 pb-28">
          
          {/* Main Board Command Banner Header */}
          <div className="glass-card p-4 sticky top-0 z-20 bg-[#050B14]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 mb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <img src="/logo.png" alt="SpillTrace AI Logo" className="h-9 w-auto shrink-0 object-contain filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
                <div className="min-w-0">
                  <h2 className="font-display font-bold text-sm sm:text-base leading-tight text-white flex items-center gap-1.5 truncate">
                    COMMAND BOARD
                    <span className="text-[9px] font-mono bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 px-1.5 py-0.5 rounded shrink-0">LIVE</span>
                  </h2>
                  <p className="text-[10px] font-mono text-gray-400 truncate">SPILL DETECTED // INCIDENT #8941</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-[#FF0055] bg-[#FF0055]/15 border border-[#FF0055]/30 px-2 py-1 rounded-md flex items-center gap-1">
                  <Activity size={12} className="animate-pulse shrink-0" />
                  <span className="whitespace-nowrap">HIGH RISK</span>
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <div className="text-gray-400">LOCATION</div>
                <div className="text-white font-bold truncate">ARABIAN SEA (24.12° N)</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-2 rounded-lg">
                <div className="text-gray-400">SURFACE AREA</div>
                <div className="text-[#00F0FF] font-extrabold text-xs">8.4 KM² (SLICK)</div>
              </div>
            </div>

            {/* Board View Switcher Tabs */}
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 mt-3 text-xs font-mono">
              <button
                onClick={() => setActiveBoardTab('all')}
                className={`flex-1 py-1.5 rounded transition-all font-semibold ${
                  activeBoardTab === 'all'
                    ? 'bg-[#00F0FF] text-black shadow-[0_0_10px_#00F0FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ALL BOARDS
              </button>
              <button
                onClick={() => setActiveBoardTab('traffic')}
                className={`flex-1 py-1.5 rounded transition-all font-semibold ${
                  activeBoardTab === 'traffic'
                    ? 'bg-[#00F0FF] text-black shadow-[0_0_10px_#00F0FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                TRAFFIC
              </button>
              <button
                onClick={() => setActiveBoardTab('forensics')}
                className={`flex-1 py-1.5 rounded transition-all font-semibold ${
                  activeBoardTab === 'forensics'
                    ? 'bg-[#00F0FF] text-black shadow-[0_0_10px_#00F0FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                FORENSICS
              </button>
            </div>
          </div>
          
          {/* Dynamic Component Filtering */}
          {(activeBoardTab === 'all' || activeBoardTab === 'traffic') && <AISControlPanel />}
          {(activeBoardTab === 'all' || activeBoardTab === 'forensics') && <EvidenceGraph />}
          {(activeBoardTab === 'all' || activeBoardTab === 'forensics') && <CandidateComparison />}
        </div>

        {/* Map & Telemetry Canvas Area */}
        <div className="flex-1 h-full min-h-[55vh] relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          <InvestigationMap />
          <DataProvenance />
          <InvestigationTimeline />
        </div>
      </div>
    </main>
  );
}
