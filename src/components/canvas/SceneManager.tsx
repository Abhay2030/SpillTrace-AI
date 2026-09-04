"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import React from "react";
import Globe from "./Globe";
import CameraRig from "./CameraRig";
import Satellite from "./Satellite";
import Incident from "./Incident";
import DataVisualization from "./DataVisualization";

export default function SceneManager() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "#02040a" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      <CameraRig />
      
      {/* Cinematic Objects */}
      <Globe />
      <Satellite />
      <Incident />
      <DataVisualization />
      
      <Environment preset="night" />
    </Canvas>
  );
}
