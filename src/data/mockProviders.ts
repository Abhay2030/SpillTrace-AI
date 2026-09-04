// Official MarineCadastre.gov AccessAIS Data Schema Standard
// Reference: NOAA / BOEM AccessAIS Data Dictionary (https://marinecadastre.gov/accessais/)

export interface MarineCadastreVesselData {
  id: string;                  // Compatible ID string
  type: string;                // Compatible Type string
  mmsi: string;                // 9-digit MMSI Number (e.g. "367891230")
  imo: string;                 // IMO Number (e.g. "IMO 9481920")
  vesselName: string;          // Official Ship Name
  callSign: string;            // Radio Call Sign (e.g. "WDB9182")
  vesselTypeCode: number;      // MarineCadastre Type Code (80=Tanker, 70=Cargo, 30=Fishing, 60=Passenger, 35=Tug/Military)
  vesselTypeGroup: string;     // Group Name (e.g. "Tanker (Code 80-89)")
  navStatus: string;           // Nav Status (0: Under way using engine, 1: At anchor, 5: Moored)
  sog: number;                 // Speed Over Ground in knots
  cog: number;                 // Course Over Ground (0-359°)
  heading: number;             // True Heading (0-359°)
  speed: number;               // Speed alias (SOG)
  position: [number, number];  // [Longitude, Latitude] WGS84
  dimensions: {
    length: number;            // Length in meters
    width: number;             // Width in meters
    draft: number;             // Current Draft depth in meters
  };
  transponderClass: "Class A" | "Class B"; // AIS Transponder Class
  baseDateTime: string;        // UTC Timestamp (ISO 8601)
  destination: string;         // Port of Destination
  eta: string;                 // Estimated Time of Arrival
  candidateScore?: number;    // SpillTrace AI Attribution Score
  isSuspect?: boolean;
}

export type VesselData = MarineCadastreVesselData;

export interface IncidentData {
  id: string;
  center: [number, number];
  spillAreaKm2: number;
  confidence: number;
  timestamp: string;
  sourceSat: string;
}

export const mockIncident: IncidentData = {
  id: "INC-2026-09-04-ARABIAN",
  center: [65.234, 15.432], // Arabian Sea
  spillAreaKm2: 14.8,
  confidence: 98.4,
  timestamp: "2026-09-04T08:00:00Z",
  sourceSat: "ESA SENTINEL-1 C-BAND SAR / NOAA ACCESSAIS",
};

// Generate Mock Vessels following MarineCadastre.gov AccessAIS Standards
export const generateMockVessels = (): MarineCadastreVesselData[] => {
  const vessels: MarineCadastreVesselData[] = [];
  const [baseLng, baseLat] = mockIncident.center;
  
  // Suspect #1: MT ALFA SEAWAY (Oil Tanker - Code 80)
  vessels.push({
    id: "VESSEL-82A",
    type: "Tanker",
    mmsi: "235890142",
    imo: "IMO 9481920",
    vesselName: "MT ALFA SEAWAY",
    callSign: "WDB9182",
    vesselTypeCode: 80,
    vesselTypeGroup: "Tanker (Code 80-89)",
    navStatus: "0: Under way using engine",
    sog: 14.2,
    cog: 142.5,
    heading: 140,
    speed: 14.2,
    position: [baseLng + 0.08, baseLat + 0.04],
    dimensions: { length: 274, width: 48, draft: 14.8 },
    transponderClass: "Class A",
    baseDateTime: "2026-09-04T07:45:00Z",
    destination: "IN MUMBAI / PERS GULF",
    eta: "2026-09-06T12:00:00Z",
    candidateScore: 98.4,
    isSuspect: true,
  });

  // Candidate #2: MV PACIFIC STAR (Container - Code 70)
  vessels.push({
    id: "VESSEL-41C",
    type: "Cargo",
    mmsi: "367123987",
    imo: "IMO 9128301",
    vesselName: "MV PACIFIC STAR",
    callSign: "KJKL78",
    vesselTypeCode: 70,
    vesselTypeGroup: "Cargo (Code 70-79)",
    navStatus: "0: Under way using engine",
    sog: 18.5,
    cog: 210.0,
    heading: 208,
    speed: 18.5,
    position: [baseLng - 0.22, baseLat + 0.18],
    dimensions: { length: 334, width: 42, draft: 11.2 },
    transponderClass: "Class A",
    baseDateTime: "2026-09-04T07:50:00Z",
    destination: "US BALTIMORE",
    eta: "2026-09-12T18:00:00Z",
    candidateScore: 41.2,
    isSuspect: false,
  });

  // MarineCadastre Fleet Noise
  const vesselTypePool = [
    { code: 80, group: "Tanker (Code 80-89)", prefix: "TANKER", type: "Tanker" },
    { code: 70, group: "Cargo (Code 70-79)", prefix: "CARGO CONTAINER", type: "Cargo" },
    { code: 30, group: "Fishing (Code 30)", prefix: "FISHING TRAWLER", type: "Fishing" },
    { code: 60, group: "Passenger (Code 60-69)", prefix: "CRUISE LINER", type: "Passenger" },
    { code: 35, group: "Tug/Military (Code 35)", prefix: "PATROL ESCORT", type: "Other" },
  ];

  for (let i = 0; i < 30; i++) {
    const typeObj = vesselTypePool[i % vesselTypePool.length];
    const sogVal = Number((8 + Math.random() * 12).toFixed(1));
    vessels.push({
      id: `VESSEL-RND-${i}`,
      type: typeObj.type,
      mmsi: `${367000000 + i * 1493}`,
      imo: `IMO ${9000000 + i * 1111}`,
      vesselName: `${typeObj.prefix} ${100 + i}`,
      callSign: `CALL-${i + 10}`,
      vesselTypeCode: typeObj.code,
      vesselTypeGroup: typeObj.group,
      navStatus: i % 5 === 0 ? "1: At anchor" : "0: Under way using engine",
      sog: sogVal,
      cog: Math.floor(Math.random() * 360),
      heading: Math.floor(Math.random() * 360),
      speed: sogVal,
      position: [baseLng + (Math.random() - 0.5) * 4, baseLat + (Math.random() - 0.5) * 4],
      dimensions: { length: 120 + i * 5, width: 20 + (i % 5), draft: 6.5 + (i % 4) },
      transponderClass: "Class A",
      baseDateTime: "2026-09-04T08:00:00Z",
      destination: "INTERNATIONAL WATERS",
      eta: "2026-09-08T00:00:00Z",
    });
  }

  return vessels;
};

export const mockVessels = generateMockVessels();
