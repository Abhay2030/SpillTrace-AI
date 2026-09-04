"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic import for WebGL context to prevent SSR issues
const SceneManager = dynamic(
  () => import("@/components/canvas/SceneManager"),
  { ssr: false }
);

const CinematicOverlay = dynamic(
  () => import("@/components/ui/CinematicOverlay"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[var(--bg-primary)]">
      {/* 3D WebGL Background Layer (Fixed) */}
      <div className="fixed inset-0 z-0">
        <SceneManager />
      </div>

      {/* Narrative Scroll Overlay (Absolute) */}
      <div className="absolute inset-0 z-10">
        <CinematicOverlay />
      </div>
    </main>
  );
}
