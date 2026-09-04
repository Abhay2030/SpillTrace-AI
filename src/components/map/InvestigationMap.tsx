"use client";

import React, { useState, useEffect, useRef } from 'react';
import Map, { NavigationControl, ScaleControl, Source, Layer, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useInvestigationStore, InvestigationStep } from '@/store/investigationStore';
import { Layers } from 'lucide-react';
import { mockIncident, mockVessels } from '@/data/mockProviders';

// MapLibre Layer Styles
const spillLayerStyle = {
  id: 'spill-area',
  type: 'fill' as const,
  paint: {
    'fill-color': '#e11d48', // var(--risk-critical)
    'fill-opacity': 0.4,
    'fill-outline-color': '#be123c'
  }
};

const vesselLayerStyle = {
  id: 'vessels-point',
  type: 'circle' as const,
  paint: {
    'circle-radius': 4,
    'circle-color': [
      'match',
      ['get', 'id'],
      'VESSEL-82A', '#e11d48', // Critical
      'VESSEL-41C', '#94a3b8', // Eliminated
      '#0ea5e9' // Default
    ],
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff'
  }
};

// Coordinate configurations for camera choreography
const STEP_CAMERAS: Record<InvestigationStep, { center: [number, number], zoom: number, pitch: number }> = {
  '01-DETECT': { center: [65.0, 15.0], zoom: 4, pitch: 0 },
  '02-CHARACTERIZE': { center: mockIncident.center, zoom: 11, pitch: 30 },
  '03-TRACE': { center: mockIncident.center, zoom: 10, pitch: 45 },
  '04-CORRELATE': { center: mockIncident.center, zoom: 8, pitch: 20 },
  '05-ATTRIBUTE': { center: mockIncident.center, zoom: 12, pitch: 60 },
  '06-EXPLAIN': { center: mockIncident.center, zoom: 12, pitch: 60 },
  '07-ASSESS': { center: [65.5, 15.2], zoom: 9, pitch: 45 },
  '08-RESPOND': { center: [65.5, 15.2], zoom: 9, pitch: 45 },
  '09-MONITOR': { center: [65.0, 15.0], zoom: 5, pitch: 0 },
};

export default function InvestigationMap() {
  const { mapMode, setMapMode, currentStep } = useInvestigationStore();
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const mapRef = useRef<MapRef>(null);

  // Default to a generic dark/satellite hybrid map style for maritime data
  const mapStyleUrl = mapMode === 'SATELLITE' || mapMode === 'HYBRID' 
    ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    : "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

  // Live Animation State
  const [liveVessels, setLiveVessels] = useState(mockVessels);
  const [spillRadius, setSpillRadius] = useState(0.05);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000; // seconds
      lastTime = time;

      // Animate vessels based on heading and speed
      setLiveVessels(prev => prev.map(v => {
        // Heading 0 is North (Y+), 90 is East (X+)
        const speedScale = 0.0005; // Make movement visible for the demo
        const dx = Math.sin(v.heading * (Math.PI / 180)) * v.speed * speedScale * delta;
        const dy = Math.cos(v.heading * (Math.PI / 180)) * v.speed * speedScale * delta;
        
        return {
          ...v,
          position: [v.position[0] + dx, v.position[1] + dy]
        };
      }));

      // Slowly expand/drift the spill polygon to simulate live physics
      setSpillRadius(prev => (prev < 0.15 ? prev + (0.0002 * delta) : prev));

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle Camera Choreography
  useEffect(() => {
    if (mapRef.current) {
      const camera = STEP_CAMERAS[currentStep];
      mapRef.current.flyTo({
        center: camera.center,
        zoom: camera.zoom,
        pitch: camera.pitch,
        duration: 2000, // Cinematic 2-second transition
        essential: true
      });
    }
  }, [currentStep]);

  // Dynamic GeoJSON for Spill Polygon
  const spillGeojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [mockIncident.center[0] - spillRadius, mockIncident.center[1] - spillRadius],
            [mockIncident.center[0] + spillRadius, mockIncident.center[1] - spillRadius],
            [mockIncident.center[0] + spillRadius, mockIncident.center[1] + spillRadius],
            [mockIncident.center[0] - spillRadius, mockIncident.center[1] + spillRadius],
            [mockIncident.center[0] - spillRadius, mockIncident.center[1] - spillRadius]
          ]]
        },
        properties: { id: mockIncident.id }
      }
    ]
  };

  // Dynamic GeoJSON for Vessels
  const vesselsGeojson = {
    type: 'FeatureCollection',
    features: liveVessels.map(v => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: v.position },
      properties: { id: v.id, type: v.type }
    }))
  };

  const showVessels = ['04-CORRELATE', '05-ATTRIBUTE', '06-EXPLAIN'].includes(currentStep);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--shadow-elegant)]">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 65.0,
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
        
        {/* Data Layers */}
        {/* @ts-expect-error valid geojson structure */}
        <Source id="spill-source" type="geojson" data={spillGeojson}>
           <Layer {...spillLayerStyle} />
        </Source>

        {showVessels && (
          // @ts-expect-error valid geojson structure
          <Source id="vessels-source" type="geojson" data={vesselsGeojson}>
            {/* @ts-expect-error valid maplibre style */}
            <Layer {...vesselLayerStyle} />
          </Source>
        )}
      </Map>
    </div>
  );
}
