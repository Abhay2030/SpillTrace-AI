"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ShieldAlert, Satellite, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useInvestigationStore } from "@/store/investigationStore";

export default function IntroVideoModal() {
  const { isIntroVideoOpen, closeIntroVideo } = useInvestigationStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeIntroVideo();
      }
    };

    if (isIntroVideoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isIntroVideoOpen, closeIntroVideo]);

  // Restart video playback when modal opens
  useEffect(() => {
    if (isIntroVideoOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.log("Autoplay prevented:", err));
    }
  }, [isIntroVideoOpen]);

  return (
    <AnimatePresence>
      {isIntroVideoOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeIntroVideo}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl bg-[#030914] border border-[#00F0FF]/40 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <Play size={16} className="fill-[#00F0FF]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
                      OFFICIAL SYSTEM INTRO & DEMO
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 font-bold">
                      HD VIDEO
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
                    SpillTrace AI — From Space to Suspect
                  </h3>
                </div>
              </div>

              <button
                onClick={closeIntroVideo}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Close intro video"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden border-y border-white/10">
              <video
                ref={videoRef}
                src="/spill_trace_ai_video.mp4"
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
              />

              {/* Decorative Corner Framing */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#00F0FF]/60 pointer-events-none" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#00F0FF]/60 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#00F0FF]/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#00F0FF]/60 pointer-events-none" />
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 bg-[#020712] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Satellite size={14} className="text-[#00B4D8]" />
                  <span>Sentinel-1 SAR Satellite</span>
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Sparkles size={14} className="text-[#F59E0B]" />
                  <span>Reverse Ocean Drift Model</span>
                </div>
                <span className="text-white/20">•</span>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <ShieldAlert size={14} className="text-[#E63946]" />
                  <span>Vessel AIS Attribution</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={closeIntroVideo}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-xs font-mono text-gray-300 font-semibold transition-colors cursor-pointer"
                >
                  Close Video
                </button>
                <Link
                  href="/investigate"
                  onClick={closeIntroVideo}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0077B6] to-[#00B4D8] hover:from-[#0096C7] hover:to-[#48CAE4] text-xs font-mono text-white font-bold tracking-wider shadow-[0_0_20px_rgba(0,180,216,0.4)] transition-all cursor-pointer"
                >
                  <span>LAUNCH INVESTIGATION</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
