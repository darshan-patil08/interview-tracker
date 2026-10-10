import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az', label: 'Title (A–Z)' },
  { value: 'za', label: 'Title (Z–A)' },
];

/**
 * SortSelect Component
 * Compact dropdown for sorting questions.
 */
export function SortSelect({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
        <ArrowUpDown className="w-3.5 h-3.5" />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort questions"
        className="bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-200 rounded-xl border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 pl-8 pr-8 py-2.5 sm:py-2 appearance-none cursor-pointer outline-none transition-all shadow-sm"
      >
        {SORT_OPTIONS.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-slate-800 dark:bg-zinc-900 dark:text-zinc-200"
          >
            {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500 text-[10px]">
        ▼
      </div>
    </div>
  );
}

export default SortSelect;
