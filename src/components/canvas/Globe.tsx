"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, Ring, Html, Line } from "@react-three/drei";

// ============================================================================
// 🌍 1. GOOGLE EARTH REAL-TIME LANDMASS & OCEAN SHADER
// ============================================================================
const RealTimeEarthShader = {
  uniforms: {
    uTime: { value: 0 },
    uEarthTexture: { value: null as THREE.Texture | null },
    uHasTexture: { value: 0 }, // 1 if texture loaded, 0 if using procedural fallback
    uDeepOcean: { value: new THREE.Color("#011428") },
    uSurfaceOcean: { value: new THREE.Color("#005F73") },
    uFoamColor: { value: new THREE.Color("#94D2BD") },
    uSunDirection: { value: new THREE.Vector3(12, 18, 12).normalize() },
  },
  vertexShader: `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vDisplacement;

    // Harmonic ocean wave function
    float getWave(vec3 p) {
      float swell = sin(p.x * 5.0 + uTime * 2.0) * cos(p.y * 5.0 + uTime * 1.6) * sin(p.z * 5.0 + uTime * 1.8);
      float chop  = sin(p.x * 14.0 - uTime * 3.0) * cos(p.z * 14.0 + uTime * 2.4) * 0.3;
      return swell + chop;
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;
      
      float disp = getWave(pos) * 0.04;
      vDisplacement = disp;

      vec3 newPos = pos + normal * disp;
      vPosition = newPos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uEarthTexture;
    uniform float uHasTexture;
    uniform vec3 uDeepOcean;
    uniform vec3 uSurfaceOcean;
    uniform vec3 uFoamColor;
    uniform vec3 uSunDirection;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
      vec3 norm = normalize(vNormal);
      vec3 viewDir = normalize(cameraPosition - vPosition);

      // 1. Sample Earth Albedo Map (Google Earth Satellite Map)
      vec4 earthTex = texture2D(uEarthTexture, vUv);
      
      // Determine if pixel is Ocean vs Landmass
      // Ocean pixels are predominantly dark/blue; land pixels contain green/brown/red components
      float isLand = smoothstep(0.18, 0.35, earthTex.r * 0.5 + earthTex.g * 0.6 - earthTex.b * 0.4);
      
      if (uHasTexture < 0.5) {
        // Fallback procedural detection if texture loading
        isLand = 0.0;
      }

      // 2. Ocean Shader Calculation (Real-time Waves & Specular)
      float diff = max(dot(norm, uSunDirection), 0.0);
      vec3 reflectDir = reflect(-uSunDirection, norm);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 38.0);
      float fresnel = pow(1.0 - max(0.0, dot(viewDir, norm)), 2.8);

      vec3 oceanColor = mix(uDeepOcean, uSurfaceOcean, vDisplacement * 10.0 + 0.4);
      oceanColor += diff * vec3(0.0, 0.2, 0.4);
      
      if (vDisplacement > 0.025) {
        oceanColor = mix(oceanColor, uFoamColor, (vDisplacement - 0.025) * 12.0);
      }
      oceanColor += spec * vec3(1.0, 0.95, 0.8) * 0.7; // Sun Specular Glint

      // 3. Landmass Shader Calculation (Google Earth Satellite Terrain)
      vec3 landColor = earthTex.rgb;
      // Enhance land contrast & vegetation vibrant tones
      landColor = mix(landColor, vec3(0.1, 0.35, 0.15), 0.15); // Rich Forest Green accent
      landColor *= (diff * 0.75 + 0.4); // Topographic shading

      // 4. Blend Landmass & Ocean
      vec3 finalColor = mix(oceanColor, landColor, isLand);

      // 5. Atmosphere Horizon Fresnel Glow
      finalColor += fresnel * vec3(0.2, 0.75, 1.0) * 0.45;

      gl_FragColor = vec4(finalColor, 0.96);
    }
  `,
};

// ============================================================================
// 🛢️ 2. IRIDESCENT THIN-FILM OIL SLICK SHADER
// ============================================================================
const OilSlickShader = {
  uniforms: { uTime: { value: 0 } },
  vertexShader: `
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
      float filmThickness = length(vUv - vec2(0.5)) * 10.0;
      float phase = filmThickness * 3.0 + viewAngle * 8.0 + uTime * 1.2;

      vec3 c1 = vec3(0.04, 0.06, 0.1);  // Dark Crude
      vec3 c2 = vec3(0.2, 0.5, 0.95);   // Electric Blue
      vec3 c3 = vec3(0.95, 0.15, 0.55);  // Magenta Sheen
      vec3 c4 = vec3(0.1, 0.9, 0.7);    // Cyan Iridescence

      float t = sin(phase) * 0.5 + 0.5;
      vec3 iridColor = mix(c1, mix(c2, mix(c3, c4, sin(phase * 1.5) * 0.5 + 0.5), t), smoothstep(0.0, 0.45, length(vUv - vec2(0.5))));
      float alpha = smoothstep(0.5, 0.1, length(vUv - vec2(0.5))) * 0.9;
      gl_FragColor = vec4(iridColor, alpha);
    }
  `,
};

interface MovingVessel {
  id: number;
  name: string;
  type: string;
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
  const earthShaderRef = useRef<THREE.ShaderMaterial>(null!);
  const oilSlickShaderRef = useRef<THREE.ShaderMaterial>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const radarScanRef = useRef<THREE.Group>(null);

  // Load High-Resolution NASA / Google Earth Texture Map
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    // Official Three.js / NASA Earth Satellite Albedo Map
    const earthTextureUrl = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";

    loader.load(
      earthTextureUrl,
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        if (earthShaderRef.current) {
          earthShaderRef.current.uniforms.uEarthTexture.value = texture;
          earthShaderRef.current.uniforms.uHasTexture.value = 1.0;
        }
      },
      undefined,
      (err) => {
        console.warn("Failed loading external Earth texture, fallback active:", err);
      }
    );
  }, []);

  // Uniforms
  const earthUniforms = useMemo(() => RealTimeEarthShader.uniforms, []);
  const oilUniforms = useMemo(() => OilSlickShader.uniforms, []);

  // 🚢 Generate 32 Dynamic Ships Sailing around Earth
  const vesselFleet = useMemo(() => {
    const fleet: MovingVessel[] = [];
    const radius = 5.04;
    const types = ["Tanker", "Container", "Bulk", "Patrol"];

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
      const isSuspect = i === 4;

      const wakeHistory: THREE.Vector3[] = [];
      for (let w = 0; w < 8; w++) {
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

  // Oil Spill Coordinates (Arabian Sea near Gulf of Oman)
  const spillCenter = useMemo(() => new THREE.Vector3(1.8, 2.3, 4.1).normalize().multiplyScalar(5.03), []);

  // AIS Trajectory Curve from Suspect Vessel to Slick
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

  // Animation Loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Rotate Earth Globe
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.012;
    }

    // 2. Update Shader Time Uniform
    if (earthShaderRef.current) {
      earthShaderRef.current.uniforms.uTime.value = time;
    }
    if (oilSlickShaderRef.current) {
      oilSlickShaderRef.current.uniforms.uTime.value = time;
    }

    // 3. Orbit Clouds
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.018;
    }

    // 4. Rotate Radar Beam
    if (radarScanRef.current) {
      radarScanRef.current.rotation.z = time * 1.8;
    }

    // 5. Update Vessels & Ocean Wave Swell Pitching
    vesselFleet.forEach((vessel) => {
      vessel.position.applyAxisAngle(vessel.axis, vessel.speed * delta);
      const swellHeight = Math.sin(vessel.position.x * 4.5 + time * 1.8) * Math.cos(vessel.position.y * 4.5 + time * 1.4) * 0.04;
      vessel.position.normalize().multiplyScalar(5.035 + swellHeight);
      vessel.wakeHistory.pop();
      vessel.wakeHistory.unshift(vessel.position.clone());
    });
  });

  return (
    <group ref={globeGroupRef}>
      {/* 🌍 Deep Earth Inner Sphere */}
      <Sphere args={[4.96, 64, 64]}>
        <meshStandardMaterial color="#010A14" roughness={0.95} />
      </Sphere>

      {/* 🌍 REAL-TIME GOOGLE EARTH GLOBE (Satellite Landmass + Wave Ocean Shader) */}
      <Sphere args={[5.0, 128, 128]}>
        <shaderMaterial
          ref={earthShaderRef}
          args={[RealTimeEarthShader]}
          uniforms={earthUniforms}
          transparent
        />
      </Sphere>

      {/* ☁️ Orbiting Atmospheric Cloud Layer */}
      <Sphere ref={cloudsRef} args={[5.08, 64, 64]}>
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.14}
          roughness={1.0}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 🌌 Atmospheric Rayleigh Glow */}
      <Sphere args={[5.18, 48, 48]}>
        <meshBasicMaterial color="#00A8E8" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>

      {/* 🌌 Outer Horizon Fresnel Halo */}
      <Sphere args={[5.44, 32, 32]}>
        <meshBasicMaterial
          color="#D4F1F9"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 🌐 Grid Lines */}
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

      {/* 🚢 MOVING VESSELS WITH BEACONS & WAKES */}
      {vesselFleet.map((vessel) => {
        const up = vessel.position.clone().normalize();
        const forward = new THREE.Vector3().crossVectors(vessel.axis, up).normalize();
        const right = new THREE.Vector3().crossVectors(up, forward).normalize();
        const matrix = new THREE.Matrix4().makeBasis(right, up, forward);
        const baseRotation = new THREE.Euler().setFromRotationMatrix(matrix);

        return (
          <group key={vessel.id}>
            <group position={vessel.position} rotation={baseRotation}>
              {/* Ship Hull */}
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

              {/* Cabin Superstructure */}
              <mesh position={[0, 0.03, -0.02]}>
                <boxGeometry args={[0.03, 0.022, 0.03]} />
                <meshStandardMaterial color="#2B2D42" roughness={0.3} />
              </mesh>

              {/* Navigation Light Beacons */}
              <mesh position={[-0.022, 0.025, 0.04]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="#FF1E27" />
              </mesh>
              <mesh position={[0.022, 0.025, 0.04]}>
                <sphereGeometry args={[0.007, 8, 8]} />
                <meshBasicMaterial color="#00FF66" />
              </mesh>

              {/* Suspect Target Telemetry HUD Badge */}
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

            {/* Wake Trail Line */}
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

      {/* 🛢️ REAL-TIME OIL SPILL DETECTION ZONE */}
      <group position={spillCenter} lookAt={spillCenter.clone().multiplyScalar(2)}>
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

        <mesh position={[0, 0, 0.018]}>
          <ringGeometry args={[0.38, 0.41, 64]} />
          <meshBasicMaterial color="#FF0055" transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>

        <group ref={radarScanRef} position={[0, 0, 0.022]}>
          <mesh>
            <ringGeometry args={[0.02, 0.46, 48, 1, 0, Math.PI * 0.6]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>

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

      {/* AIS Trajectory Drift Line */}
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
