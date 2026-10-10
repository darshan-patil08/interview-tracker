import ProgressBar from '../ui/ProgressBar';
import { CATEGORIES } from '../../constants';
import { Code2, GitBranch, Cpu, Laptop } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    key: 'dsa',
    title: CATEGORIES.DSA,
    icon: Code2,
    colorClass: 'from-purple-500 to-indigo-500',
    textClass: 'text-purple-400',
  },
  {
    key: 'git',
    title: CATEGORIES.GIT,
    icon: GitBranch,
    colorClass: 'from-emerald-500 to-teal-500',
    textClass: 'text-emerald-400',
  },
  {
    key: 'technical',
    title: CATEGORIES.TECHNICAL,
    icon: Cpu,
    colorClass: 'from-blue-500 to-cyan-500',
    textClass: 'text-blue-400',
  },
  {
    key: 'machine',
    title: CATEGORIES.MACHINE,
    icon: Laptop,
    colorClass: 'from-pink-500 to-rose-500',
    textClass: 'text-pink-400',
  },
];

/**
 * CategoryBreakdown Component
 * Displays completion rate and ratio for each domain category.
 */
export function CategoryBreakdown({ stats }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/20 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">Category Progress</h3>
        <span className="text-xs text-zinc-500 font-mono">By Track</span>
      </div>

      <div className="space-y-3.5">
        {CATEGORY_ITEMS.map((item) => {
          const catStat = stats[item.key] || { total: 0, completed: 0 };
          const Icon = item.icon;
          const rate =
            catStat.total > 0
              ? Math.round((catStat.completed / catStat.total) * 100)
              : 0;

          return (
            <div key={item.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                  <Icon className={`w-3.5 h-3.5 ${item.textClass}`} />
                  <span>{item.title}</span>
                </span>
                <span className="text-zinc-400 font-mono text-[11px]">
                  {catStat.completed}/{catStat.total} ({rate}%)
                </span>
              </div>
              <ProgressBar
                value={rate}
                showLabel={false}
                colorClass={item.colorClass}
                height="h-1.5"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryBreakdown;
