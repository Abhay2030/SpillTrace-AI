"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Ring, Html, Line } from "@react-three/drei";

// ============================================================================
// 🌊 1. PHOTOREALISTIC OCEAN SHADER (Multi-Octave Waves + Solar Specular)
// ============================================================================
const RealisticOceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color("#000B18") },
    uOceanColor: { value: new THREE.Color("#004E89") },
    uSurfaceColor: { value: new THREE.Color("#00A8E8") },
    uFoamColor: { value: new THREE.Color("#C4F1F9") },
    uSunDirection: { value: new THREE.Vector3(10, 20, 10).normalize() },
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    // Harmonic wave superposition
    float getWave(vec3 p) {
      float swell = sin(p.x * 4.5 + uTime * 1.8) * cos(p.y * 4.5 + uTime * 1.4) * sin(p.z * 4.5 + uTime * 1.6);
      float chop  = sin(p.x * 13.0 - uTime * 2.8) * cos(p.z * 13.0 + uTime * 2.2) * 0.32;
      float micro = sin(p.y * 26.0 + uTime * 4.2) * sin(p.x * 26.0 - uTime * 3.8) * 0.14;
      return swell + chop + micro;
    }

    void main() {
      vec3 pos = position;
      float disp = getWave(pos) * 0.048;
      vDisplacement = disp;

      // Approximate perturbed normal using finite difference
      vec3 e = vec3(0.01, 0.0, 0.0);
      float dX = getWave(pos + e) - getWave(pos - e);
      float dY = getWave(pos + e.yxy) - getWave(pos - e.yxy);
      float dZ = getWave(pos + e.yyx) - getWave(pos - e.yyx);
      vec3 grad = vec3(dX, dY, dZ) * 2.5;
      vNormal = normalize(normal - grad);

      vec3 newPos = pos + normal * disp;
      vPosition = newPos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uOceanColor;
    uniform vec3 uSurfaceColor;
    uniform vec3 uFoamColor;
    uniform vec3 uSunDirection;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying float vDisplacement;

    void main() {
      vec3 norm = normalize(vNormal);
      vec3 viewDir = normalize(cameraPosition - vPosition);

      // Diffuse Lighting
      float diff = max(dot(norm, uSunDirection), 0.0);

      // Solar Specular Glint
      vec3 reflectDir = reflect(-uSunDirection, norm);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 42.0);

      // Fresnel Horizon Rim
      float fresnel = pow(1.0 - max(0.0, dot(viewDir, norm)), 3.0);

      // Depth gradient color blending
      vec3 color = mix(uDeepColor, uOceanColor, vDisplacement * 10.0 + 0.45);
      color = mix(color, uSurfaceColor, diff * 0.35 + 0.1);

      // Dynamic Foam Crests
      if (vDisplacement > 0.026) {
        float foamFactor = smoothstep(0.026, 0.05, vDisplacement);
        color = mix(color, uFoamColor, foamFactor * 0.85);
      }

      // Sun Specular Reflection & Fresnel Glow
      color += spec * vec3(1.0, 0.95, 0.8) * 0.75;
      color += fresnel * vec3(0.35, 0.75, 1.0) * 0.4;

      gl_FragColor = vec4(color, 0.95);
    }
  `,
};

// ============================================================================
// 🛢️ 2. IRIDESCENT THIN-FILM OIL SLICK SHADER
// ============================================================================
const OilSlickShader = {
  uniforms: {
    uTime: { value: 0 },
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float viewAngle = max(0.0, dot(viewDir, vNormal));
      
      // Thin-film interference color oscillation
      float filmThickness = length(vUv - vec2(0.5)) * 10.0;
      float phase = filmThickness * 3.0 + viewAngle * 8.0 + uTime * 1.2;

      vec3 c1 = vec3(0.05, 0.08, 0.12); // Dark Crude Base
      vec3 c2 = vec3(0.26, 0.4, 0.95);  // Electric Blue Iridescence
      vec3 c3 = vec3(0.95, 0.15, 0.55); // Magenta Rainbow Fringe
      vec3 c4 = vec3(0.15, 0.85, 0.65); // Cyan Sheen

      float t = sin(phase) * 0.5 + 0.5;
      vec3 iridColor = mix(c1, mix(c2, mix(c3, c4, sin(phase * 1.5) * 0.5 + 0.5), t), smoothstep(0.0, 0.45, length(vUv - vec2(0.5))));

      float alpha = smoothstep(0.5, 0.1, length(vUv - vec2(0.5))) * 0.88;
      gl_FragColor = vec4(iridColor, alpha);
    }
  `,
};

// ============================================================================
// 🚢 3. VESSEL DATA INTERFACE
// ============================================================================
interface MovingVessel {
  id: number;
  name: string;
  type: "Tanker" | "Container" | "Bulk" | "Patrol";
  mmsi: string;
  speedKnots: number;
  isSuspect?: boolean;
  position: THREE.Vector3;
  axis: THREE.Vector3;
  speed: number;
  wakeHistory: THREE.Vector3[];
}

export default function Globe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const oceanShaderRef = useRef<THREE.ShaderMaterial>(null!);
  const oilSlickShaderRef = useRef<THREE.ShaderMaterial>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const radarScanRef = useRef<THREE.Group>(null);

  // Memoized Uniforms
  const oceanUniforms = useMemo(() => RealisticOceanShader.uniforms, []);
  const oilUniforms = useMemo(() => OilSlickShader.uniforms, []);

  // 🚢 Generate 32 Dynamic Moving Vessels with Realistic Orbits
  const vesselFleet = useMemo(() => {
    const fleet: MovingVessel[] = [];
    const radius = 5.04;
    const types: ("Tanker" | "Container" | "Bulk" | "Patrol")[] = ["Tanker", "Container", "Bulk", "Patrol"];

    for (let i = 0; i < 32; i++) {
      const phi = Math.acos(-1 + (2 * i) / 32);
      const theta = Math.sqrt(32 * Math.PI) * phi;
      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );

      const randomVec = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2).normalize();
      const axis = new THREE.Vector3().crossVectors(pos, randomVec).normalize();
      const speed = (0.035 + Math.random() * 0.075) * (i % 2 === 0 ? 1 : -1);
      const isSuspect = i === 4; // Suspect Tanker linked to oil spill

      const wakeHistory: THREE.Vector3[] = [];
      for (let w = 0; w < 10; w++) {
        wakeHistory.push(pos.clone().applyAxisAngle(axis, -speed * w * 0.25));
      }

      fleet.push({
        id: i,
        name: isSuspect ? "MT ALFA SEAWAY" : `VESSEL-${100 + i}`,
        type: isSuspect ? "Tanker" : types[i % types.length],
        mmsi: `${235890000 + i * 1371}`,
        speedKnots: Number((13.5 + Math.random() * 7.5).toFixed(1)),
        isSuspect,
        position: pos,
        axis,
        speed,
        wakeHistory,
      });
    }
    return fleet;
  }, []);

  // 🛢️ Oil Spill Center Coordinates & Particle Drift Simulation
  const spillCenter = useMemo(() => new THREE.Vector3(1.8, 2.3, 4.1).normalize().multiplyScalar(5.03), []);

  // 40 Floating Oil Droplet Particles drifting along current
  const oilDropletParticles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < 45; i++) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 0.45,
        (Math.random() - 0.5) * 0.45,
        (Math.random() - 0.5) * 0.45
      );
      const pos = spillCenter.clone().add(offset).normalize().multiplyScalar(5.045);
      particles.push({ id: i, pos, offset, scale: 0.015 + Math.random() * 0.025 });
    }
    return particles;
  }, [spillCenter]);

  // AIS Trajectory Path from Suspect Ship to Slick Origin
  const aisTrajectoryCurve = useMemo(() => {
    const points: [number, number, number][] = [];
    const suspect = vesselFleet.find((v) => v.isSuspect);
    if (!suspect) return [];

    const start = suspect.position.clone();
    const end = spillCenter.clone();

    for (let i = 0; i <= 25; i++) {
      const t = i / 25;
      const interp = new THREE.Vector3().lerpVectors(start, end, t).normalize().multiplyScalar(5.06);
      points.push([interp.x, interp.y, interp.z]);
    }
    return points;
  }, [vesselFleet, spillCenter]);

  // Latitude / Longitude Grid Rings
  const gridRings = useMemo(() => [0.25, 0.5, 0.75, -0.25, -0.5, -0.75], []);

  // ============================================================================
  // ⏱️ ANIMATION LOOP (Realistic Waves, Ship Swell Pitching, Cloud Rotation)
  // ============================================================================
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Rotate Earth Globe
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.012;
    }

    // 2. Update Ocean Wave Shader Uniforms
    if (oceanShaderRef.current) {
      oceanShaderRef.current.uniforms.uTime.value = time;
    }

    // 3. Update Oil Slick Iridescence Shader
    if (oilSlickShaderRef.current) {
      oilSlickShaderRef.current.uniforms.uTime.value = time;
    }

    // 4. Orbit Clouds Layer
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.02;
    }

    // 5. Rotate Radar Scanner
    if (radarScanRef.current) {
      radarScanRef.current.rotation.z = time * 1.8;
    }

    // 6. Update Ship Positions & Dynamic Ocean Swell Pitch/Roll Physics
    vesselFleet.forEach((vessel) => {
      // Advance position along spherical orbit
      vessel.position.applyAxisAngle(vessel.axis, vessel.speed * delta);

      // Compute wave displacement at current ship position
      const swellHeight =
        Math.sin(vessel.position.x * 4.5 + time * 1.8) *
        Math.cos(vessel.position.y * 4.5 + time * 1.4) *
        0.048;

      // Adjust ship altitude dynamically on wave crests
      const currentRadius = 5.035 + swellHeight;
      vessel.position.normalize().multiplyScalar(currentRadius);

      // Update wake history
      vessel.wakeHistory.pop();
      vessel.wakeHistory.unshift(vessel.position.clone());
    });
  });

  return (
    <group ref={globeGroupRef}>
      {/* 🌊 Deep Core Earth Mesh */}
      <Sphere args={[4.96, 64, 64]}>
        <meshStandardMaterial color="#000714" roughness={0.95} metalness={0.05} />
      </Sphere>

      {/* 🌊 Real-Time Photorealistic Wave Shader Surface */}
      <Sphere args={[5.0, 128, 128]}>
        <shaderMaterial
          ref={oceanShaderRef}
          args={[RealisticOceanShader]}
          uniforms={oceanUniforms}
          transparent
        />
      </Sphere>

      {/* ☁️ Realistic Cloud Layer Sphere */}
      <Sphere ref={cloudsRef} args={[5.08, 64, 64]}>
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.12}
          roughness={1.0}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 🌌 Inner Atmosphere Rayleigh Glow */}
      <Sphere args={[5.16, 48, 48]}>
        <meshBasicMaterial color="#00A8E8" transparent opacity={0.07} side={THREE.BackSide} />
      </Sphere>

      {/* 🌌 Outer Atmospheric Rim Fresnel Glow */}
      <Sphere args={[5.42, 32, 32]}>
        <meshBasicMaterial
          color="#D4F1F9"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 🌐 Latitude / Longitude Grid Lines */}
      {gridRings.map((offset, i) => (
        <group key={i}>
          <Ring
            args={[
              5.01 * Math.cos(Math.asin(offset)),
              5.01 * Math.cos(Math.asin(offset)) + 0.0035,
              64,
            ]}
            position={[0, 5.01 * offset, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial color="#C4F1F9" transparent opacity={0.06} side={THREE.DoubleSide} />
          </Ring>
        </group>
      ))}

      {/* 🚢 REALISTIC MOVING VESSELS WITH SWELL PITCHING & BEACONS */}
      {vesselFleet.map((vessel) => {
        const up = vessel.position.clone().normalize();
        const forward = new THREE.Vector3().crossVectors(vessel.axis, up).normalize();
        const right = new THREE.Vector3().crossVectors(up, forward).normalize();
        const matrix = new THREE.Matrix4().makeBasis(right, up, forward);
        const baseRotation = new THREE.Euler().setFromRotationMatrix(matrix);

        return (
          <group key={vessel.id}>
            {/* Vessel Group with Dynamic Orientation */}
            <group position={vessel.position} rotation={baseRotation}>
              {/* Main Ship Hull */}
              <mesh position={[0, 0.012, 0]}>
                <boxGeometry args={[0.04, 0.02, 0.09]} />
                <meshStandardMaterial
                  color={vessel.isSuspect ? "#E63946" : "#EDF2F4"}
                  roughness={0.25}
                  metalness={0.7}
                  emissive={vessel.isSuspect ? "#E63946" : "#00A8E8"}
                  emissiveIntensity={vessel.isSuspect ? 0.75 : 0.2}
                />
              </mesh>

              {/* Bridge Cabin Superstructure */}
              <mesh position={[0, 0.03, -0.02]}>
                <boxGeometry args={[0.03, 0.022, 0.03]} />
                <meshStandardMaterial color="#2B2D42" roughness={0.3} />
              </mesh>

              {/* Navigation Light Beacons: Port (Red) & Starboard (Green) */}
              <mesh position={[-0.022, 0.025, 0.04]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="#FF1E27" />
              </mesh>
              <mesh position={[0.022, 0.025, 0.04]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="#00FF66" />
              </mesh>

              {/* Cargo Containers for Container Ships */}
              {vessel.type === "Container" && !vessel.isSuspect && (
                <group position={[0, 0.028, 0.015]}>
                  <mesh position={[-0.01, 0, 0]}>
                    <boxGeometry args={[0.014, 0.014, 0.035]} />
                    <meshStandardMaterial color="#FF6B6B" />
                  </mesh>
                  <mesh position={[0.01, 0, 0]}>
                    <boxGeometry args={[0.014, 0.014, 0.035]} />
                    <meshStandardMaterial color="#4ECDC4" />
                  </mesh>
                </group>
              )}

              {/* Suspect Vessel Interactive HUD Telemetry Badge */}
              {vessel.isSuspect && (
                <Html position={[0, 0.35, 0]} center className="pointer-events-none z-30">
                  <div className="bg-[#030712]/95 border border-[#E63946]/80 backdrop-blur-lg p-2.5 rounded-md text-[10px] font-mono text-white shadow-[0_0_20px_rgba(230,57,70,0.5)] whitespace-nowrap animate-pulse">
                    <div className="flex items-center gap-1.5 text-[#E63946] font-bold tracking-wider border-b border-[#E63946]/30 pb-1 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#E63946] animate-ping" />
                      SUSPECT VESSEL IDENTIFIED
                    </div>
                    <div className="text-gray-200 font-semibold">{vessel.name} ({vessel.type})</div>
                    <div className="text-gray-400">MMSI: {vessel.mmsi} | SPEED: {vessel.speedKnots} kts</div>
                    <div className="text-[#00F0FF] font-semibold mt-1">CONFIDENCE ATTRIBUTION: 98.4%</div>
                  </div>
                </Html>
              )}
            </group>

            {/* Dynamic Water Wake Trail Line */}
            {vessel.wakeHistory.length > 1 && (
              <Line
                points={vessel.wakeHistory.map((p) => [p.x, p.y, p.z])}
                color={vessel.isSuspect ? "#E63946" : "#C4F1F9"}
                lineWidth={1.8}
                transparent
                opacity={0.45}
              />
            )}
          </group>
        );
      })}

      {/* 🛢️ REAL-TIME THIN-FILM OIL SPILL DETECTION ZONE */}
      <group position={spillCenter} lookAt={spillCenter.clone().multiplyScalar(2)}>
        {/* Iridescent Thin-film Oil Slick Surface */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[0.7, 0.7, 32, 32]} />
          <shaderMaterial
            ref={oilSlickShaderRef}
            args={[OilSlickShader]}
            uniforms={oilUniforms}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Warning Perimeter Ring */}
        <mesh position={[0, 0, 0.018]}>
          <ringGeometry args={[0.38, 0.41, 64]} />
          <meshBasicMaterial color="#FF0055" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>

        {/* Holographic SAR Radar Scan Grid Sweep */}
        <group ref={radarScanRef} position={[0, 0, 0.022]}>
          <mesh>
            <ringGeometry args={[0.02, 0.46, 48, 1, 0, Math.PI * 0.6]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Interactive Oil Spill Telemetry HUD Badge */}
        <Html position={[0.45, 0.45, 0]} className="pointer-events-none z-30">
          <div className="bg-[#030712]/95 border border-[#00F0FF]/80 backdrop-blur-lg p-3 rounded-md text-[10px] font-mono text-white shadow-[0_0_25px_rgba(0,240,255,0.4)] whitespace-nowrap">
            <div className="flex items-center justify-between gap-4 text-[#00F0FF] font-bold border-b border-[#00F0FF]/30 pb-1.5 mb-1.5">
              <span>🛰️ SAR SPILL DETECTION #8941</span>
              <span className="text-[#FF0055] px-1.5 py-0.5 bg-[#FF0055]/20 rounded font-semibold animate-pulse">ACTIVE</span>
            </div>
            <div>COORDINATES: 24.12° N, 58.45° E (ARABIAN SEA)</div>
            <div>SLICK SURFACE AREA: 14.8 km²</div>
            <div>DRIFT TRAJECTORY: 2.8 kts @ 142° SE</div>
            <div className="text-[#FFB703] font-semibold mt-1">STATUS: AI ATTRIBUTION MATCH FOUND</div>
          </div>
        </Html>
      </group>

      {/* 🌊 Floating Oil Droplet Particles Drifting on Ocean Current */}
      {oilDropletParticles.map((particle) => (
        <mesh key={particle.id} position={particle.pos}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color="#111827" transparent opacity={0.75} />
        </mesh>
      ))}

      {/* 📈 Dynamic AIS Suspect Trajectory Line */}
      {aisTrajectoryCurve.length > 0 && (
        <Line
          points={aisTrajectoryCurve}
          color="#FF0055"
          lineWidth={2.8}
          dashed={true}
          dashScale={18}
          dashSize={0.45}
          gapSize={0.2}
        />
      )}
    </group>
  );
}
