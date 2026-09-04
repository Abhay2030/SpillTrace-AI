"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Instances, Instance } from "@react-three/drei";

export default function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Generate random ship positions on the globe surface
  const ships = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      // Random spherical coordinates
      const phi = Math.acos(-1 + (2 * i) / 200);
      const theta = Math.sqrt(200 * Math.PI) * phi;
      const radius = 5.01; // Slightly above globe surface
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      temp.push({ position: [x, y, z] as [number, number, number], id: i });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.02; // Slow earth rotation
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base Ocean Earth */}
      <Sphere args={[5, 64, 64]}>
        <meshStandardMaterial 
          color="#0077B6" // Ocean Blue
          roughness={0.1}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Atmosphere Glow (Daytime) */}
      <Sphere args={[5.3, 32, 32]}>
        <meshBasicMaterial 
          color="#E0F7FA" 
          transparent 
          opacity={0.15} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Instanced Ships */}
      <Instances limit={200}>
        <boxGeometry args={[0.04, 0.02, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
        {ships.map((ship, i) => (
          <Instance
            key={ship.id}
            position={ship.position}
            // Point the ship outwards from the center of the earth
            rotation={[
              Math.atan2(Math.sqrt(ship.position[0]*ship.position[0] + ship.position[2]*ship.position[2]), ship.position[1]), 
              Math.atan2(ship.position[0], ship.position[2]), 
              0
            ]}
          />
        ))}
      </Instances>
    </group>
  );
}
