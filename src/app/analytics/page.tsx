"use client";

import React from "react";
import dynamic from "next/dynamic";

const GlobalNavigation = dynamic(
  () => import("@/components/ui/GlobalNavigation"),
  { ssr: false }
);

export default function AnalyticsPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <GlobalNavigation />
      
      <div className="flex-1 mt-20 p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-display font-medium mb-8">Maritime Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card h-64 flex items-center justify-center text-[var(--text-secondary)] font-mono text-sm tracking-widest">INCIDENT DENSITY</div>
          <div className="glass-card h-64 flex items-center justify-center text-[var(--text-secondary)] font-mono text-sm tracking-widest">VESSEL TRAFFIC</div>
          <div className="glass-card h-64 flex items-center justify-center text-[var(--text-secondary)] font-mono text-sm tracking-widest">RISK ZONES</div>
        </div>
      </div>
    </main>
  );
}
