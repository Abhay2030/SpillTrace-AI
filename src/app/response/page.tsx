"use client";

import React from "react";
import dynamic from "next/dynamic";

const GlobalNavigation = dynamic(
  () => import("@/components/ui/GlobalNavigation"),
  { ssr: false }
);

export default function ResponsePage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <GlobalNavigation />
      
      <div className="flex-1 mt-20 p-6 flex flex-col md:flex-row gap-6">
        {/* Map View */}
        <div className="flex-[3] glass-panel rounded-xl flex items-center justify-center">
          <p className="text-[var(--text-secondary)] font-mono text-sm tracking-widest uppercase">
            Response Simulation Map
          </p>
        </div>
        
        {/* Sidebar */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="glass-card p-6">
            <h3 className="font-display font-medium text-lg mb-4">Response Assets</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm font-mono border-b border-[var(--border-subtle)] pb-2">
                <span>SKIMMER 01</span>
                <span className="text-low">AVAILABLE</span>
              </li>
              <li className="flex justify-between items-center text-sm font-mono border-b border-[var(--border-subtle)] pb-2">
                <span>BOOM TEAM A</span>
                <span className="text-medium">DEPLOYED</span>
              </li>
            </ul>
            <button className="btn-primary w-full mt-6">Optimize Response</button>
          </div>
        </div>
      </div>
    </main>
  );
}
