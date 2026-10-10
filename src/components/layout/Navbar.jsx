import React, { useState } from 'react';
import Button from '../ui/Button';
import {
  Sparkles,
  Plus,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Code2,
  MoreVertical,
  CheckCircle2,
} from 'lucide-react';

/**
 * Navbar Component
 * Header navigation with branding, active metrics summary, and action menu.
 */
export function Navbar({
  stats,
  onOpenAddModal,
  onResetSeedData,
  onClearAllData,
  onExportData,
  onImportData,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 border border-orange-400/30">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
                Prep<span className="text-orange-500">Track</span>
              </span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Cohort 3.0
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Interview Practice & Machine Coding Tracker
            </p>
          </div>
        </div>

        {/* Center: Quick Live Progress Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-400">Weekly Progress:</span>
          <span className="font-semibold text-zinc-200">
            {stats.completed} / {stats.total} ({stats.completionRate}%)
          </span>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {/* Add Question Button */}
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={onOpenAddModal}
          >
            Add Question
          </Button>

          {/* More Options Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="More actions"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800 transition-colors cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl shadow-black/60 py-1.5 z-50 text-xs animate-scale-in">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onResetSeedData();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 text-left cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                    <span>Reset to Sample Data</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onExportData();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 text-left cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Export Questions (JSON)</span>
                  </button>

                  <label className="w-full flex items-center gap-2.5 px-3 py-2 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/80 text-left cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Import Questions (JSON)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        setMenuOpen(false);
                        onImportData(e);
                      }}
                      className="hidden"
                    />
                  </label>

                  <div className="my-1 border-t border-zinc-800" />

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onClearAllData();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-left cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Questions</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
