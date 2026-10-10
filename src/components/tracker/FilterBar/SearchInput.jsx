import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchInput Component
 * Dedicated search bar with instant clear button and '/' keyboard shortcut listener.
 */
export function SearchInput({ value, onChange, placeholder = 'Search by title or notes...' }) {
  const inputRef = useRef(null);

  // Global '/' keyboard shortcut to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex-1 min-w-[240px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
        <Search className="w-4 h-4" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-zinc-900 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 rounded-xl border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 pl-10 pr-16 py-2.5 transition-all outline-none shadow-sm"
      />

      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200 dark:text-zinc-500 dark:bg-zinc-800 dark:border-zinc-700/60 rounded">
            /
          </kbd>
        )}
      </div>
    </div>
  );
}

export default SearchInput;
