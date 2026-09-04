"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Ring, Html, Line } from "@react-three/drei";

// Shader for dynamic animated ocean surface with wave displacement & crest foam
const OceanMaterialShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color("#022B49") },
    uSurfaceColor: { value: new THREE.Color("#0077B6") },
    uFoamColor: { value: new THREE.Color("#90E0EF") },
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    // Multi-octave wave displacement
    float wave(vec3 p) {
      float w1 = sin(p.x * 5.0 + uTime * 2.0) * cos(p.y * 5.0 + uTime * 1.5) * sin(p.z * 5.0 + uTime * 1.8);
      float w2 = sin(p.x * 12.0 - uTime * 3.0) * cos(p.z * 12.0 + uTime * 2.5) * 0.4;
      return w1 + w2;
    }

    void main() {
      vNormal = normal;
      vec3 pos = position;
      float disp = wave(pos) * 0.04;
      vDisplacement = disp;
      vec3 newPosition = pos + normal * disp;
      vPosition = newPosition;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uSurfaceColor;
    uniform vec3 uFoamColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - max(0.0, dot(viewDir, vNormal)), 2.5);
      
      // Base water color gradient based on displacement depth
      vec3 color = mix(uDeepColor, uSurfaceColor, vDisplacement * 12.0 + 0.5);
      
      // Wave crest foam highlights
      if (vDisplacement > 0.025) {
        color = mix(color, uFoamColor, (vDisplacement - 0.025) * 15.0);
      }
      
      // Atmosphere rim specular glow
      color += fresnel * 0.35 * vec3(0.5, 0.88, 1.0);
      gl_FragColor = vec4(color, 0.94);
    }
  `,
};

// Interface for moving ships on the sphere
interface MovingShip {
  id: number;
  name: string;
  type: string;
  mmsi: string;
  speedKnots: number;
  isSuspect?: boolean;
  position: THREE.Vector3;
  axis: THREE.Vector3;
  speed: number;
  wakeTrail: THREE.Vector3[];
}

export default function Globe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const oceanShaderRef = useRef<THREE.ShaderMaterial>(null!);
  const suspectShipRef = useRef<THREE.Group>(null);
  const radarSweepRef = useRef<THREE.Group>(null);
  const spillSlickRef = useRef<THREE.Mesh>(null);

  // Shader uniforms object memoization
  const oceanUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color("#022B49") },
      uSurfaceColor: { value: new THREE.Color("#0077B6") },
      uFoamColor: { value: new THREE.Color("#90E0EF") },
    }),
    []
  );

  // Initialize dynamic moving ships around the sphere
  const movingShipsData = useMemo(() => {
    const ships: MovingShip[] = [];
    const radius = 5.04;
    const vesselTypes = ["Oil Tanker", "Cargo Container", "Bulk Carrier", "LNG Tanker", "Chemical Carrier"];

    for (let i = 0; i < 30; i++) {
      // Golden ratio spherical distribution
      const phi = Math.acos(-1 + (2 * i) / 30);
      const theta = Math.sqrt(30 * Math.PI) * phi;
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );

      // Random rotation axis perpendicular to initial position vector
      const randomVec = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const axis = new THREE.Vector3().crossVectors(pos, randomVec).normalize();
      
      const speed = (0.04 + Math.random() * 0.08) * (i % 2 === 0 ? 1 : -1);
      const isSuspect = i === 3; // Suspect ship linked to oil spill

      // Pre-fill wake trail points
      const wakeTrail: THREE.Vector3[] = [];
      for (let t = 0; t < 8; t++) {
        const trailPos = pos.clone().applyAxisAngle(axis, -speed * t * 0.3);
        wakeTrail.push(trailPos);
      }

      ships.push({
        id: i,
        name: isSuspect ? "MV OCEAN CROWN" : `VESSEL-${100 + i}`,
        type: vesselTypes[i % vesselTypes.length],
        mmsi: `${235000000 + i * 1493}`,
        speedKnots: Number((12 + Math.random() * 8).toFixed(1)),
        isSuspect,
        position: pos,
        axis,
        speed,
        wakeTrail,
      });
    }
    return ships;
  }, []);

  // Latitude / Longitude grid rings
  const gridRings = useMemo(() => {
    const rings = [];
    for (let i = 1; i <= 5; i++) {
      rings.push(i * 0.3);
    }
    return rings;
  }, []);

  // Oil spill slick & trajectory coordinates (Middle East / Arabian Sea region)
  const spillCenter = useMemo(() => new THREE.Vector3(1.8, 2.4, 4.0).normalize().multiplyScalar(5.03), []);

  // AIS trajectory line connecting suspect ship to oil slick origin
  const spillTrajectoryPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const suspectShip = movingShipsData.find((s) => s.isSuspect);
    if (!suspectShip) return [];

    const start = suspectShip.position.clone();
    const end = spillCenter.clone();

    // Generate arc curve along sphere surface
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const interp = new THREE.Vector3().lerpVectors(start, end, t).normalize().multiplyScalar(5.06);
      points.push([interp.x, interp.y, interp.z]);
    }
    return points;
  }, [movingShipsData, spillCenter]);

  // Main animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Rotate Globe slowly
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.015;
    }

    // 2. Update Ocean Shader Time Uniform for real-time waves
    if (oceanShaderRef.current) {
      oceanShaderRef.current.uniforms.uTime.value = time;
    }

    // 3. Move ships along spherical orbits
    movingShipsData.forEach((ship) => {
      ship.position.applyAxisAngle(ship.axis, ship.speed * delta);
      // Update trail
      ship.wakeTrail.pop();
      ship.wakeTrail.unshift(ship.position.clone());
    });

    // 4. Pulse Radar Sweep Beam
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = time * 1.5;
    }

    // 5. Animate Oil Slick pulse / expansion
    if (spillSlickRef.current) {
      const scale = 1 + Math.sin(time * 2.0) * 0.05;
      spillSlickRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* 🌊 Deep Ocean Core Mesh */}
      <Sphere args={[4.97, 64, 64]}>
        <meshStandardMaterial color="#011627" roughness={0.9} metalness={0.1} />
      </Sphere>

      {/* 🌊 Real-time Animated Wave Ocean Surface */}
      <Sphere args={[5.0, 128, 128]}>
        <shaderMaterial
          ref={oceanShaderRef}
          args={[OceanMaterialShader]}
          uniforms={oceanUniforms}
          transparent
        />
      </Sphere>

      {/* 🌌 Inner Atmosphere Glow */}
      <Sphere args={[5.15, 48, 48]}>
        <meshBasicMaterial color="#00B4D8" transparent opacity={0.06} side={THREE.BackSide} />
      </Sphere>

      {/* 🌌 Outer Atmosphere Rim Fresnel Halo */}
      <Sphere args={[5.38, 32, 32]}>
        <meshBasicMaterial
          color="#CAF0F8"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 🌐 Grid Rings */}
      {gridRings.map((offset, i) => (
        <group key={i}>
          <Ring
            args={[
              5.01 * Math.cos(Math.asin(offset)),
              5.01 * Math.cos(Math.asin(offset)) + 0.004,
              64,
            ]}
            position={[0, 5.01 * offset, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial color="#90E0EF" transparent opacity={0.07} side={THREE.DoubleSide} />
          </Ring>
          <Ring
            args={[
              5.01 * Math.cos(Math.asin(offset)),
              5.01 * Math.cos(Math.asin(offset)) + 0.004,
              64,
            ]}
            position={[0, -5.01 * offset, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial color="#90E0EF" transparent opacity={0.07} side={THREE.DoubleSide} />
          </Ring>
        </group>
      ))}

      {/* 🚢 Real-Time Moving Ships */}
      {movingShipsData.map((ship) => {
        const up = ship.position.clone().normalize();
        // Compute orientation rotation
        const forward = new THREE.Vector3().crossVectors(ship.axis, up).normalize();
        const matrix = new THREE.Matrix4().makeBasis(
          new THREE.Vector3().crossVectors(up, forward).normalize(),
          up,
          forward
        );
        const rotation = new THREE.Euler().setFromRotationMatrix(matrix);

        return (
          <group key={ship.id} position={ship.position} rotation={rotation} ref={ship.isSuspect ? suspectShipRef : null}>
            {/* Vessel Hull */}
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.035, 0.018, 0.08]} />
              <meshStandardMaterial
                color={ship.isSuspect ? "#FF0055" : "#FFFFFF"}
                emissive={ship.isSuspect ? "#FF0055" : "#00B4D8"}
                emissiveIntensity={ship.isSuspect ? 0.8 : 0.3}
                roughness={0.2}
              />
            </mesh>

            {/* Navigation Light Beacon */}
            <mesh position={[0, 0.025, 0.03]}>
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial color={ship.isSuspect ? "#FF0055" : "#00F0FF"} />
            </mesh>

            {/* Suspect Vessel Interactive Callout Badge */}
            {ship.isSuspect && (
              <Html position={[0, 0.3, 0]} center className="pointer-events-none z-20">
                <div className="bg-[#050B14]/90 border border-[#FF0055]/70 backdrop-blur-md p-2 rounded text-[10px] font-mono text-white shadow-[0_0_15px_rgba(255,0,85,0.4)] whitespace-nowrap animate-pulse">
                  <div className="flex items-center gap-1 text-[#FF0055] font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#FF0055] animate-ping" />
                    TARGET SUSPECT VESSEL
                  </div>
                  <div className="text-gray-300 mt-0.5">{ship.name} ({ship.type})</div>
                  <div className="text-gray-400">MMSI: {ship.mmsi} | SPD: {ship.speedKnots} kts</div>
                  <div className="text-[#00F0FF] font-semibold mt-0.5">ATTRIBUTION SCORE: 98.4%</div>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* 🛢️ REAL-TIME OIL SPILL DETECTION ZONE */}
      <group position={spillCenter} lookAt={spillCenter.clone().multiplyScalar(2)}>
        {/* Animated Expanding Oil Slick Polygon */}
        <mesh ref={spillSlickRef} position={[0, 0, 0.01]}>
          <ringGeometry args={[0.02, 0.28, 32]} />
          <meshBasicMaterial color="#0A0E17" transparent opacity={0.88} side={THREE.DoubleSide} />
        </mesh>

        {/* Iridescent Sheen Outer Ring */}
        <mesh position={[0, 0, 0.012]}>
          <ringGeometry args={[0.26, 0.36, 32]} />
          <meshBasicMaterial color="#FF5500" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Pulsing Warning Perimeter Ring */}
        <mesh position={[0, 0, 0.015]}>
          <ringGeometry args={[0.38, 0.40, 48]} />
          <meshBasicMaterial color="#FF0055" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>

        {/* 🛰️ Rotating SAR Radar Scan Beam */}
        <group ref={radarSweepRef} position={[0, 0, 0.02]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[0.01, 0.45, 32, 1, 0, Math.PI / 2]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Oil Spill Live Telemetry Tooltip */}
        <Html position={[0.4, 0.4, 0]} className="pointer-events-none z-30">
          <div className="bg-[#050B14]/95 border border-[#00F0FF]/80 backdrop-blur-md p-2.5 rounded text-[10px] font-mono text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] whitespace-nowrap">
            <div className="flex items-center justify-between gap-3 text-[#00F0FF] font-bold border-b border-[#00F0FF]/30 pb-1 mb-1">
              <span>🛰️ SAR SPILL ANOMALY #8941</span>
              <span className="text-[#FF0055] px-1 bg-[#FF0055]/20 rounded">LIVE</span>
            </div>
            <div>LAT/LON: 24.12° N, 58.45° E</div>
            <div>ESTIMATED AREA: 14.2 km²</div>
            <div>DRIFT VECTOR: 2.8 kts @ 142° SE</div>
            <div className="text-[#FFB703] font-semibold mt-1">STATUS: ATTRIBUTION IN PROGRESS</div>
          </div>
        </Html>
      </group>

      {/* 📈 AIS Trajectory Drift Line connecting suspect ship to oil slick */}
      {spillTrajectoryPoints.length > 0 && (
        <Line
          points={spillTrajectoryPoints}
          color="#FF0055"
          lineWidth={2.5}
          dashed={true}
          dashScale={15}
          dashSize={0.4}
          gapSize={0.2}
        />
      )}
    </group>
  );
}
