"use client";

import React from "react";
import dynamic from "next/dynamic";
import AISControlPanel from "@/components/ui/AISControlPanel";
import EvidenceGraph from "@/components/ui/EvidenceGraph";
import CandidateComparison from "@/components/ui/CandidateComparison";
import InvestigationTimeline from "@/components/ui/InvestigationTimeline";
import DataProvenance from "@/components/ui/DataProvenance";

const GlobalNavigation = dynamic(
  () => import("@/components/ui/GlobalNavigation"),
  { ssr: false }
);

const InvestigationMap = dynamic(
  () => import("@/components/map/InvestigationMap"),
  { ssr: false }
);

export default function InvestigatePage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col relative">
      <GlobalNavigation />
      
      <div className="flex-1 mt-[72px] p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-72px)] overflow-hidden">
        {/* Left Sidebar (Investigation State) */}
        <div className="w-full lg:w-96 flex-shrink-0 h-full flex flex-col gap-4 overflow-y-auto pr-2 pb-24">
          <div className="glass-panel p-4 sticky top-0 z-10 bg-[var(--bg-secondary)] backdrop-blur-md">
            <h2 className="font-display font-medium text-lg border-b border-[var(--border-subtle)] pb-2 mb-2">
              Investigation Active
            </h2>
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-secondary)]">
               <span>ARABIAN SEA</span>
               <span className="text-[var(--risk-critical)]">1 SPILL DETECTED</span>
            </div>
          </div>
          
          <AISControlPanel />
          <EvidenceGraph />
          <CandidateComparison />
        </div>

        {/* Map Area */}
        <div className="flex-1 h-full min-h-[50vh] relative">
          <InvestigationMap />
          <DataProvenance />
          <InvestigationTimeline />
        </div>
      </div>
    </main>
  );
}
