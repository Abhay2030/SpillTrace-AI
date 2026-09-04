import { create } from 'zustand';

export type InvestigationStep = 
  | '01-DETECT'
  | '02-CHARACTERIZE'
  | '03-TRACE'
  | '04-CORRELATE'
  | '05-ATTRIBUTE'
  | '06-EXPLAIN'
  | '07-ASSESS'
  | '08-RESPOND'
  | '09-MONITOR';

interface InvestigationState {
  currentStep: InvestigationStep;
  isPlaying: boolean;
  playbackSpeed: number; // 1x, 2x, 5x
  selectedVesselId: string | null;
  mapMode: 'SATELLITE' | 'HYBRID' | 'ROADMAP' | 'TERRAIN';
  
  // Actions
  setStep: (step: InvestigationStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  togglePlayback: () => void;
  setSpeed: (speed: number) => void;
  selectVessel: (id: string | null) => void;
  setMapMode: (mode: 'SATELLITE' | 'HYBRID' | 'ROADMAP' | 'TERRAIN') => void;
}

const steps: InvestigationStep[] = [
  '01-DETECT',
  '02-CHARACTERIZE',
  '03-TRACE',
  '04-CORRELATE',
  '05-ATTRIBUTE',
  '06-EXPLAIN',
  '07-ASSESS',
  '08-RESPOND',
  '09-MONITOR'
];

export const useInvestigationStore = create<InvestigationState>((set) => ({
  currentStep: '01-DETECT',
  isPlaying: false,
  playbackSpeed: 1,
  selectedVesselId: null,
  mapMode: 'SATELLITE', // Defaulting to premium satellite view for the investigation

  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => {
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      return { currentStep: steps[currentIndex + 1] };
    }
    return state;
  }),
  
  prevStep: () => set((state) => {
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      return { currentStep: steps[currentIndex - 1] };
    }
    return state;
  }),

  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setSpeed: (speed) => set({ playbackSpeed: speed }),
  
  selectVessel: (id) => set({ selectedVesselId: id }),
  
  setMapMode: (mode) => set({ mapMode: mode }),
}));
