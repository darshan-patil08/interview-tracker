import { CATEGORIES } from '../../../constants';
import { Code2, GitBranch, Cpu, Laptop, AlertCircle } from 'lucide-react';

const CATEGORY_META = [
  {
    value: CATEGORIES.DSA,
    label: 'DSA',
    description: 'Algorithms & Data Structures',
    icon: Code2,
    activeClass:
      'border-purple-500 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20 dark:bg-purple-500/15 dark:text-purple-200 dark:border-purple-500 dark:ring-purple-500/40',
    iconClass: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-500/20',
  },
  {
    value: CATEGORIES.GIT,
    label: 'Git & GitHub',
    description: 'Branching, conflicts & CLI',
    icon: GitBranch,
    activeClass:
      'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500 dark:ring-emerald-500/40',
    iconClass: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20',
  },
  {
    value: CATEGORIES.TECHNICAL,
    label: 'Technical',
    description: 'System design, React, Node',
    icon: Cpu,
    activeClass:
      'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 dark:bg-blue-500/15 dark:text-blue-200 dark:border-blue-500 dark:ring-blue-500/40',
    iconClass: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20',
  },
  {
    value: CATEGORIES.MACHINE,
    label: 'Machine Coding',
    description: 'Live frontend build rounds',
    icon: Laptop,
    activeClass:
      'border-pink-500 bg-pink-50 text-pink-900 ring-2 ring-pink-500/20 dark:bg-pink-500/15 dark:text-pink-200 dark:border-pink-500 dark:ring-pink-500/40',
    iconClass: 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-500/20',
  },
];

export function CategorySelector({ value, onChange, error, required = true }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 select-none">
        Category {required && <span className="text-orange-500">*</span>}
      </label>

      <div className="grid grid-cols-2 gap-2.5">
        {CATEGORY_META.map((item) => {
          const isSelected = value === item.value;
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer shadow-sm ${
                isSelected
                  ? item.activeClass
                  : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-850'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isSelected
                    ? item.iconClass
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate leading-tight text-slate-900 dark:text-zinc-100">
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400 truncate mt-0.5 leading-tight">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default CategorySelector;
