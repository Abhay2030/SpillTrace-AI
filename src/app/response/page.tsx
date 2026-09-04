"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ShieldAlert, Anchor, Navigation, Radio, Play, BarChart3, Compass } from "lucide-react";

const GlobalNavigation = dynamic(() => import("@/components/ui/GlobalNavigation"), { ssr: false });
const InvestigationMap = dynamic(() => import("@/components/map/InvestigationMap"), { ssr: false });

const assets = [
  { name: "SKIMMER 01", type: "Oil Recovery", status: "AVAILABLE", color: "var(--risk-low)" },
  { name: "BOOM TEAM A", type: "Containment", status: "DEPLOYED", color: "var(--risk-high)" },
  { name: "BOOM TEAM B", type: "Containment", status: "STANDBY", color: "var(--accent-ocean)" },
  { name: "UAV RECON 3", type: "Aerial Survey", status: "ACTIVE", color: "var(--risk-low)" },
  { name: "COAST GUARD V12", type: "Patrol", status: "EN ROUTE", color: "var(--risk-high)" },
  { name: "SAMPLING UNIT", type: "Lab Analysis", status: "STANDBY", color: "var(--accent-ocean)" },
];

export default function ResponsePage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <GlobalNavigation />
      
      <div className="flex-1 mt-[72px] p-4 flex flex-col lg:flex-row gap-4 h-[calc(100vh-72px)] overflow-hidden">
        {/* Left Panel */}
        <div className="w-full lg:w-[380px] flex-shrink-0 h-full flex flex-col gap-4 overflow-y-auto pr-1 pb-4">
          {/* Incident Status Header */}
          <div className="metric-card" style={{ borderColor: "var(--risk-critical)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-[var(--risk-critical)]" />
                <span className="text-sm font-display font-bold">INCIDENT ACTIVE</span>
              </div>
              <span className="threat-badge critical">CRITICAL</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-[var(--text-primary)]">INC-2026-0904</p>
                <p className="text-[9px] font-mono text-[var(--text-tertiary)]">INCIDENT ID</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[var(--risk-critical)]">8.4 km²</p>
                <p className="text-[9px] font-mono text-[var(--text-tertiary)]">SPILL AREA</p>
              </div>
            </div>
          </div>

          {/* Threat Summary */}
          <div className="glass-card p-4">
            <h3 className="text-xs font-mono text-[var(--text-tertiary)] tracking-widest mb-3">THREAT ASSESSMENT</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { cat: "ECOLOGICAL", badge: "critical" },
                { cat: "FISHERIES", badge: "critical" },
                { cat: "COASTAL", badge: "medium" },
                { cat: "NAVIGATION", badge: "medium" },
              ].map(t => (
                <div key={t.cat} className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg-secondary)]">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">{t.cat}</span>
                  <span className={`threat-badge ${t.badge}`}>{t.badge === "critical" ? "HIGH" : "MED"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Assets */}
          <div className="glass-card p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono text-[var(--text-tertiary)] tracking-widest">RESPONSE ASSETS</h3>
              <span className="text-[10px] font-mono text-[var(--text-secondary)]">{assets.length} UNITS</span>
            </div>
            <div className="flex flex-col gap-2">
              {assets.map(a => (
                <div key={a.name} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-ocean)] transition-colors">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{a.name}</p>
                    <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{a.type}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold" style={{ color: a.color }}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Play size={14} /> Run 12H Forecast
            </button>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 flex items-center justify-center gap-2 text-xs">
                <BarChart3 size={14} /> Simulate
              </button>
              <button className="btn-secondary flex-1 flex items-center justify-center gap-2 text-xs">
                <Compass size={14} /> Optimize
              </button>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 h-full min-h-[50vh] relative">
          <InvestigationMap />
          {/* Simulation Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-[var(--surface-glass)] backdrop-blur border border-[var(--border-subtle)] rounded-full px-4 py-2 flex items-center gap-2 shadow-[var(--shadow-floating)]">
            <Radio size={14} className="text-[var(--risk-low)]" />
            <span className="text-[10px] font-mono text-[var(--text-secondary)] tracking-widest">RESPONSE COMMAND CENTER</span>
          </div>
        </div>
      </div>
    </main>
  );
}
