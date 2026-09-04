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

export const STEP_TIMESTAMPS: Record<InvestigationStep, string> = {
  '01-DETECT': '08:20',
  '02-CHARACTERIZE': '08:27',
  '03-TRACE': '08:31',
  '04-CORRELATE': '08:36',
  '05-ATTRIBUTE': '08:41',
  '06-EXPLAIN': '08:45',
  '07-ASSESS': '08:46',
  '08-RESPOND': '08:52',
  '09-MONITOR': '09:00'
};

interface InvestigationState {
  currentStep: InvestigationStep;
  isPlaying: boolean;
  playbackSpeed: number; // 0.5, 1, 2, 5, 10
  selectedVesselId: string | null;
  mapMode: 'SATELLITE' | 'HYBRID' | 'ROADMAP' | 'TERRAIN';
  mode: 'DEMO' | 'LIVE';
  
  // Actions
  setStep: (step: InvestigationStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  togglePlayback: () => void;
  setSpeed: (speed: number) => void;
  selectVessel: (id: string | null) => void;
  setMapMode: (mode: 'SATELLITE' | 'HYBRID' | 'ROADMAP' | 'TERRAIN') => void;
  setMode: (mode: 'DEMO' | 'LIVE') => void;
  resetInvestigation: () => void;
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
  mapMode: 'SATELLITE',
  mode: 'DEMO',

  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => {
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      return { currentStep: steps[currentIndex + 1] };
    }
    // Auto-pause when reaching the end
    return { ...state, isPlaying: false };
  }),
  
  prevStep: () => set((state) => {
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      return { currentStep: steps[currentIndex - 1] };
    }
    return state;
  }),

  togglePlayback: () => set((state) => {
    // If at the end and clicking play, restart
    if (!state.isPlaying && state.currentStep === '09-MONITOR') {
      return { isPlaying: true, currentStep: '01-DETECT' };
    }
    return { isPlaying: !state.isPlaying };
  }),
  
  setSpeed: (speed) => set({ playbackSpeed: speed }),
  
  selectVessel: (id) => set({ selectedVesselId: id }),
  
  setMapMode: (mode) => set({ mapMode: mode }),
  
  setMode: (mode) => set({ mode }),

  resetInvestigation: () => set({ 
    currentStep: '01-DETECT', 
    isPlaying: false, 
    selectedVesselId: null 
  }),
}));
