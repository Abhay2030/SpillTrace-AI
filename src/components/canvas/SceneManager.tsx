"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import React from "react";
import Globe from "./Globe";

export default function SceneManager() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "#02040a" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      {/* 
        This is where the cinematic objects will go.
        For now, just the Globe.
      */}
      <Globe />
      
      <Environment preset="night" />
    </Canvas>
  );
}
