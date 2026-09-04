"use client";

import React from "react";
import dynamic from "next/dynamic";

const GlobalNavigation = dynamic(
  () => import("@/components/ui/GlobalNavigation"),
  { ssr: false }
);

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <GlobalNavigation />
      
      <div className="flex-1 mt-20 p-6 max-w-4xl mx-auto w-full text-center py-20">
        <h1 className="text-5xl font-display font-medium mb-6">Maritime Incident Intelligence</h1>
        <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-12">
          SpillTrace AI combines satellite aperture radar (SAR), automatic identification systems (AIS), 
          and metocean drift modeling to probabilistically identify the source of illegal maritime oil spills.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="glass-card p-8">
            <h3 className="font-mono text-[var(--accent-cyan)] tracking-widest text-sm mb-4">01. DETECT</h3>
            <p className="text-[var(--text-secondary)]">
              Continuous monitoring of satellite imagery highlights anomalous surface slicks.
            </p>
          </div>
          <div className="glass-card p-8">
            <h3 className="font-mono text-[var(--accent-cyan)] tracking-widest text-sm mb-4">02. TRACE</h3>
            <p className="text-[var(--text-secondary)]">
              Using ocean currents and wind vectors to backtrack the slick to its point of origin.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
