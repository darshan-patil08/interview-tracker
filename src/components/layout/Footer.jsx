/**
 * Footer Component
 * Application footer with shortcuts and credit info.
 */
export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-zinc-900 bg-white/60 dark:bg-zinc-950/60 mt-12 py-8 text-xs text-slate-500 dark:text-zinc-500 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700 dark:text-zinc-300">Interview Practice Tracker</span>
          <span>•</span>
          <span className="text-slate-600 dark:text-zinc-400">Cohort 3.0</span>
          <span>•</span>
          <span className="text-slate-500 dark:text-zinc-500 font-mono text-[11px]">LocalStorage Synced</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-zinc-400">
          <div className="hidden md:flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700/60 font-mono text-slate-700 dark:text-zinc-400 text-[10px]">
              /
            </kbd>
            <span>Focus Search</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700/60 font-mono text-slate-700 dark:text-zinc-400 text-[10px]">
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
