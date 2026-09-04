"use client";

import React, { useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Activity } from 'lucide-react';
import { useInvestigationStore, STEP_TIMESTAMPS, InvestigationStep } from '@/store/investigationStore';

const stepsOrder: InvestigationStep[] = [
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

export default function InvestigationTimeline() {
  const { 
    currentStep, 
    setStep, 
    isPlaying, 
    togglePlayback, 
    nextStep, 
    prevStep, 
    resetInvestigation,
    playbackSpeed,
    setSpeed 
  } = useInvestigationStore();

  const currentIndex = stepsOrder.indexOf(currentStep);

  // Playback timer hook
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const delay = 2200 / playbackSpeed;
      interval = setInterval(() => {
        nextStep();
      }, delay);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, nextStep]);

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-[#050B14]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-3 sm:p-4 shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-30 flex flex-col gap-2 sm:gap-3">
      
      {/* Top Controls & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono">
            <Activity size={15} className="text-[#00F0FF] animate-pulse shrink-0" />
            <span className="text-gray-400 font-semibold hidden xs:inline">TIMELINE:</span>
            <span className="text-[#00F0FF] font-bold bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/30 whitespace-nowrap">
              {STEP_TIMESTAMPS[currentStep]}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-xs font-mono text-white font-bold bg-white/5 border border-white/10 px-2.5 py-0.5 rounded whitespace-nowrap">
            STAGE 0{currentIndex + 1}: {currentStep.replace(/^\d+-/, '')}
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Playback Speed Controls */}
          <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/10 shrink-0">
            {[0.5, 1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSpeed(speed)}
                className={`px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono rounded transition-all ${
                  playbackSpeed === speed
                    ? 'bg-[#00F0FF] text-black font-bold shadow-[0_0_8px_#00F0FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={resetInvestigation}
              title="Reset Timeline"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RotateCcw size={13} />
            </button>

            <button
              onClick={prevStep}
              disabled={currentIndex === 0}
              title="Previous Step"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
            >
              <SkipBack size={13} />
            </button>

            <button
              onClick={togglePlayback}
              title={isPlaying ? "Pause Timeline" : "Play Timeline"}
              className="p-1.5 bg-[#00F0FF] text-black font-bold rounded-lg hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,240,255,0.4)] mx-0.5"
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>

            <button
              onClick={nextStep}
              disabled={currentIndex === stepsOrder.length - 1}
              title="Next Step"
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-30 transition-colors"
            >
              <SkipForward size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Step Nodes Track */}
      <div className="overflow-x-auto pb-1">
        <div className="relative flex items-center justify-between pt-1 pb-1 px-2 min-w-[550px] md:min-w-0">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-3 right-3 h-1 bg-white/10 -translate-y-1/2 rounded-full z-0" />
          
          {/* Active Animated Progress Track */}
          <div 
            className="absolute top-1/2 left-3 h-1 bg-gradient-to-r from-[#00A8E8] via-[#00F0FF] to-[#FF0055] -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-out shadow-[0_0_10px_#00F0FF]" 
            style={{ width: `calc(${(currentIndex / (stepsOrder.length - 1)) * 100}% - 8px)` }}
          />

          {stepsOrder.map((step, index) => {
            const isActive = index === currentIndex;
            const isPast = index < currentIndex;
            const labelName = step.split('-')[1];

            return (
              <button
                key={step}
                onClick={() => setStep(step)}
                className="relative z-10 group flex flex-col items-center gap-1 focus:outline-none shrink-0"
              >
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isActive 
                      ? 'bg-[#00F0FF] border-[#00F0FF] scale-125 shadow-[0_0_15px_#00F0FF]' 
                      : isPast 
                        ? 'bg-[#00A8E8] border-[#00A8E8]' 
                        : 'bg-[#050B14] border-gray-600 hover:border-gray-300'
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>

                <div
                  className={`text-[8px] sm:text-[10px] font-mono tracking-tighter whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-[#00F0FF] font-bold scale-105'
                      : isPast
                        ? 'text-gray-300'
                        : 'text-gray-500 group-hover:text-gray-300'
                  }`}
                >
                  {labelName}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
