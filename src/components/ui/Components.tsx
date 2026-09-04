"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(eased * value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Glass Card (Now Minimal Card)
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GlassCard({
  children,
  className = "",
  animate = true,
}: GlassCardProps) {
  const Wrapper = animate ? motion.div : "div";
  const props = animate
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      }
    : {};

  return (
    <Wrapper className={`glass-card p-6 ${className}`} {...props}>
      {children}
    </Wrapper>
  );
}

// Expandable Detail (New for Progressive Disclosure)
export function ExpandableDetail({
  title,
  children,
  defaultExpanded = false,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  return (
    <div className="border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-secondary)] overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-tertiary)] transition-colors focus:outline-none"
      >
        <span className="font-mono text-sm tracking-widest uppercase text-[var(--text-primary)]">
          {title}
        </span>
        <span className="text-[var(--text-secondary)] font-mono text-xl leading-none">
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="p-4 pt-0 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Score Bar (Clean, Minimal)
interface ScoreBarProps {
  label: string;
  value: number;
  maxValue?: number;
  delay?: number;
  color?: string;
}

export function ScoreBar({
  label,
  value,
  maxValue = 100,
  delay = 0,
  color,
}: ScoreBarProps) {
  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <span className="font-mono text-xs text-[var(--text-secondary)] w-32 shrink-0 uppercase tracking-widest truncate">
        {label}
      </span>
      <div className="flex-1 score-bar">
        <motion.div
          className="score-bar-fill"
          style={color ? { background: color } : undefined}
          initial={{ width: 0 }}
          animate={{ width: `${(value / maxValue) * 100}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>
      <span className="font-mono text-sm text-[var(--text-primary)] w-10 text-right">
        {value}
      </span>
    </motion.div>
  );
}

// Risk Badge
interface RiskBadgeProps {
  level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  label: string;
  score?: number;
  delay?: number;
}

const riskColors = {
  CRITICAL: { bg: "rgba(255, 59, 48, 0.1)", border: "rgba(255, 59, 48, 0.2)", text: "var(--accent-red)" },
  HIGH: { bg: "rgba(245, 166, 35, 0.1)", border: "rgba(245, 166, 35, 0.2)", text: "var(--accent-amber)" },
  MEDIUM: { bg: "rgba(255, 255, 255, 0.05)", border: "rgba(255, 255, 255, 0.1)", text: "var(--text-primary)" },
  LOW: { bg: "transparent", border: "rgba(255, 255, 255, 0.05)", text: "var(--text-secondary)" },
};

export function RiskBadge({ level, label, score, delay = 0 }: RiskBadgeProps) {
  const colors = riskColors[level];
  return (
    <motion.div
      className="flex items-center justify-between px-4 py-3 rounded border"
      style={{ background: colors.bg, borderColor: colors.border }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
      <div className="flex items-center gap-3">
        {score !== undefined && (
          <span className="font-mono text-xs text-[var(--text-tertiary)]">{score}%</span>
        )}
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: colors.text }}
        >
          {level}
        </span>
      </div>
    </motion.div>
  );
}

// Pipeline Step (Minimal)
interface PipelineStepProps {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
  delay?: number;
}

export function PipelineStep({
  number,
  title,
  description,
  isActive = false,
  delay = 0,
}: PipelineStepProps) {
  return (
    <motion.div
      className="flex flex-col text-left min-w-[120px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        className={`w-8 h-8 rounded mb-3 flex items-center justify-center font-mono text-sm transition-colors ${
          isActive
            ? "bg-[var(--accent-cyan)] text-[var(--bg-primary)]"
            : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
        }`}
      >
        {number}
      </div>
      <h4 className={`text-sm font-medium mb-1 ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
        {title}
      </h4>
      <p className="text-xs text-[var(--text-tertiary)] leading-relaxed max-w-[140px]">
        {description}
      </p>
    </motion.div>
  );
}

// Stagger Children Wrapper
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.05,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Section Label
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-1.5 h-1.5 bg-[var(--accent-cyan)]" />
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
        {children}
      </span>
    </motion.div>
  );
}

// Divider
export function Divider({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-px bg-[var(--border-subtle)] w-full ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6 }}
      style={{ transformOrigin: "left" }}
    />
  );
}

// Slide Title
interface SlideTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SlideTitle({ title, subtitle, align = "left" }: SlideTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-tight text-[var(--text-primary)]"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-sm md:text-base text-[var(--text-secondary)] font-mono uppercase tracking-widest mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
