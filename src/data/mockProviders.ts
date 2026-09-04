export interface VesselData {
  id: string;
  type: string;
  position: [number, number]; // [lng, lat]
  heading: number;
  speed: number;
  candidateScore?: number;
}

export interface IncidentData {
  id: string;
  center: [number, number];
  spillAreaKm2: number;
  confidence: number;
  timestamp: string;
}

export const mockIncident: IncidentData = {
  id: "INC-2026-09-04-ARABIAN",
  center: [65.234, 15.432], // Arabian Sea
  spillAreaKm2: 8.4,
  confidence: 97.4,
  timestamp: "2026-09-04T08:00:00Z"
};

// Generate some mock vessels around the incident
export const generateMockVessels = (): VesselData[] => {
  const vessels: VesselData[] = [];
  const [baseLng, baseLat] = mockIncident.center;
  
  // The prime suspect
  vessels.push({
    id: "VESSEL-82A",
    type: "Tanker",
    position: [baseLng + 0.1, baseLat + 0.05],
    heading: 45,
    speed: 12.5,
    candidateScore: 94.2
  });

  // Secondary candidate
  vessels.push({
    id: "VESSEL-41C",
    type: "Cargo",
    position: [baseLng - 0.2, baseLat + 0.15],
    heading: 120,
    speed: 14.0,
    candidateScore: 42.1
  });

  // Noise
  for (let i = 0; i < 245; i++) {
    vessels.push({
      id: `VESSEL-RND-${i}`,
      type: ["Cargo", "Tanker", "Fishing", "Passenger", "Other"][Math.floor(Math.random() * 5)],
      position: [baseLng + (Math.random() - 0.5) * 5, baseLat + (Math.random() - 0.5) * 5],
      heading: Math.floor(Math.random() * 360),
      speed: Math.random() * 20
    });
  }

  return vessels;
};

export const mockVessels = generateMockVessels();
