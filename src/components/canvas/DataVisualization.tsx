"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DataVisualization() {
  const dataGroup = useRef<THREE.Group>(null);
  const graphNodes = useRef<THREE.Group>(null);
  const threatZones = useRef<THREE.Group>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the evidence graph at Chapter 04 (Attribute)
      gsap.fromTo(
        graphNodes.current?.scale || {},
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          scrollTrigger: {
            trigger: ".chapter-04",
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      
      // In the future: Add trigger for Threat Zones at Chapter 05
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={dataGroup} position={[-1, 1, 3]} rotation={[0, 0, 0]}>
      {/* Evidence Graph Nodes */}
      <group ref={graphNodes}>
        {/* Central Suspect Node */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.2]} />
          <meshBasicMaterial color="#06d6d6" wireframe />
          <Html position={[0.3, 0, 0]} className="text-[10px] font-mono text-[#06d6d6] pointer-events-none whitespace-nowrap">
            HIGHEST-RANKED SOURCE
            <br />
            SCORE: 91.4
          </Html>
        </mesh>
        
        {/* Evidence Factors */}
        {[
          { label: "TIME MATCH", pos: [-0.6, 0.4, 0] },
          { label: "SPATIAL MATCH", pos: [0.6, 0.4, 0] },
          { label: "DRIFT MATCH", pos: [0, -0.6, 0] }
        ].map((node, i) => (
          <group key={i}>
            <mesh position={node.pos as [number, number, number]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
              <Html position={[0, -0.1, 0]} center className="text-[8px] font-mono text-white/70 pointer-events-none whitespace-nowrap">
                {node.label}
              </Html>
            </mesh>
            {/* Connecting line */}
            <line>
              <bufferGeometry>
                <float32BufferAttribute 
                  attach="attributes-position" 
                  args={[new Float32Array([...node.pos, 0, 0, 0]), 3]} 
                />
              </bufferGeometry>
              <lineBasicMaterial color="#06d6d6" transparent opacity={0.3} />
            </line>
          </group>
        ))}
      </group>

      {/* Threat Zones (Future Expansion) */}
      <group ref={threatZones} visible={false}>
        <mesh position={[1, 0, -1]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
