"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Satellite, Droplets, Ship, Search, ShieldAlert, Brain, Activity, Radio, ChevronDown, Crosshair, AlertTriangle, ArrowRight, Compass } from "lucide-react";

const HeroGlobeWidget = dynamic(
  () => import("@/components/canvas/HeroGlobeWidget"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

const images = {
  hero: "/assets/images/hero_ocean_spill_1788527688574.png",
  detect: "/assets/images/detect_sar_imagery_1788527705067.png",
  trace: "/assets/images/trace_currents_viz_1788527721432.png",
  correlate: "/assets/images/correlate_traffic_map_1788528008902.png",
  attribute: "/assets/images/suspect_vessel_1788528074308.png",
  explain: "/assets/images/suspect_vessel_1788528074308.png", // Reuse suspect vessel for explain, or keep it dark
  assess: "/assets/images/threat_coastal_1788528093544.png",
  respond: "/assets/images/response_operation_1788528110944.png",
  monitor: "/assets/images/detect_sar_imagery_1788527705067.png", // Satellite monitoring again
  final: "/assets/images/clean_ocean_horizon_1788528135740.png"
};

export default function CinematicOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure 3D Earth Globe & Satellite Canvas remains 100% visible
    const canvas = document.querySelector('canvas');
    if (canvas) {
        gsap.set(canvas, { opacity: 1 });
    }

    const ctx = gsap.context(() => {
      // 1. Content Fade Ins
      const panels = gsap.utils.toArray(".chapter-panel") as HTMLElement[];
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".content"),
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
            scrollTrigger: { trigger: panel, start: "top 65%", end: "top 25%", scrub: 1 },
          }
        );
      });

      // 2. Animated Counters
      gsap.utils.toArray(".count-up").forEach((el) => {
        const target = el as HTMLElement;
        const end = parseFloat(target.dataset.value || "0");
        gsap.fromTo(target, { innerText: "0" }, {
          innerText: end, duration: 2, ease: "power2.out", snap: { innerText: end % 1 === 0 ? 1 : 0.1 },
          scrollTrigger: { trigger: target, start: "top 85%", toggleActions: "play none none none" },
        });
      });

      // 3. Background Image Crossfades (Cinematic Sequencing)
      const bgs = gsap.utils.toArray(".bg-layer") as HTMLElement[];
      
      // Initially, hero is visible
      gsap.set(bgs[0], { opacity: 1, scale: 1 });
      gsap.set(bgs.slice(1), { opacity: 0, scale: 1.1 });

      panels.forEach((panel, i) => {
        if (i === 0) return; // Skip hero
        
        // When panel i enters, fade out panel i-1 background and fade in panel i background
        ScrollTrigger.create({
          trigger: panel,
          start: "top 60%", // When the new section is starting to come in
          end: "top 10%",
          scrub: true,
          animation: gsap.timeline()
            .to(bgs[i-1], { opacity: 0, scale: 1.05, duration: 1 }, 0)
            .to(bgs[i], { opacity: 1, scale: 1, duration: 1 }, 0)
        });
      });

      // Subtle continuous pan/zoom on backgrounds to make them feel alive
      bgs.forEach(bg => {
        gsap.to(bg.querySelector('img'), {
          scale: 1.05,
          xPercent: -1,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10 pointer-events-none">
      
      {/* ===== FIXED CINEMATIC BACKGROUNDS ===== */}
      <div ref={bgRef} className="fixed inset-0 z-0 bg-[#0A0A0A]">
        {/* Layer 0: Hero */}
        <div className="bg-layer absolute inset-0"><Image src={images.hero} alt="Ocean Spill" fill className="object-cover opacity-60" priority /></div>
        {/* Layer 1: Detect */}
        <div className="bg-layer absolute inset-0"><Image src={images.detect} alt="SAR Imagery" fill className="object-cover opacity-60" /></div>
        {/* Layer 2: Trace */}
        <div className="bg-layer absolute inset-0"><Image src={images.trace} alt="Currents" fill className="object-cover opacity-60" /></div>
        {/* Layer 3: Correlate */}
        <div className="bg-layer absolute inset-0"><Image src={images.correlate} alt="Traffic Map" fill className="object-cover opacity-60" /></div>
        {/* Layer 4: Attribute */}
        <div className="bg-layer absolute inset-0"><Image src={images.attribute} alt="Suspect Vessel" fill className="object-cover opacity-50" /></div>
        {/* Layer 5: Explain */}
        <div className="bg-layer absolute inset-0"><Image src={images.explain} alt="Analysis" fill className="object-cover opacity-30" /></div>
        {/* Layer 6: Assess */}
        <div className="bg-layer absolute inset-0"><Image src={images.assess} alt="Coastal Threat" fill className="object-cover opacity-60" /></div>
        {/* Layer 7: Respond */}
        <div className="bg-layer absolute inset-0"><Image src={images.respond} alt="Response" fill className="object-cover opacity-60" /></div>
        {/* Layer 8: Monitor */}
        <div className="bg-layer absolute inset-0"><Image src={images.monitor} alt="Monitoring" fill className="object-cover opacity-40" /></div>
        {/* Layer 9: Final Hero */}
        <div className="bg-layer absolute inset-0"><Image src={images.final} alt="Clean Ocean" fill className="object-cover opacity-80" /></div>
        
        {/* Global Dark Vignette for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      {/* ===== SCROLLING CONTENT OVERLAYS ===== */}
      <div className="relative z-10 text-white">
        
        {/* ===== HERO ===== */}
        <section className="chapter-panel h-[150vh] flex items-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <img src="/logo.png" alt="SpillTrace AI Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(0,180,216,0.4)]" />
              <div className="flex items-center gap-2">
                <span className="threat-badge low bg-[#10B981]/20 border-[#10B981]/40 backdrop-blur-sm">MINISTRY OF DISASTER MANAGEMENT</span>
                <span className="threat-badge bg-[#0077B6]/20 border-[#0077B6]/40 text-[#00B4D8] backdrop-blur-sm">NTRO</span>
                <span className="threat-badge bg-[#00B4D8]/20 border-[#00B4D8]/40 text-[#CAF0F8] backdrop-blur-sm">SENTINEL-1</span>
              </div>
            </div>
            <p className="text-xs font-mono text-[#00B4D8] tracking-[0.3em] mb-4 uppercase drop-shadow-md">Critical Anomaly Detected</p>
            <h1 className="text-7xl md:text-9xl font-display font-bold text-white mb-4 tracking-tight leading-[0.9] drop-shadow-2xl">
              SPILLTRACE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">AI</span>
            </h1>
            <p className="text-2xl text-gray-300 font-light max-w-lg mb-12 drop-shadow-md leading-relaxed">
              From Space to Suspect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/investigate" className="btn-primary flex items-center justify-center bg-[#0077B6] hover:bg-[#023E8A] border border-[#00B4D8]/50 shadow-[0_0_20px_rgba(0,180,216,0.3)]">
                Launch Intelligence Center
              </Link>
              <Link href="/about" className="btn-secondary flex items-center justify-center text-white border-white/30 hover:bg-white/10 backdrop-blur-sm">
                Explore Technology
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="flex gap-8 text-center bg-black/40 p-6 rounded-2xl backdrop-blur-md border border-white/10 max-w-2xl mb-16">
              <div className="flex-1"><p className="text-3xl font-bold font-display text-white count-up" data-value="247">0</p><p className="text-[10px] font-mono text-gray-400 tracking-widest mt-1">VESSELS ANALYZED</p></div>
              <div className="w-px bg-white/20" />
              <div className="flex-1"><p className="text-3xl font-bold font-display text-[#E63946]"><span className="count-up" data-value="94.2">0</span>%</p><p className="text-[10px] font-mono text-gray-400 tracking-widest mt-1">CONFIDENCE</p></div>
              <div className="w-px bg-white/20" />
              <div className="flex-1"><p className="text-3xl font-bold font-display text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)]"><span className="count-up" data-value="8.4">8.4</span> km²</p><p className="text-[10px] font-mono text-gray-300 font-bold tracking-widest mt-1">SPILL AREA</p></div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-8 flex flex-col items-center sm:items-start gap-3 opacity-60">
              <div className="w-6 h-10 rounded-full border border-white/50 flex justify-center pt-2">
                <div className="w-1.5 h-2.5 rounded-full bg-white animate-scroll" />
              </div>
              <span className="text-[9px] font-mono text-white tracking-widest uppercase">Scroll to Reconstruct Incident</span>
            </div>
          </div>
        </section>

        {/* ===== CH01: DETECT ===== */}
        <section className="chapter-panel h-[150vh] flex items-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-2xl">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Satellite size={16} className="text-[#00B4D8]" />
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">01 / DETECT</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              See the Invisible.
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-lg mb-10 leading-relaxed drop-shadow-md">
              Sentinel-1 Synthetic Aperture Radar (SAR) imagery penetrates clouds and darkness to reveal illicit surface anomalies with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="metric-card flex-1 bg-black/60 border-white/10 backdrop-blur-md">
                <p className="text-[10px] font-mono text-gray-400 tracking-widest mb-2">AI CONFIDENCE INTERVAL</p>
                <p className="text-4xl font-bold text-[#E63946] mb-3">97.4%</p>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-[#E63946]" style={{width:'97.4%'}} /></div>
              </div>
              <div className="metric-card flex-1 bg-black/60 border-white/10 backdrop-blur-md border border-[#00F0FF]/30">
                <p className="text-[10px] font-mono text-gray-300 tracking-widest mb-2 font-bold">AFFECTED SPILL REGION</p>
                <p className="text-4xl font-extrabold text-[#00F0FF] mb-1 drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]">8.4<span className="text-xl ml-1 text-[#00F0FF] font-bold">km²</span></p>
                <p className="text-xs text-gray-300 mt-2 font-mono font-semibold">15.421°N, 65.239°E</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* ===== CH02: TRACE ===== */}
        <section className="chapter-panel h-[150vh] flex items-center justify-end text-right px-8 md:px-24">
          <div className="content pointer-events-auto max-w-2xl flex flex-col items-end">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">02 / TRACE</p>
              <Droplets size={16} className="text-[#00B4D8]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              Rewind the Ocean.
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-lg mb-10 leading-relaxed drop-shadow-md">
              We mathematically reverse ocean currents, tidal forces, and wind vectors to reconstruct the particle trajectory back to its exact moment of origin.
            </p>
            {/* Drift Timeline */}
            <div className="flex items-center gap-0 justify-end bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              {['T0','T-6h','T-12h','T-18h','T-24h'].map((t, i) => (
                <div key={t} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold shadow-lg ${i === 4 ? 'border-[#F59E0B] text-[#F59E0B] bg-[#F59E0B]/20 animate-pulse' : 'border-white/30 text-gray-300 bg-black/50'}`}>
                    {t}
                  </div>
                  {i < 4 && <div className="w-8 h-px bg-white/30" />}
                </div>
              ))}
            </div>
            <p className="text-xs font-mono text-[#F59E0B] mt-6 tracking-widest drop-shadow-md">ORIGIN PROBABILITY ZONE ISOLATED</p>
          </div>
        </section>

        {/* ===== CH03: CORRELATE ===== */}
        <section className="chapter-panel h-[150vh] flex items-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-2xl">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Ship size={16} className="text-[#00B4D8]" />
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">03 / CORRELATE</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              Filter the Noise.
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-lg mb-10 leading-relaxed drop-shadow-md">
              Billions of AIS telemetry points are cross-referenced against the drift corridor to eliminate innocent traffic.
            </p>
            {/* Progressive Filter */}
            <div className="flex flex-col gap-4 max-w-md bg-black/60 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
              {[
                {n:'247',label:'VESSELS IN REGION',w:'100%'},
                {n:'84',label:'TIME WINDOW MATCH',w:'34%'},
                {n:'18',label:'SPATIAL PROXIMITY',w:'7.3%'},
                {n:'5',label:'TRAJECTORY OVERLAP',w:'2%'},
                {n:'3',label:'SUSPECT CANDIDATES',w:'1.2%'},
              ].map((f,i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <span className={`text-3xl font-bold font-display w-16 text-right transition-colors ${i === 4 ? 'text-[#E63946]' : 'text-white group-hover:text-[#00B4D8]'}`}>{f.n}</span>
                  <div className="flex-1">
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-1.5">
                      <div className="h-full transition-all duration-1000" style={{width: f.w, background: i === 4 ? '#E63946' : '#0077B6'}} />
                    </div>
                    <p className="text-[10px] font-mono text-gray-400 tracking-widest">{f.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CH04: ATTRIBUTE ===== */}
        <section className="chapter-panel h-[150vh] flex items-center justify-center text-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-4xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Search size={16} className="text-[#00B4D8]" />
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">04 / ATTRIBUTE</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-10 tracking-tight drop-shadow-lg leading-tight">
              Who is Responsible?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
              {[
                {id:'A',name:'VESSEL 82A',score:'91.4',color:'#E63946', type: 'OIL TANKER'},
                {id:'B',name:'VESSEL 41C',score:'74.2',color:'#F59E0B', type: 'BULK CARRIER'},
                {id:'C',name:'VESSEL 19K',score:'61.8',color:'#9CA3AF', type: 'CONTAINER'},
              ].map(c => (
                <div key={c.id} className="metric-card bg-black/70 backdrop-blur-lg flex-1 py-8 relative" style={{borderColor: c.id === 'A' ? c.color : 'rgba(255,255,255,0.1)'}}>
                  {c.id === 'A' && <div className="absolute inset-0 bg-gradient-to-b from-[#E63946]/10 to-transparent pointer-events-none" />}
                  <p className="text-[10px] font-mono text-gray-400 tracking-widest mb-4">CANDIDATE {c.id} • {c.type}</p>
                  <p className="text-6xl font-bold font-display mb-2 drop-shadow-lg" style={{color: c.color}}>{c.score}</p>
                  <p className="text-sm font-mono text-gray-300 mt-4 font-medium">{c.name}</p>
                  {c.id === 'A' && <span className="inline-block mt-4 text-[10px] font-mono font-bold px-3 py-1 bg-[#E63946]/20 text-[#E63946] border border-[#E63946]/40 rounded-full shadow-[0_0_15px_rgba(230,57,70,0.3)]">HIGHEST PROBABILITY</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CH05: EXPLAIN ===== */}
        <section className="chapter-panel h-[150vh] flex items-center justify-end text-right px-8 md:px-24">
          <div className="content pointer-events-auto max-w-xl flex flex-col items-end">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">05 / EXPLAIN</p>
              <Brain size={16} className="text-[#00B4D8]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              Evidence Factors.
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-lg mb-10 leading-relaxed drop-shadow-md">
              Our AI doesn't just guess. It provides transparent, courtroom-ready geospatial evidence.
            </p>
            <div className="flex flex-col gap-6 text-left w-full bg-black/60 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
              {[
                {factor:'TEMPORAL MATCH',pct:98,desc:'Perfect intersection at T-12h window'},
                {factor:'SPATIAL OVERLAP',pct:94,desc:'Trajectory bisects predicted origin zone'},
                {factor:'DRIFT COMPATIBILITY',pct:91,desc:'Slick expansion matches vessel wake'},
                {factor:'BEHAVIORAL ANOMALY',pct:87,desc:'Suspicious 40% speed reduction detected'},
              ].map(f => (
                <div key={f.factor} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-[11px] font-mono text-gray-300 tracking-widest">{f.factor}</span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00B4D8] transition-colors">{f.pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8]" style={{width: `${f.pct}%`}} />
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CH06: ASSESS ===== */}
        <section className="chapter-panel h-[150vh] flex items-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-2xl">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <ShieldAlert size={16} className="text-[#E63946]" />
              <p className="text-xs font-mono text-[#E63946] tracking-[0.2em]">06 / ASSESS</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              Predict the Threat.
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-lg mb-10 leading-relaxed drop-shadow-md">
              Forward-projection modeling determines the immediate threat to vulnerable coastal ecosystems and fisheries.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-lg mb-6">
              {[
                {cat:'MANGROVE ECOSYSTEMS',level:'HIGH',badge:'bg-[#E63946]/20 text-[#E63946] border-[#E63946]/40'},
                {cat:'COMMERCIAL FISHERIES',level:'HIGH',badge:'bg-[#E63946]/20 text-[#E63946] border-[#E63946]/40'},
                {cat:'TOURISM COASTLINE',level:'MEDIUM',badge:'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40'},
                {cat:'SHIPPING LANES',level:'LOW',badge:'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40'},
              ].map(t => (
                <div key={t.cat} className="metric-card bg-black/60 border-white/10 flex flex-col gap-3 p-5 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-gray-400 tracking-widest">{t.cat}</span>
                  <span className={`self-start text-[10px] font-mono font-bold px-2 py-1 rounded border ${t.badge}`}>{t.level} RISK</span>
                </div>
              ))}
            </div>
            <div className="metric-card bg-[#E63946]/10 border-[#E63946]/50 max-w-lg flex items-center justify-between p-6 backdrop-blur-lg shadow-[0_0_30px_rgba(230,57,70,0.15)]">
              <span className="text-sm font-mono font-bold text-white tracking-widest">DEPLOYMENT PRIORITY</span>
              <span className="text-[12px] font-mono font-bold px-3 py-1 bg-[#E63946] text-white rounded shadow-lg animate-pulse">CRITICAL OVERRIDE</span>
            </div>
          </div>
        </section>

        {/* ===== CH07: RESPOND ===== */}
        <section className="chapter-panel h-[150vh] flex items-center justify-center text-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-4xl flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <Activity size={16} className="text-[#00B4D8]" />
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">07 / RESPOND</p>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-10 tracking-tight drop-shadow-lg leading-tight">
              Data-Driven Action.
            </h2>
            <div className="flex gap-4 justify-center flex-wrap w-full">
              {[
                {asset:'SKIMMER FLEET 01',type:'OIL RECOVERY',status:'IN POSITION',color:'#10B981'},
                {asset:'BOOM TEAM ALPHA',type:'CONTAINMENT',status:'DEPLOYED',color:'#F59E0B'},
                {asset:'UAV RECON SQUAD',type:'AERIAL SURVEY',status:'ACTIVE',color:'#00B4D8'},
              ].map(a => (
                <div key={a.asset} className="metric-card bg-black/70 border-white/10 backdrop-blur-lg w-56 text-left py-6">
                  <p className="text-[10px] font-mono text-gray-400 tracking-widest mb-1">{a.type}</p>
                  <p className="text-sm font-bold text-white mb-4">{a.asset}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: a.color}} />
                    <p className="text-[10px] font-mono font-bold" style={{color: a.color}}>{a.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CH08: MONITOR ===== */}
        <section className="chapter-panel h-[150vh] flex items-center justify-end text-right px-8 md:px-24">
          <div className="content pointer-events-auto max-w-xl flex flex-col items-end">
            <div className="flex items-center gap-3 mb-6 bg-black/50 w-max px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              <p className="text-xs font-mono text-[#00B4D8] tracking-[0.2em]">08 / MONITOR</p>
              <Radio size={16} className="text-[#00B4D8]" />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              The Mission Never Stops.
            </h2>
            <p className="text-xl text-gray-300 font-light max-w-lg mb-8 leading-relaxed drop-shadow-md">
              Every new satellite pass automatically updates the simulation model. We maintain a persistent overwatch on the world's oceans.
            </p>
          </div>
        </section>

        {/* ===== FINAL HERO ===== */}
        <section className="chapter-panel h-[150vh] flex items-center justify-center text-center px-8 md:px-24">
          <div className="content pointer-events-auto max-w-4xl flex flex-col items-center">
            <p className="text-xs font-mono text-[#10B981] tracking-[0.4em] mb-6 drop-shadow-md bg-black/50 px-4 py-2 rounded-full border border-[#10B981]/30">INVESTIGATION COMPLETE</p>
            <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-4 tracking-tight leading-[0.95] drop-shadow-2xl">
              SPILLTRACE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#90E0EF]">AI</span>
            </h1>
            <p className="text-2xl text-gray-200 font-light max-w-lg mx-auto mb-16 drop-shadow-md">
              Protecting the Future of the Ocean.
            </p>
            {/* Summary Stats */}
            <div className="flex justify-center gap-8 flex-wrap mb-16 bg-black/40 p-8 rounded-3xl border border-white/10 backdrop-blur-md w-full">
              {[
                {v:'1',l:'CRITICAL SPILL'},
                {v:'247',l:'VESSELS'},
                {v:'3',l:'CANDIDATES'},
                {v:'91%',l:'CONFIDENCE'},
                {v:'1',l:'CULPRIT'},
              ].map(s => (
                <div key={s.l} className="text-center flex-1">
                  <p className="text-4xl font-bold font-display text-white drop-shadow-md mb-2">{s.v}</p>
                  <p className="text-[10px] font-mono text-[#00B4D8] tracking-widest">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Link href="/investigate" className="btn-primary bg-[#0077B6] hover:bg-[#023E8A] border border-[#00B4D8]/50 shadow-[0_0_30px_rgba(0,180,216,0.4)] px-8 py-4 text-sm">
                Launch Intelligence Center
              </Link>
              <Link href="/about" className="btn-secondary text-white border-white/30 hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-sm">
                System Methodology
              </Link>
            </div>

            {/* 🌍 REAL-TIME 3D EARTH GLOBE & SATELLITE SCANNING WIDGET (AT LAST BELOW LAUNCH INTELLIGENCE CENTER) */}
            <div className="w-full max-w-3xl bg-black/70 border border-[#00F0FF]/40 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_0_50px_rgba(0,240,255,0.3)] hover:border-[#00F0FF] transition-all text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                <div className="flex items-center gap-2.5">
                  <Satellite className="w-5 h-5 text-[#00F0FF] animate-pulse" />
                  <span className="text-sm font-mono font-bold tracking-wider text-[#00F0FF]">
                    REAL-TIME 3D EARTH & SATELLITE SCANNER
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold px-3 py-1 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  LIVE ORBITAL SCAN
                </span>
              </div>

              <div className="w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl bg-[#020610]">
                <HeroGlobeWidget />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-gray-300 mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF0055] animate-pulse shrink-0" />
                  <span>OIL SPILL ANOMALY #8941: <strong className="text-[#00F0FF]">8.4 km² MONITORED</strong></span>
                </div>
                <span className="text-gray-400 font-semibold">ROTATING 3D GLOBE • OCEAN WAVES • SAR LASER BEAM</span>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[20vh]" />
      </div>
    </div>
  );
}
