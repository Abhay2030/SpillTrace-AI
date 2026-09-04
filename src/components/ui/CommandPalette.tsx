"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Map, Activity, ShieldAlert, Navigation, Settings } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-[var(--text-primary)]/40 backdrop-blur-sm p-4">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)}
      />
      <Command 
        className="relative w-full max-w-2xl bg-[var(--surface-glass)] border border-[var(--border-subtle)] rounded-xl shadow-[var(--shadow-floating)] overflow-hidden flex flex-col"
        shouldFilter={true}
      >
        <div className="flex items-center px-4 border-b border-[var(--border-subtle)]">
          <Search size={18} className="text-[var(--text-tertiary)] mr-2" />
          <Command.Input 
            autoFocus 
            placeholder="Search vessels, incidents, or commands..." 
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 py-4 text-sm font-display text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-2 py-1 rounded text-[10px] font-mono text-[var(--text-tertiary)]">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-smooth">
          <Command.Empty className="py-6 text-center text-sm text-[var(--text-secondary)]">
            No results found.
          </Command.Empty>

          <Command.Group heading={<span className="px-2 text-xs font-mono text-[var(--text-tertiary)]">INVESTIGATION</span>}>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/investigate"))}
              className="flex items-center px-2 py-3 mt-1 rounded cursor-pointer hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--bg-secondary)] transition-colors"
            >
              <Map size={16} className="text-[var(--accent-ocean)] mr-3" />
              <span className="text-sm">Start Investigation</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/analytics"))}
              className="flex items-center px-2 py-3 mt-1 rounded cursor-pointer hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--bg-secondary)] transition-colors"
            >
              <Activity size={16} className="text-[var(--text-secondary)] mr-3" />
              <span className="text-sm">View Analytics</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading={<span className="px-2 text-xs font-mono text-[var(--text-tertiary)] mt-4 block">RESPONSE & THREAT</span>}>
            <Command.Item 
              onSelect={() => runCommand(() => router.push("/response"))}
              className="flex items-center px-2 py-3 mt-1 rounded cursor-pointer hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--bg-secondary)] transition-colors"
            >
              <ShieldAlert size={16} className="text-[var(--risk-critical)] mr-3" />
              <span className="text-sm">Open Response Command</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => {})}
              className="flex items-center px-2 py-3 mt-1 rounded cursor-pointer hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--bg-secondary)] transition-colors"
            >
              <Navigation size={16} className="text-[var(--risk-high)] mr-3" />
              <span className="text-sm">Simulate 12H Forecast</span>
            </Command.Item>
          </Command.Group>
          
          <Command.Group heading={<span className="px-2 text-xs font-mono text-[var(--text-tertiary)] mt-4 block">SYSTEM</span>}>
            <Command.Item 
              onSelect={() => runCommand(() => {})}
              className="flex items-center px-2 py-3 mt-1 rounded cursor-pointer hover:bg-[var(--bg-secondary)] aria-selected:bg-[var(--bg-secondary)] transition-colors"
            >
              <Settings size={16} className="text-[var(--text-secondary)] mr-3" />
              <span className="text-sm">Toggle Live / Demo Mode</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
