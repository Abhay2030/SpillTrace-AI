"use client";

import React from 'react';
import { useInvestigationStore } from '@/store/investigationStore';
import { Database, ShieldCheck, Clock, RadioTower } from 'lucide-react';

export default function DataProvenance() {
  const { currentStep, mode } = useInvestigationStore();

  const getProvenanceData = () => {
    switch(currentStep) {
      case '01-DETECT':
      case '02-CHARACTERIZE':
        return { source: 'ESA Sentinel-1 SAR', type: 'Satellite Remote Sensing', conf: '94.2%', delay: '14 min' };
      case '03-TRACE':
      case '05-ATTRIBUTE':
      case '07-ASSESS':
        return { source: 'INCOIS / Custom Ocean Model', type: 'Predictive Compute', conf: '88.1%', delay: 'Model' };
      case '04-CORRELATE':
      case '06-EXPLAIN':
        return { source: 'Global AIS Network', type: 'Vessel Telemetry', conf: '99.9%', delay: '2 min' };
      default:
        return { source: 'Unified Intelligence Platform', type: 'Fused Intelligence', conf: '92.0%', delay: 'Live' };
    }
  };

  const data = getProvenanceData();

  return (
    <div className="absolute top-4 left-4 z-10 glass-card p-3 min-w-[240px]">
      <div className="flex items-center justify-between mb-3 border-b border-[var(--border-subtle)] pb-2">
        <h3 className="font-mono text-[10px] text-[var(--text-secondary)] flex items-center gap-1">
          <Database size={12} />
          DATA PROVENANCE
        </h3>
        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${mode === 'LIVE' ? 'bg-[var(--risk-critical)] text-white' : 'bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]'}`}>
          {mode === 'LIVE' ? 'LIVE DATA' : 'DEMO MODE'}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <RadioTower size={14} className="text-[var(--accent-ocean)] mt-0.5" />
          <div>
            <p className="text-xs font-medium text-[var(--text-primary)]">{data.source}</p>
            <p className="text-[10px] text-[var(--text-tertiary)] font-mono">{data.type}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-1 pl-6">
          <div className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-[var(--text-secondary)]" />
            <span className="text-[10px] font-mono text-[var(--text-secondary)]">CONF {data.conf}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-[var(--text-secondary)]" />
            <span className="text-[10px] font-mono text-[var(--text-secondary)]">DELAY {data.delay}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
