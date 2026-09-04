export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  section: string;
}

export const slides: SlideData[] = [
  {
    id: 1,
    title: "SPILLTRACE AI",
    subtitle: "FROM SPACE TO SUSPECT.",
    section: "opening",
  },
  {
    id: 2,
    title: "THE OCEAN LEAVES EVIDENCE.",
    subtitle: "BUT THE SOURCE OFTEN DOESN'T.",
    section: "problem",
  },
  {
    id: 3,
    title: "DETECTION IS NOT ATTRIBUTION.",
    subtitle: "THE INTELLIGENCE GAP",
    section: "gap",
  },
  {
    id: 4,
    title: "SPILLTRACE AI",
    subtitle: "ONE INCIDENT. ONE INTELLIGENCE PIPELINE.",
    section: "solution",
  },
  {
    id: 5,
    title: "SEE THE SPILL",
    subtitle: "DETECTION & CHARACTERIZATION",
    section: "detection",
  },
  {
    id: 6,
    title: "REWIND THE OCEAN.",
    subtitle: "BACKWARD & FORWARD DRIFT MODELLING",
    section: "trace",
  },
  {
    id: 7,
    title: "FIND THE TRAFFIC THAT MATTERS.",
    subtitle: "AIS CORRELATION & FILTERING",
    section: "ais",
  },
  {
    id: 8,
    title: "WHO CAUSED IT?",
    subtitle: "ATTRIBUTION & EXPLAINABILITY",
    section: "attribution",
  },
  {
    id: 9,
    title: "ASSESS THE THREAT.",
    subtitle: "ENVIRONMENTAL THREAT ASSESSMENT",
    section: "threat",
  },
  {
    id: 10,
    title: "FROM DETECTION TO ACTION.",
    subtitle: "RESPONSE INTELLIGENCE",
    section: "response",
  },
  {
    id: 11,
    title: "WHERE SHOULD THEY GO?",
    subtitle: "DIGITAL TWIN & OPTIMIZATION",
    section: "digitaltwin",
  },
  {
    id: 12,
    title: "CLOSED-LOOP INTELLIGENCE.",
    subtitle: "CONTINUOUS MONITORING",
    section: "monitoring",
  },
  {
    id: 13,
    title: "WHY SPILLTRACE AI?",
    subtitle: "DIFFERENTIATION & POSITIONING",
    section: "closing",
  },
];

// Demo vessel data
export interface VesselCandidate {
  id: string;
  name: string;
  rank: number;
  evidenceScore: number;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  factors: {
    temporal: number;
    spatial: number;
    trajectory: number;
    drift: number;
    behavioral: number;
    heading: number;
    originZone: number;
  };
  reasons: { text: string; positive: boolean }[];
}

export const vesselCandidates: VesselCandidate[] = [
  {
    id: "vessel-a",
    name: "VESSEL A",
    rank: 1,
    evidenceScore: 91.4,
    confidence: "HIGH",
    factors: {
      temporal: 96,
      spatial: 92,
      trajectory: 89,
      drift: 94,
      behavioral: 84,
      heading: 91,
      originZone: 93,
    },
    reasons: [
      { text: "Strong temporal match with estimated origin window", positive: true },
      { text: "Passed through probable origin zone", positive: true },
      { text: "Compatible heading at 247° matches drift vector", positive: true },
      { text: "High drift compatibility (94%)", positive: true },
      { text: "Behavioral anomaly: unexpected speed reduction", positive: true },
      { text: "AIS gap of 12 minutes near origin zone", positive: true },
    ],
  },
  {
    id: "vessel-b",
    name: "VESSEL B",
    rank: 2,
    evidenceScore: 74.2,
    confidence: "MEDIUM",
    factors: {
      temporal: 78,
      spatial: 71,
      trajectory: 69,
      drift: 72,
      behavioral: 65,
      heading: 80,
      originZone: 68,
    },
    reasons: [
      { text: "Within temporal window but at edge", positive: true },
      { text: "Partial spatial overlap with origin zone", positive: true },
      { text: "Outside strongest origin probability area", positive: false },
      { text: "Lower spatial overlap (71%)", positive: false },
      { text: "Incompatible trajectory angle", positive: false },
      { text: "No significant behavioral anomalies", positive: false },
    ],
  },
  {
    id: "vessel-c",
    name: "VESSEL C",
    rank: 3,
    evidenceScore: 61.8,
    confidence: "LOW",
    factors: {
      temporal: 62,
      spatial: 58,
      trajectory: 55,
      drift: 64,
      behavioral: 51,
      heading: 67,
      originZone: 54,
    },
    reasons: [
      { text: "Marginal temporal compatibility", positive: true },
      { text: "Passed near extended origin zone", positive: true },
      { text: "Poor drift compatibility (64%)", positive: false },
      { text: "Speed profile inconsistent with discharge", positive: false },
      { text: "Trajectory diverges from origin at T-6h", positive: false },
      { text: "No behavioral anomalies detected", positive: false },
    ],
  },
];

// Demo spill data
export const spillData = {
  confidence: 97.4,
  area: 8.4,
  centroid: { lat: 18.2847, lon: 71.5623 },
  estimatedAge: "6–12 hours",
  detectedAt: "2026-03-15T08:32:00Z",
  perimeter: 14.7,
  type: "Probable hydrocarbon",
};

// Demo filtering stages
export const filteringStages = [
  { label: "Total vessels in region", count: 247, color: "#556677" },
  { label: "Inside time window", count: 84, color: "#3b82f6" },
  { label: "Spatially relevant", count: 18, color: "#6366f1" },
  { label: "Trajectory-compatible", count: 5, color: "#06d6d6" },
  { label: "High-priority candidates", count: 3, color: "#10b981" },
];

// Risk assessment data
export const riskAssessment = [
  { category: "Ecological Risk", level: "HIGH" as const, score: 87 },
  { category: "Coastal Risk", level: "MEDIUM" as const, score: 64 },
  { category: "Fisheries Risk", level: "HIGH" as const, score: 82 },
  { category: "Navigation Risk", level: "MEDIUM" as const, score: 58 },
  { category: "Response Priority", level: "CRITICAL" as const, score: 94 },
];

// Monitoring timeline
export const monitoringTimeline = [
  { time: "T₀", area: 8.4, label: "Initial detection" },
  { time: "T+6h", area: 7.1, label: "First update" },
  { time: "T+12h", area: 5.8, label: "Response initiated" },
  { time: "T+24h", area: 3.2, label: "Significant reduction" },
];

// Competitive comparison
export interface CompetitorCapability {
  capability: string;
  satellite: boolean;
  trajectory: boolean;
  maritime: boolean;
  ais: boolean;
  emergency: boolean;
  spilltrace: boolean;
}

export const competitorMatrix: CompetitorCapability[] = [
  { capability: "Satellite spill detection", satellite: true, trajectory: false, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "Spill characterization", satellite: true, trajectory: false, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "Backward hindcasting", satellite: false, trajectory: true, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "Forward prediction", satellite: false, trajectory: true, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "AIS correlation", satellite: false, trajectory: false, maritime: true, ais: true, emergency: false, spilltrace: true },
  { capability: "Vessel candidate ranking", satellite: false, trajectory: false, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "Explainable evidence", satellite: false, trajectory: false, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "Environmental threat mapping", satellite: false, trajectory: false, maritime: false, ais: false, emergency: true, spilltrace: true },
  { capability: "Response intelligence", satellite: false, trajectory: false, maritime: false, ais: false, emergency: true, spilltrace: true },
  { capability: "Resource prioritization", satellite: false, trajectory: false, maritime: false, ais: false, emergency: true, spilltrace: true },
  { capability: "Continuous monitoring", satellite: true, trajectory: true, maritime: false, ais: false, emergency: true, spilltrace: true },
  { capability: "3D digital twin", satellite: false, trajectory: false, maritime: false, ais: false, emergency: false, spilltrace: true },
  { capability: "Unified investigation workflow", satellite: false, trajectory: false, maritime: false, ais: false, emergency: false, spilltrace: true },
];
