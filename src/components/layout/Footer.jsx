import React from 'react';
import { Heart, Sparkles, Terminal } from 'lucide-react';

/**
 * Footer Component
 * Application footer with shortcuts and credit info.
 */
export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/60 mt-12 py-8 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>Interview Practice Tracker</span>
          <span>•</span>
          <span className="text-zinc-400">Cohort 3.0</span>
          <span>•</span>
          <span className="text-zinc-500 font-mono text-[11px]">LocalStorage Synced</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-zinc-400">
          <div className="hidden md:flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 font-mono text-zinc-400 text-[10px]">
              /
            </kbd>
            <span>Focus Search</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 font-mono text-zinc-400 text-[10px]">
              Esc
            </kbd>
            <span>Close Modal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
