"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";

export default function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Base Earth */}
      <Sphere ref={globeRef} args={[5, 64, 64]}>
        <meshStandardMaterial 
          color="#061224" 
          roughness={0.8}
          metalness={0.2}
          wireframe={true} // Temporary placeholder for procedural shader/texture
          wireframeLinewidth={0.5}
        />
      </Sphere>
      
      {/* Atmosphere Glow */}
      <Sphere args={[5.2, 32, 32]}>
        <meshBasicMaterial 
          color="#06d6d6" 
          transparent 
          opacity={0.05} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}
