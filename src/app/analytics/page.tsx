"use client";

import React from "react";
import dynamic from "next/dynamic";
import { TrendingUp, Ship, Clock, MapPin, AlertTriangle, Anchor, Activity } from "lucide-react";

const GlobalNavigation = dynamic(
  () => import("@/components/ui/GlobalNavigation"),
  { ssr: false }
);

const kpis = [
  { label: "INCIDENTS DETECTED", value: "142", change: "+12 this month", icon: AlertTriangle, color: "var(--risk-critical)" },
  { label: "VESSELS TRACKED", value: "18,420", change: "Active in Indian EEZ", icon: Ship, color: "var(--accent-ocean)" },
  { label: "AVG RESPONSE TIME", value: "4.2h", change: "-18% vs last quarter", icon: Clock, color: "var(--risk-low)" },
  { label: "MONITORING ZONES", value: "37", change: "Arabian Sea, Bay of Bengal", icon: MapPin, color: "var(--accent-cyan)" },
];

const incidents = [
  { id: "INC-2026-0904", region: "Arabian Sea", severity: "critical", vessels: 3, time: "08:20 UTC" },
  { id: "INC-2026-0901", region: "Gulf of Kutch", severity: "high", vessels: 2, time: "14:45 UTC" },
  { id: "INC-2026-0828", region: "Lakshadweep", severity: "medium", vessels: 1, time: "06:12 UTC" },
  { id: "INC-2026-0825", region: "Bay of Bengal", severity: "low", vessels: 0, time: "22:33 UTC" },
  { id: "INC-2026-0819", region: "Mumbai Offshore", severity: "critical", vessels: 4, time: "03:07 UTC" },
];

const riskZones = [
  { zone: "Arabian Sea West", level: "HIGH", incidents: 34, trend: "+8%" },
  { zone: "Gulf of Kutch", level: "HIGH", incidents: 28, trend: "+12%" },
  { zone: "Mumbai High", level: "MEDIUM", incidents: 19, trend: "-3%" },
  { zone: "Lakshadweep Basin", level: "MEDIUM", incidents: 14, trend: "+2%" },
  { zone: "Bay of Bengal North", level: "LOW", incidents: 8, trend: "-15%" },
];

// Simple SVG line chart
function MiniChart() {
  const data = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35, 29, 38];
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 280 + 10},${140 - (v / max) * 120}`).join(" ");
  const areaPath = `M10,140 L${data.map((v, i) => `${(i / (data.length - 1)) * 280 + 10},${140 - (v / max) * 120}`).join(" L")} L290,140 Z`;

  return (
    <svg viewBox="0 0 300 160" className="w-full h-full">
      <defs>
        <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-ocean)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent-ocean)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="10" y1={20 + i * 40} x2="290" y2={20 + i * 40} stroke="var(--border-subtle)" strokeWidth="0.5" />
      ))}
      {/* Area */}
      <path d={areaPath} fill="url(#chartGrad)" />
      {/* Line */}
      <polyline points={points} fill="none" stroke="var(--accent-ocean)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dot on latest */}
      <circle cx={290} cy={140 - (data[data.length - 1] / max) * 120} r="4" fill="var(--accent-ocean)" />
      <circle cx={290} cy={140 - (data[data.length - 1] / max) * 120} r="8" fill="var(--accent-ocean)" opacity="0.2" />
      {/* Labels */}
      {['Jan','Mar','May','Jul','Sep','Nov'].map((m, i) => (
        <text key={m} x={10 + i * 56} y="155" fill="var(--text-tertiary)" fontSize="8" fontFamily="JetBrains Mono">{m}</text>
      ))}
    </svg>
  );
}

export default function AnalyticsPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <GlobalNavigation />
      
      <div className="flex-1 mt-20 p-6 md:p-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Maritime Analytics</h1>
            <p className="text-sm text-[var(--text-secondary)]">Indian EEZ Intelligence Overview</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-tertiary)]">
            <Activity size={12} className="text-[var(--risk-low)]" />
            <span>LAST UPDATED 2 MIN AGO</span>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map(k => (
            <div key={k.label} className="metric-card">
              <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest">{k.label}</p>
                <k.icon size={16} style={{ color: k.color }} />
              </div>
              <p className="text-3xl font-bold font-display text-[var(--text-primary)]">{k.value}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">{k.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incident Trend Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-medium">Incident Frequency (2026)</h3>
              <div className="flex items-center gap-1 text-xs text-[var(--risk-low)]">
                <TrendingUp size={14} />
                <span className="font-mono">+23% YoY</span>
              </div>
            </div>
            <div className="h-40">
              <MiniChart />
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-display font-medium mb-4">Risk Zones</h3>
            <div className="flex flex-col gap-3">
              {riskZones.map(z => (
                <div key={z.zone} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--text-primary)] truncate">{z.zone}</p>
                    <p className="text-[10px] font-mono text-[var(--text-tertiary)]">{z.incidents} incidents</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${z.trend.startsWith('+') ? 'text-[var(--risk-critical)]' : 'text-[var(--risk-low)]'}`}>{z.trend}</span>
                    <span className={`threat-badge ${z.level === 'HIGH' ? 'critical' : z.level === 'MEDIUM' ? 'medium' : 'low'}`}>{z.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="glass-card p-6 mt-6">
          <h3 className="text-sm font-display font-medium mb-4">Recent Incidents</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest border-b border-[var(--border-subtle)]">
                  <th className="text-left py-2 pr-4">ID</th>
                  <th className="text-left py-2 pr-4">REGION</th>
                  <th className="text-left py-2 pr-4">SEVERITY</th>
                  <th className="text-left py-2 pr-4">CANDIDATES</th>
                  <th className="text-right py-2">TIME</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map(inc => (
                  <tr key={inc.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="py-3 pr-4 font-mono text-[var(--accent-ocean)]">{inc.id}</td>
                    <td className="py-3 pr-4 text-[var(--text-primary)]">{inc.region}</td>
                    <td className="py-3 pr-4"><span className={`threat-badge ${inc.severity}`}>{inc.severity.toUpperCase()}</span></td>
                    <td className="py-3 pr-4 font-mono">{inc.vessels}</td>
                    <td className="py-3 text-right text-[var(--text-tertiary)] font-mono text-xs">{inc.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
