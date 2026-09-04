"use client";

import React, { useState } from 'react';
import { Ship, Filter, SlidersHorizontal } from 'lucide-react';

export default function AISControlPanel() {
  const [filterType, setFilterType] = useState('All');
  
  const vesselTypes = ['All', 'Cargo', 'Tanker', 'Passenger', 'Fishing', 'Other'];

  return (
    <div className="glass-card p-4 w-full text-[var(--text-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-medium text-sm flex items-center gap-2">
          <Ship size={16} className="text-[var(--accent-ocean)]" />
          VESSEL TRAFFIC
        </h3>
        <button className="text-[var(--text-tertiary)] hover:text-[var(--accent-ocean)] transition-colors">
          <SlidersHorizontal size={14} />
        </button>
      </div>

      <div className="mb-4">
        <label className="text-xs font-mono text-[var(--text-secondary)] mb-2 block">VESSEL TYPE</label>
        <div className="flex flex-wrap gap-2">
          {vesselTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                filterType === type 
                  ? 'bg-[var(--accent-ocean)] text-white' 
                  : 'bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-ocean)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="btn-secondary flex-1 text-xs py-2">Hide Routes</button>
        <button className="btn-primary flex-1 text-xs py-2">Follow Candidate</button>
      </div>
    </div>
  );
}
