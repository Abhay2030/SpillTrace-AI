"use client";

import React, { useState } from 'react';
import Map, { NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useInvestigationStore } from '@/store/investigationStore';
import { Layers, Maximize, Minus, Plus, Compass } from 'lucide-react';

export default function InvestigationMap() {
  const { mapMode, setMapMode } = useInvestigationStore();
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Default to a generic dark/satellite hybrid map style for maritime data
  // In a real app, you would swap these URLs based on the mapMode
  const mapStyleUrl = mapMode === 'SATELLITE' || mapMode === 'HYBRID' 
    ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" // Placeholder for actual satellite
    : "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--shadow-elegant)]">
      <Map
        initialViewState={{
          longitude: 65.0, // Arabian Sea
          latitude: 15.0,
          zoom: 4,
          pitch: 45
        }}
        mapStyle={mapStyleUrl}
        interactive={true}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        <ScaleControl position="bottom-left" />

        {/* Custom Map Controls Layer */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          
          {/* Map Mode Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="w-10 h-10 bg-[var(--surface-glass)] backdrop-blur rounded shadow-[var(--shadow-elegant)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              title="Map View"
            >
              <Layers size={18} />
            </button>
            
            {showLayerMenu && (
              <div className="absolute right-12 top-0 bg-[var(--surface-glass)] backdrop-blur border border-[var(--border-subtle)] rounded shadow-[var(--shadow-floating)] p-2 min-w-[120px] flex flex-col gap-1">
                {(['SATELLITE', 'HYBRID', 'ROADMAP', 'TERRAIN'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => {
                      setMapMode(mode);
                      setShowLayerMenu(false);
                    }}
                    className={`text-left px-3 py-2 text-xs font-mono rounded transition-colors ${
                      mapMode === mode 
                        ? 'bg-[var(--accent-ocean)] text-white' 
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
        
        {/* Placeholder for Data Layers (Polygons, Lines, Instances) */}
        {/* <Source id="spill-polygon" type="geojson" data={...}> ... </Source> */}
      </Map>
    </div>
  );
}
