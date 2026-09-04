"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Instances, Instance, Ring } from "@react-three/drei";

export default function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  
  const ships = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 200);
      const theta = Math.sqrt(200 * Math.PI) * phi;
      const radius = 5.02;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      temp.push({ position: [x, y, z] as [number, number, number], id: i });
    }
    return temp;
  }, []);

  // Grid lines (latitude circles)
  const gridLines = useMemo(() => {
    const lines = [];
    for (let i = 1; i < 6; i++) {
      lines.push(i * 0.3);
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Deep Ocean Core */}
      <Sphere args={[4.98, 64, 64]}>
        <meshStandardMaterial color="#023E8A" roughness={0.9} metalness={0.1} />
      </Sphere>

      {/* Ocean Surface with gradient feel */}
      <Sphere args={[5, 64, 64]}>
        <meshPhysicalMaterial 
          color="#0077B6"
          roughness={0.15}
          metalness={0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.3}
          transmission={0.1}
        />
      </Sphere>
      
      {/* Inner Atmosphere */}
      <Sphere args={[5.15, 48, 48]}>
        <meshBasicMaterial 
          color="#90E0EF" 
          transparent 
          opacity={0.06} 
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer Atmosphere Glow */}
      <Sphere args={[5.4, 32, 32]}>
        <meshBasicMaterial 
          color="#CAF0F8" 
          transparent 
          opacity={0.08} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Latitude Grid Rings */}
      {gridLines.map((offset, i) => (
        <group key={i}>
          <Ring args={[5.01 * Math.cos(Math.asin(offset)), 5.01 * Math.cos(Math.asin(offset)) + 0.005, 64]} position={[0, 5.01 * offset, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#CAF0F8" transparent opacity={0.08} side={THREE.DoubleSide} />
          </Ring>
          <Ring args={[5.01 * Math.cos(Math.asin(offset)), 5.01 * Math.cos(Math.asin(offset)) + 0.005, 64]} position={[0, -5.01 * offset, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#CAF0F8" transparent opacity={0.08} side={THREE.DoubleSide} />
          </Ring>
        </group>
      ))}

      {/* Instanced Ships */}
      <Instances limit={200}>
        <boxGeometry args={[0.04, 0.015, 0.08]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} emissive="#CAF0F8" emissiveIntensity={0.3} />
        {ships.map((ship) => (
          <Instance
            key={ship.id}
            position={ship.position}
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
