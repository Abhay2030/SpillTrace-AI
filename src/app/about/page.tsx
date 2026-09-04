"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Satellite, Droplets, Ship, Search, Brain, ShieldAlert, Activity, Radio, Eye } from "lucide-react";

const GlobalNavigation = dynamic(() => import("@/components/ui/GlobalNavigation"), { ssr: false });

const pipeline = [
  { step: "01", name: "DETECT", desc: "SAR imagery reveals surface anomalies", icon: Eye },
  { step: "02", name: "CHARACTERIZE", desc: "AI segments and measures the spill", icon: Satellite },
  { step: "03", name: "TRACE", desc: "Ocean currents reconstruct the origin", icon: Droplets },
  { step: "04", name: "CORRELATE", desc: "AIS data identifies nearby vessels", icon: Ship },
  { step: "05", name: "ATTRIBUTE", desc: "Evidence scores rank candidates", icon: Search },
  { step: "06", name: "EXPLAIN", desc: "Factor analysis justifies ranking", icon: Brain },
  { step: "07", name: "ASSESS", desc: "Threat corridors predict impact", icon: ShieldAlert },
  { step: "08", name: "RESPOND", desc: "Decision support for asset deployment", icon: Activity },
  { step: "09", name: "MONITOR", desc: "Continuous satellite re-observation", icon: Radio },
];

const techStack = [
  { cat: "SATELLITE", items: ["Sentinel-1 SAR", "Optical Imagery", "VIIRS NightFire"] },
  { cat: "AI / ML", items: ["U-Net Segmentation", "YOLO Detection", "Ensemble Scoring"] },
  { cat: "OCEANOGRAPHY", items: ["INCOIS Currents", "ECMWF Wind", "Particle Tracking"] },
  { cat: "MARITIME", items: ["AIS Vessel Data", "MMSI Registry", "Port Intelligence"] },
];

const dataSources = [
  { source: "ESA Sentinel-1", type: "SAR Satellite", coverage: "Global", latency: "~14 min" },
  { source: "Global AIS Network", type: "Vessel Telemetry", coverage: "Maritime Zones", latency: "~2 min" },
  { source: "INCOIS", type: "Ocean Model", coverage: "Indian Ocean", latency: "Model Output" },
  { source: "ECMWF", type: "Atmospheric Model", coverage: "Global", latency: "Model Output" },
];

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <GlobalNavigation />
      
      <div className="flex-1 mt-20 p-6 md:p-8 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.3em] mb-3">MINISTRY OF DISASTER MANAGEMENT • NTRO</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">Maritime Incident<br/>Intelligence</h1>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
            SpillTrace AI combines satellite aperture radar, automatic identification systems, and metocean drift modeling to probabilistically identify the source of illegal maritime oil spills.
          </p>
        </div>

        {/* Pipeline */}
        <section className="mb-16">
          <h2 className="text-xs font-mono text-[var(--text-tertiary)] tracking-[0.2em] mb-6">THE INTELLIGENCE PIPELINE</h2>
          <div className="flex flex-col gap-2">
            {pipeline.map((p, i) => (
              <div key={p.step} className="pipeline-step">
                <div className="step-number">{p.step}</div>
                <div className="flex-1">
                  <p className="text-sm font-display font-medium text-[var(--text-primary)]">{p.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{p.desc}</p>
                </div>
                <p.icon size={16} className="text-[var(--accent-ocean)] opacity-50" />
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-xs font-mono text-[var(--text-tertiary)] tracking-[0.2em] mb-6">TECHNOLOGY STACK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map(t => (
              <div key={t.cat} className="glass-card p-5">
                <p className="text-[10px] font-mono text-[var(--accent-ocean)] tracking-widest mb-3">{t.cat}</p>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent-ocean)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-16">
          <h2 className="text-xs font-mono text-[var(--text-tertiary)] tracking-[0.2em] mb-6">DATA PROVENANCE</h2>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
                  <th className="text-left py-3 px-4">SOURCE</th>
                  <th className="text-left py-3 px-4">TYPE</th>
                  <th className="text-left py-3 px-4">COVERAGE</th>
                  <th className="text-right py-3 px-4">LATENCY</th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map(d => (
                  <tr key={d.source} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="py-3 px-4 font-medium text-[var(--text-primary)]">{d.source}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{d.type}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{d.coverage}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-[var(--text-tertiary)]">{d.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-16">
          <h2 className="text-xs font-mono text-[var(--text-tertiary)] tracking-[0.2em] mb-6">LIMITATIONS & ETHICS</h2>
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 text-sm text-[var(--text-secondary)] leading-relaxed">
              <p>
                <strong className="text-[var(--text-primary)]">Probabilistic Attribution.</strong> SpillTrace AI generates evidence-based candidate rankings, not legal determinations. All outputs require independent verification before regulatory action.
              </p>
              <p>
                <strong className="text-[var(--text-primary)]">Model Uncertainty.</strong> Drift reconstruction relies on ocean and atmospheric models with inherent uncertainty. Probability corridors are displayed rather than exact trajectories.
              </p>
              <p>
                <strong className="text-[var(--text-primary)]">AIS Limitations.</strong> Vessel identification depends on AIS transponder data. Vessels with disabled or spoofed transponders may not be detected through standard AIS analysis.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
