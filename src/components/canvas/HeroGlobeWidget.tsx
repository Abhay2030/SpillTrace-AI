"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Globe from "./Globe";
import Satellite from "./Satellite";

export default function HeroGlobeWidget() {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-[#020610]">
      <Canvas
        camera={{ position: [0, 1.5, 12], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.6} />
        <directionalLight position={[12, 18, 12]} intensity={3.5} color="#ffffff" />
        <directionalLight position={[-10, 10, -10]} intensity={1.2} color="#e0f7fa" />

        {/* 3D Real-Time Earth Globe with Ocean Wave Shader & Oil Spill Anomaly */}
        <Globe />

        {/* 3D Sentinel-1 SAR Satellite orbiting around Globe with Laser Scanning Cone */}
        <Satellite />

        {/* Dynamic Auto-Rotation Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true} 
          autoRotateSpeed={1.2}
          rotateSpeed={0.8}
        />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}
