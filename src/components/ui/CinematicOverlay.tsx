"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Satellite, Droplets, Ship, Search, ShieldAlert, Brain, Activity, Radio } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".chapter-panel") as HTMLElement[];
      panels.forEach((panel) => {
        gsap.fromTo(
          panel.querySelector(".content"),
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.2,
            scrollTrigger: { trigger: panel, start: "top 70%", end: "top 30%", scrub: 1 },
          }
        );
      });

      // Animate counters
      gsap.utils.toArray(".count-up").forEach((el) => {
        const target = el as HTMLElement;
        const end = parseFloat(target.dataset.value || "0");
        gsap.fromTo(target, { innerText: "0" }, {
          innerText: end, duration: 2, snap: { innerText: end % 1 === 0 ? 1 : 0.1 },
          scrollTrigger: { trigger: target, start: "top 80%", toggleActions: "play none none none" },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full z-10 pointer-events-none">
      
      {/* ===== HERO ===== */}
      <section className="chapter-panel h-[150vh] flex items-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="SpillTrace AI Logo" className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_25px_rgba(0,180,216,0.4)]" />
            <div className="flex items-center gap-2">
              <span className="threat-badge low">SIH 2026</span>
              <span className="threat-badge" style={{background:'rgba(0,119,182,0.08)',color:'var(--accent-ocean)',border:'1px solid rgba(0,119,182,0.15)'}}>NTRO</span>
              <span className="threat-badge" style={{background:'rgba(0,180,216,0.08)',color:'var(--accent-cyan)',border:'1px solid rgba(0,180,216,0.15)'}}>SENTINEL-1</span>
            </div>
          </div>
          <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.3em] mb-3 uppercase">Anomaly Detected</p>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-[var(--text-primary)] mb-3 tracking-tight leading-[0.95]">
            SPILLTRACE<br/><span className="gradient-text">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-lg mb-10">
            From Space to Suspect.
          </p>
          <div className="flex gap-4 mb-12">
            <Link href="/investigate" className="btn-primary">Start Investigation</Link>
            <Link href="/about" className="btn-secondary">Explore the System</Link>
          </div>

          {/* Trust Metrics */}
          <div className="flex gap-8 text-center">
            <div><p className="text-2xl font-bold font-display text-[var(--text-primary)]">247</p><p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest">VESSELS ANALYZED</p></div>
            <div className="w-px bg-[var(--border-subtle)]" />
            <div><p className="text-2xl font-bold font-display text-[var(--risk-critical)]">94.2%</p><p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest">CONFIDENCE</p></div>
            <div className="w-px bg-[var(--border-subtle)]" />
            <div><p className="text-2xl font-bold font-display text-[var(--text-primary)]">8.4 km²</p><p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest">SPILL AREA</p></div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex flex-col items-start gap-2 opacity-50">
            <div className="w-5 h-8 rounded-full border border-[var(--text-tertiary)] flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-[var(--text-tertiary)] animate-scroll" />
            </div>
            <span className="text-[9px] font-mono text-[var(--text-tertiary)] tracking-widest">SCROLL TO INVESTIGATE</span>
          </div>
        </div>
      </section>

      {/* ===== CH01: DETECT ===== */}
      <section className="chapter-panel chapter-01 h-[150vh] flex items-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Satellite size={16} className="text-[var(--accent-ocean)]" />
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">01 / DETECT</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            See the Spill.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light max-w-md mb-8">
            Sentinel-1 SAR imagery reveals surface anomalies invisible to the human eye.
          </p>
          <div className="flex gap-4">
            <div className="metric-card flex-1">
              <p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest mb-1">CONFIDENCE</p>
              <p className="text-3xl font-bold text-[var(--risk-critical)]">97.4%</p>
              <div className="evidence-bar mt-2"><div className="evidence-bar-fill" style={{width:'97.4%'}} /></div>
            </div>
            <div className="metric-card flex-1">
              <p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest mb-1">SPILL AREA</p>
              <p className="text-3xl font-bold text-[var(--text-primary)]">8.4<span className="text-lg ml-1">km²</span></p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">Arabian Sea • 15.4°N, 65.2°E</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ===== CH02: TRACE ===== */}
      <section className="chapter-panel chapter-02 h-[150vh] flex items-center justify-end text-right px-8 md:px-20">
        <div className="content pointer-events-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-4 justify-end">
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">02 / TRACE</p>
            <Droplets size={16} className="text-[var(--accent-ocean)]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            Rewind the Ocean.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light ml-auto max-w-md mb-8">
            Reverse ocean currents and wind vectors to reconstruct probable origin.
          </p>
          {/* Drift Timeline */}
          <div className="flex items-center gap-0 justify-end">
            {['T0','T-6h','T-12h','T-18h','T-24h'].map((t, i) => (
              <div key={t} className="flex items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[9px] font-mono font-bold ${i === 4 ? 'border-[var(--risk-high)] text-[var(--risk-high)] bg-[var(--risk-high)]/10' : 'border-[var(--border-medium)] text-[var(--text-tertiary)]'}`}>
                  {t}
                </div>
                {i < 4 && <div className="w-6 h-px bg-[var(--border-medium)]" />}
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-[var(--risk-high)] mt-4 tracking-widest">PROBABLE ORIGIN ZONE IDENTIFIED</p>
        </div>
      </section>

      {/* ===== CH03: CORRELATE ===== */}
      <section className="chapter-panel chapter-03 h-[150vh] flex items-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Ship size={16} className="text-[var(--accent-ocean)]" />
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">03 / CORRELATE</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            Find the Traffic<br/>That Matters.
          </h2>
          {/* Progressive Filter */}
          <div className="flex flex-col gap-3 max-w-sm">
            {[
              {n:'247',label:'VESSELS IN REGION',w:'100%'},
              {n:'84',label:'TIME WINDOW MATCH',w:'34%'},
              {n:'18',label:'SPATIAL PROXIMITY',w:'7.3%'},
              {n:'5',label:'TRAJECTORY OVERLAP',w:'2%'},
              {n:'3',label:'CANDIDATES',w:'1.2%'},
            ].map((f,i) => (
              <div key={i} className="flex items-center gap-4">
                <span className={`text-2xl font-bold font-display w-12 text-right ${i === 4 ? 'text-[var(--risk-critical)]' : 'text-[var(--text-primary)]'}`}>{f.n}</span>
                <div className="flex-1">
                  <div className="evidence-bar"><div className="evidence-bar-fill" style={{width: f.w, background: i === 4 ? 'var(--risk-critical)' : undefined}} /></div>
                  <p className="text-[9px] font-mono text-[var(--text-tertiary)] tracking-widest mt-1">{f.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CH04: ATTRIBUTE ===== */}
      <section className="chapter-panel chapter-04 h-[150vh] flex items-center justify-center text-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-3xl">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Search size={16} className="text-[var(--accent-ocean)]" />
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">04 / ATTRIBUTE</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-8 tracking-tight">
            Who Could Be<br/>the Source?
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            {[
              {id:'A',name:'VESSEL 82A',score:'91.4',color:'var(--risk-critical)'},
              {id:'B',name:'VESSEL 41C',score:'74.2',color:'var(--risk-high)'},
              {id:'C',name:'VESSEL 19K',score:'61.8',color:'var(--text-tertiary)'},
            ].map(c => (
              <div key={c.id} className="metric-card text-center w-48" style={{borderColor: c.id === 'A' ? c.color : undefined}}>
                <p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest mb-2">CANDIDATE {c.id}</p>
                <p className="text-4xl font-bold" style={{color: c.color}}>{c.score}</p>
                <p className="text-xs font-mono text-[var(--text-secondary)] mt-2">{c.name}</p>
                {c.id === 'A' && <span className="threat-badge critical mt-3">HIGHEST RANKED</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CH05: EXPLAIN ===== */}
      <section className="chapter-panel chapter-05 h-[150vh] flex items-center justify-end text-right px-8 md:px-20">
        <div className="content pointer-events-auto max-w-xl">
          <div className="flex items-center gap-2 mb-4 justify-end">
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">05 / EXPLAIN</p>
            <Brain size={16} className="text-[var(--accent-ocean)]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-8 tracking-tight">
            Why This Vessel?
          </h2>
          <div className="flex flex-col gap-4 text-left">
            {[
              {factor:'TEMPORAL MATCH',pct:98,desc:'Perfect intersection at T-12h'},
              {factor:'SPATIAL OVERLAP',pct:94,desc:'Trajectory bisects origin zone'},
              {factor:'DRIFT COMPATIBILITY',pct:91,desc:'Aligned with backtrack model'},
              {factor:'BEHAVIORAL SIGNAL',pct:87,desc:'Suspicious speed reduction'},
            ].map(f => (
              <div key={f.factor}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-mono text-[var(--text-secondary)] tracking-widest">{f.factor}</span>
                  <span className="text-sm font-bold text-[var(--text-primary)]">{f.pct}%</span>
                </div>
                <div className="evidence-bar"><div className="evidence-bar-fill" style={{width: `${f.pct}%`}} /></div>
                <p className="text-[10px] text-[var(--text-tertiary)] mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CH06: ASSESS ===== */}
      <section className="chapter-panel chapter-06 h-[150vh] flex items-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={16} className="text-[var(--risk-critical)]" />
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">06 / ASSESS</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-8 tracking-tight">
            What Is at Risk?
          </h2>
          <div className="grid grid-cols-2 gap-3 max-w-lg">
            {[
              {cat:'ECOLOGICAL',level:'HIGH',badge:'critical'},
              {cat:'FISHERIES',level:'HIGH',badge:'critical'},
              {cat:'COASTAL',level:'MEDIUM',badge:'medium'},
              {cat:'NAVIGATION',level:'MEDIUM',badge:'medium'},
            ].map(t => (
              <div key={t.cat} className="metric-card flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-secondary)]">{t.cat}</span>
                <span className={`threat-badge ${t.badge}`}>{t.level}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 metric-card max-w-lg flex items-center justify-between" style={{borderColor:'var(--risk-critical)'}}>
            <span className="text-sm font-mono font-bold text-[var(--text-primary)]">RESPONSE PRIORITY</span>
            <span className="threat-badge critical text-sm">CRITICAL</span>
          </div>
        </div>
      </section>

      {/* ===== CH07: RESPOND ===== */}
      <section className="chapter-panel chapter-07 h-[150vh] flex items-center justify-center text-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-2xl">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <Activity size={16} className="text-[var(--accent-ocean)]" />
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">07 / RESPOND</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-8 tracking-tight">
            From Intelligence<br/>to Action.
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            {[
              {asset:'SKIMMER 01',status:'AVAILABLE',color:'var(--risk-low)'},
              {asset:'BOOM TEAM A',status:'DEPLOYED',color:'var(--risk-high)'},
              {asset:'UAV RECON',status:'STANDBY',color:'var(--accent-ocean)'},
            ].map(a => (
              <div key={a.asset} className="metric-card w-44 text-left">
                <p className="text-[10px] font-mono text-[var(--text-tertiary)] tracking-widest">{a.asset}</p>
                <p className="text-sm font-bold mt-1" style={{color: a.color}}>{a.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CH08: MONITOR ===== */}
      <section className="chapter-panel chapter-09 h-[150vh] flex items-center justify-end text-right px-8 md:px-20">
        <div className="content pointer-events-auto max-w-xl">
          <div className="flex items-center gap-2 mb-4 justify-end">
            <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.2em]">08 / MONITOR</p>
            <Radio size={16} className="text-[var(--accent-ocean)]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-6 tracking-tight">
            Continuous<br/>Intelligence.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-light ml-auto max-w-md">
            Every new satellite pass updates the model. The investigation never sleeps.
          </p>
        </div>
      </section>

      {/* ===== FINAL HERO ===== */}
      <section className="chapter-panel chapter-10 h-[150vh] flex items-center justify-center text-center px-8 md:px-20">
        <div className="content pointer-events-auto max-w-3xl">
          <p className="text-xs font-mono text-[var(--accent-ocean)] tracking-[0.3em] mb-6">INVESTIGATION COMPLETE</p>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-[var(--text-primary)] mb-3 tracking-tight leading-[0.95]">
            SPILLTRACE<br/><span className="gradient-text">AI</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] font-light max-w-lg mx-auto mb-10">
            From Space to Suspect.
          </p>
          {/* Summary Stats */}
          <div className="flex justify-center gap-6 flex-wrap mb-10">
            {[
              {v:'1',l:'SPILL DETECTED'},
              {v:'247',l:'VESSELS ANALYZED'},
              {v:'3',l:'CANDIDATES'},
              {v:'1',l:'HIGHEST-RANKED SOURCE'},
              {v:'3',l:'HIGH-RISK ZONES'},
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-2xl font-bold text-[var(--text-primary)]">{s.v}</p>
                <p className="text-[9px] font-mono text-[var(--text-tertiary)] tracking-widest max-w-[100px]">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/investigate" className="btn-primary pointer-events-auto">See the Evidence</Link>
            <Link href="/about" className="btn-secondary pointer-events-auto">How It Works</Link>
          </div>
        </div>
      </section>

      <div className="h-[20vh]" />
    </div>
  );
}
