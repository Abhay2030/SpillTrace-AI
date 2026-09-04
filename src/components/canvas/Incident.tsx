"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line, Instance, Instances, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Incident() {
  const incidentGroup = useRef<THREE.Group>(null);
  
  // Create some dummy points for the drift trajectory
  const driftPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 20; i++) {
      pts.push(new THREE.Vector3(
        0 + Math.sin(i * 0.2) * 0.5, 
        0 + i * 0.1, 
        0 + Math.cos(i * 0.2) * 0.5
      ));
    }
    return pts;
  }, []);

  // Setup GSAP triggers for incident elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the incident group when arriving at Chapter 02
      gsap.fromTo(
        incidentGroup.current?.scale || {},
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          scrollTrigger: {
            trigger: ".chapter-02",
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    // Positioned near India on the globe (approximate spherical coordinates)
    <group ref={incidentGroup} position={[1.5, 2.5, 4]} rotation={[0.4, 0.2, 0]}>
      {/* The Spill Polygon (Simplified as a plane for now) */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1, 0.5]} />
        <meshBasicMaterial color="#06d6d6" transparent opacity={0.6} side={THREE.DoubleSide} />
        <Html position={[0.5, 0.5, 0]} className="text-white text-[10px] font-mono pointer-events-none">
          <div className="bg-[#0A0A0A]/80 border border-[#06d6d6]/50 p-1 px-2 whitespace-nowrap">
            <span className="text-[#06d6d6]">CONFIDENCE: 97.4%</span><br/>
            AREA: 8.4 KM²
          </div>
        </Html>
      </mesh>

      {/* Drift Trajectory Lines */}
      <Line 
        points={driftPoints} 
        color="#ffaa00" 
        lineWidth={2} 
        dashed={true}
        position={[-0.5, 0, 0]}
      />

      {/* Origin Zone */}
      <mesh position={[0.5, 2, 0.5]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.2} side={THREE.DoubleSide} />
        <Html position={[0.5, 0, 0]} className="text-[#ffaa00] text-[10px] font-mono pointer-events-none whitespace-nowrap">
          ORIGIN PROBABILITY ZONE
        </Html>
      </mesh>
    </group>
  );
}
