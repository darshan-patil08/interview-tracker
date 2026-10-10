import { CATEGORIES } from '../../../constants';
import { Code2, GitBranch, Cpu, Laptop, Layers } from 'lucide-react';

const CATEGORY_ITEMS = [
  { value: 'All', label: 'All', icon: Layers },
  { value: CATEGORIES.DSA, label: 'DSA', icon: Code2 },
  { value: CATEGORIES.GIT, label: 'Git', icon: GitBranch },
  { value: CATEGORIES.TECHNICAL, label: 'Tech', icon: Cpu },
  { value: CATEGORIES.MACHINE, label: 'Machine', icon: Laptop },
];

/**
 * CategoryChips Component
 * Scrollable chip buttons for filtering by category with icons and count badges.
 */
export function CategoryChips({ activeCategory, onChange, counts = {} }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
      {CATEGORY_ITEMS.map((item) => {
        const isActive = activeCategory === item.value;
        const Icon = item.icon;
        const count = counts[item.value];

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 shrink-0 cursor-pointer ${
              isActive
                ? 'bg-orange-50 text-orange-800 border border-orange-300 shadow-sm dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/40'
                : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-zinc-200 shadow-sm'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
            {typeof count === 'number' && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? 'bg-orange-100 text-orange-900 dark:bg-orange-500/20 dark:text-orange-300'
                    : 'bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;
