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
      style={{ background: "transparent" }}
    >
      {/* Bright ambient light for a daytime ocean scene */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 20, 10]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-10, 10, -10]} intensity={1.0} color="#e0f7fa" />
      
      <CameraRig />
      
      {/* Cinematic Objects */}
      <Globe />
      <Satellite />
      <Incident />
      <DataVisualization />
      
      <Environment preset="sunset" />
    </Canvas>
  );
}
