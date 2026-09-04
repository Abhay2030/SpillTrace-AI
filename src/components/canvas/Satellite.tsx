"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Cylinder, Box, Sphere, Ring, Html } from "@react-three/drei";

export default function Satellite() {
  const satGroup = useRef<THREE.Group>(null);
  const solarPanelRef = useRef<THREE.Group>(null);
  const radarBeamRef = useRef<THREE.Mesh>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (satGroup.current) {
      // 🛰️ Polar Orbit Trajectory around the Earth (Inclined LEO Orbit)
      const orbitRadius = 6.4;
      const speed = 0.22;
      const angle = time * speed;

      // Inclined orbital plane equation
      const x = Math.sin(angle) * orbitRadius;
      const z = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle * 2.0) * 1.8;

      satGroup.current.position.set(x, y, z);

      // Satellite always faces Earth center (0,0,0)
      satGroup.current.lookAt(0, 0, 0);
    }

    // Pulse radar laser beam opacity
    if (radarBeamRef.current) {
      const mat = radarBeamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + Math.sin(time * 6.0) * 0.08;
    }

    // Expand radar scanning footprint ring on ocean surface
    if (scanRingRef.current) {
      const pulseScale = 1 + Math.sin(time * 3.5) * 0.12;
      scanRingRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <group ref={satGroup}>
      {/* ================================================================== */}
      {/* 🛰️ 1. MAIN SATELLITE CHASSIS / BUS (Gold Thermal Kapton Foil)     */}
      {/* ================================================================== */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.65]} />
        <meshStandardMaterial
          color="#FFB703"
          metalness={0.95}
          roughness={0.12}
          emissive="#FF8800"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Silver Chrome Instrument Payload Bay */}
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[0.3, 0.3, 0.15]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ================================================================== */}
      {/* ☀️ 2. DUAL EXTENDED SOLAR ARRAY WINGS                              */}
      {/* ================================================================== */}
      <group ref={solarPanelRef} position={[0, 0, 0]}>
        {/* Left Solar Wing Frame */}
        <mesh position={[-1.15, 0, 0]}>
          <boxGeometry args={[1.8, 0.025, 0.45]} />
          <meshStandardMaterial color="#0A192F" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Left Solar Panel Cells (Blue Silicon Grid) */}
        <mesh position={[-1.15, 0.015, 0]}>
          <boxGeometry args={[1.72, 0.01, 0.4]} />
          <meshStandardMaterial color="#0052CC" roughness={0.1} metalness={0.95} emissive="#002266" emissiveIntensity={0.3} />
        </mesh>

        {/* Right Solar Wing Frame */}
        <mesh position={[1.15, 0, 0]}>
          <boxGeometry args={[1.8, 0.025, 0.45]} />
          <meshStandardMaterial color="#0A192F" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Right Solar Panel Cells (Blue Silicon Grid) */}
        <mesh position={[1.15, 0.015, 0]}>
          <boxGeometry args={[1.72, 0.01, 0.4]} />
          <meshStandardMaterial color="#0052CC" roughness={0.1} metalness={0.95} emissive="#002266" emissiveIntensity={0.3} />
        </mesh>

        {/* Solar Wing Connecting Boom Trusses */}
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 12]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 12]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* 📡 3. SYNTHETIC APERTURE RADAR (SAR) PLANAR ANTENNA               */}
      {/* ================================================================== */}
      {/* Rectangular C-Band SAR Antenna Array facing Earth */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.12, 0.05, 1.4]} />
        <meshStandardMaterial color="#0F172A" metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.1, 0.01, 1.35]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.6} metalness={0.9} />
      </mesh>

      {/* Parabolic Telemetry Dish Antenna */}
      <mesh position={[0, 0.22, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.95} roughness={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Optical Lens & Telemetry Status Beacon */}
      <mesh position={[0, 0, 0.43]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#00FF66" />
      </mesh>

      {/* ================================================================== */}
      {/* 🔦 4. VOLUMETRIC SAR RADAR SCANNING LASER CONE & FOOTPRINT        */}
      {/* ================================================================== */}
      {/* Volumetric Laser Cone projecting to Earth surface */}
      <Cylinder
        ref={radarBeamRef}
        args={[0.08, 1.9, 4.6, 32, 1, true]}
        position={[0, 0, 2.3]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Cylinder>

      {/* Scanning Ground Footprint Ring */}
      <mesh ref={scanRingRef} position={[0, 0, 4.6]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.75, 1.9, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* ================================================================== */}
      {/* 📊 5. SATELLITE HUD TELEMETRY DATA CALLOUT                         */}
      {/* ================================================================== */}
      <Html position={[0, 0.6, 0]} center className="pointer-events-none z-30">
        <div className="bg-[#030712]/95 border border-[#00F0FF]/80 backdrop-blur-xl p-2.5 rounded-lg text-[10px] font-mono text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] whitespace-nowrap">
          <div className="flex items-center gap-2 text-[#00F0FF] font-bold border-b border-[#00F0FF]/30 pb-1 mb-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
            ESA SENTINEL-1B SAR SATELLITE
          </div>
          <div className="text-gray-300">ORBIT: <span className="text-white font-bold">LEO POLAR (693 KM)</span></div>
          <div className="text-gray-300">SENSOR: <span className="text-[#00F0FF] font-semibold">C-BAND SYNTHETIC APERTURE RADAR</span></div>
          <div className="text-gray-300">SWATH MODE: <span className="text-[#FFB703] font-semibold">TOPSAR IW (250 KM)</span></div>
          <div className="text-[#00FF66] font-bold mt-1">STATUS: CONTINUOUS SURFACE SCAN ACTIVE</div>
        </div>
      </Html>
    </group>
  );
}
