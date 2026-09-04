"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";
import { slides } from "@/data/slides";
import { ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react";

import Slide01Opening from "@/components/slides/Slide01Opening";
import Slide02Problem from "@/components/slides/Slide02Problem";
import Slide03IntelligenceGap from "@/components/slides/Slide03IntelligenceGap";
import Slide04Solution from "@/components/slides/Slide04Solution";
import Slide05Detection from "@/components/slides/Slide05Detection";
import Slide06Trace from "@/components/slides/Slide06Trace";
import Slide07AISCorrelation from "@/components/slides/Slide07AISCorrelation";
import Slide08Attribution from "@/components/slides/Slide08Attribution";
import Slide09ThreatAssessment from "@/components/slides/Slide09ThreatAssessment";
import Slide10ResponseIntel from "@/components/slides/Slide10ResponseIntel";
import Slide11DigitalTwin from "@/components/slides/Slide11DigitalTwin";
import Slide12Monitoring from "@/components/slides/Slide12Monitoring";
import Slide13WhySpillTrace from "@/components/slides/Slide13WhySpillTrace";

const slideComponents = [
  Slide01Opening,
  Slide02Problem,
  Slide03IntelligenceGap,
  Slide04Solution,
  Slide05Detection,
  Slide06Trace,
  Slide07AISCorrelation,
  Slide08Attribution,
  Slide09ThreatAssessment,
  Slide10ResponseIntel,
  Slide11DigitalTwin,
  Slide12Monitoring,
  Slide13WhySpillTrace,
];

const slideVariants = {
  enter: (direction: "forward" | "backward") => ({
    opacity: 0,
    y: direction === "forward" ? 20 : -20,
    scale: 0.99,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: (direction: "forward" | "backward") => ({
    opacity: 0,
    y: direction === "forward" ? -20 : 20,
    scale: 0.99,
  }),
};

export default function DeckContainer() {
  const {
    currentSlide,
    direction,
    totalSlides,
    nextSlide,
    prevSlide,
    goToSlide,
    progress,
  } = useSlideNavigation();

  const [showGrid, setShowGrid] = useState(false);

  const CurrentSlideComponent = slideComponents[currentSlide];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[var(--bg-primary)]">
      {/* Slide Area */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar (Ultra Minimal) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent z-50">
        <motion.div
          className="h-full bg-[var(--text-primary)]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Navigation controls (Editorial & Clean) */}
      <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-center">
        <div className="flex items-center gap-10 px-8 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-lg">
          {/* Left: Slide info */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </span>
          </div>

          {/* Center: Slide dots (Widely Spaced) */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentSlide
                    ? "w-4 h-1.5 bg-[var(--text-primary)]"
                    : "w-1.5 h-1.5 bg-[var(--bg-elevated)] hover:bg-[var(--text-tertiary)]"
                }`}
              />
            ))}
          </div>

          {/* Right: Nav buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-[var(--border-subtle)]" />
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-30 focus:outline-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-30 focus:outline-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid overview modal */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            className="absolute inset-0 z-[100] bg-[var(--bg-primary)] backdrop-blur-md flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-5xl">
              <div className="flex items-center justify-between mb-8 border-b border-[var(--border-subtle)] pb-4">
                <h2 className="text-lg font-display font-medium text-[var(--text-primary)]">Slide Overview</h2>
                <button
                  onClick={() => setShowGrid(false)}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-mono uppercase tracking-widest"
                >
                  Close [ESC]
                </button>
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      goToSlide(i);
                      setShowGrid(false);
                    }}
                    className={`p-4 text-left rounded-lg transition-all border ${
                      i === currentSlide 
                        ? "border-[var(--text-primary)] bg-[var(--bg-secondary)]" 
                        : "border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[var(--text-secondary)] block mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-medium text-[var(--text-primary)] line-clamp-3 leading-snug">
                      {slide.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint (first slide only) */}
      {currentSlide === 0 && (
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-[var(--text-tertiary)] z-40 font-mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, times: [0, 0.1, 0.8, 1], delay: 2 }}
        >
          <span>Navigate with</span>
          <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-secondary)]">→</kbd>
        </motion.div>
      )}
    </div>
  );
}
