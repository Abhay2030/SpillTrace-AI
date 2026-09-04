"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Cylinder, Box } from "@react-three/drei";

export default function Satellite() {
  const satGroup = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (satGroup.current) {
      // Orbit around the globe
      satGroup.current.position.x = Math.sin(t * 0.2) * 6;
      satGroup.current.position.z = Math.cos(t * 0.2) * 6;
      satGroup.current.position.y = Math.sin(t * 0.1) * 2;
      
      // Always look at earth center
      satGroup.current.lookAt(0, 0, 0);
    }
    
    if (beamRef.current) {
      // Pulse the radar beam opacity
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(t * 5) * 0.1;
    }
  });

  return (
    <group ref={satGroup}>
      {/* Satellite Body */}
      <Box args={[0.2, 0.2, 0.4]}>
        <meshStandardMaterial color="#8899aa" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* Solar Panels */}
      <Box args={[1.2, 0.02, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#06d6d6" metalness={0.9} roughness={0.1} />
      </Box>

      {/* Radar Scan Beam */}
      <Cylinder 
        ref={beamRef}
        args={[0.01, 1.5, 4, 32]} 
        position={[0, 0, 2]} 
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial 
          color="#06d6d6" 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Cylinder>
    </group>
  );
}
