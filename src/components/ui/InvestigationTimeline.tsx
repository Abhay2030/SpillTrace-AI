"use client";

import React, { useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
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

  // Playback hook
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      // Base speed is 2000ms per step. Adjust by playbackSpeed (e.g. 10x = 200ms)
      const delay = 2000 / playbackSpeed;
      interval = setInterval(() => {
        nextStep();
      }, delay);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, nextStep]);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-[var(--surface-glass)] backdrop-blur-md border border-[var(--border-subtle)] rounded-xl p-4 shadow-[var(--shadow-floating)] z-10 flex flex-col gap-4">
      
      {/* Controls & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[var(--text-secondary)]">INCIDENT TIMELINE</span>
          <span className="text-[var(--text-tertiary)] px-2">|</span>
          <span className="text-[var(--accent-ocean)] font-bold">{STEP_TIMESTAMPS[currentStep]}</span>
          <span className="text-[var(--text-primary)] ml-2">{currentStep.replace(/^\d+-/, '')}</span>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Playback Speed */}
          <div className="flex bg-[var(--bg-secondary)] rounded overflow-hidden border border-[var(--border-subtle)]">
            {[0.5, 1, 2, 5, 10].map(speed => (
              <button
                key={speed}
                onClick={() => setSpeed(speed)}
                className={`px-2 py-1 text-[10px] font-mono transition-colors ${playbackSpeed === speed ? 'bg-[var(--accent-ocean)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-glass)]'}`}
              >
                {speed}x
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-1">
             <button onClick={resetInvestigation} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"><RotateCcw size={14} /></button>
             <button onClick={prevStep} disabled={currentIndex === 0} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"><SkipBack size={14} /></button>
             <button onClick={togglePlayback} className="p-1.5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full hover:scale-105 transition-transform mx-1">
               {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
             </button>
             <button onClick={nextStep} disabled={currentIndex === stepsOrder.length - 1} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"><SkipForward size={14} /></button>
          </div>
        </div>
      </div>

      {/* Node Graph */}
      <div className="relative flex items-center justify-between pt-2">
        {/* Progress Line Background */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--border-subtle)] -translate-y-1/2 z-0" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-[var(--accent-ocean)] -translate-y-1/2 z-0 transition-all duration-500 ease-out" 
          style={{ width: `${(currentIndex / (stepsOrder.length - 1)) * 100}%` }}
        />

        {stepsOrder.map((step, index) => {
          const isActive = index === currentIndex;
          const isPast = index < currentIndex;
          
          return (
            <button
              key={step}
              onClick={() => setStep(step)}
              className="relative z-10 group flex flex-col items-center gap-1"
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                isActive 
                  ? 'bg-[var(--accent-ocean)] border-[var(--accent-ocean)] scale-125' 
                  : isPast 
                    ? 'bg-[var(--accent-ocean)] border-[var(--accent-ocean)]' 
                    : 'bg-[var(--bg-primary)] border-[var(--border-medium)] hover:border-[var(--text-secondary)]'
              }`} />
              <div className={`absolute top-4 text-[9px] font-mono tracking-tighter whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-[var(--text-primary)] font-bold' : 'text-[var(--text-tertiary)]'}`}>
                {step.split('-')[1]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
