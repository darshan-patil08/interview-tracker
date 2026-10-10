import { CATEGORIES } from '../../../constants';
import { Code2, GitBranch, Cpu, Laptop, AlertCircle } from 'lucide-react';

const CATEGORY_META = [
  {
    value: CATEGORIES.DSA,
    label: 'DSA',
    description: 'Algorithms & Data Structures',
    icon: Code2,
    color: 'purple',
    activeClass: 'border-purple-500/80 bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/50',
    iconClass: 'text-purple-400 bg-purple-500/20',
  },
  {
    value: CATEGORIES.GIT,
    label: 'Git & GitHub',
    description: 'Branching, conflicts & CLI',
    icon: GitBranch,
    color: 'emerald',
    activeClass: 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/50',
    iconClass: 'text-emerald-400 bg-emerald-500/20',
  },
  {
    value: CATEGORIES.TECHNICAL,
    label: 'Technical',
    description: 'System design, React, Node',
    icon: Cpu,
    color: 'blue',
    activeClass: 'border-blue-500/80 bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/50',
    iconClass: 'text-blue-400 bg-blue-500/20',
  },
  {
    value: CATEGORIES.MACHINE,
    label: 'Machine Coding',
    description: 'Live frontend build rounds',
    icon: Laptop,
    color: 'pink',
    activeClass: 'border-pink-500/80 bg-pink-500/10 text-pink-300 ring-1 ring-pink-500/50',
    iconClass: 'text-pink-400 bg-pink-500/20',
  },
];

/**
 * CategorySelector Component
 * Grid of selectable category cards with clear active and error states.
 */
export function CategorySelector({ value, onChange, error, required = true }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-zinc-300 select-none">
        Category {required && <span className="text-orange-400">*</span>}
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
              className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? item.activeClass
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-850'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  isSelected ? item.iconClass : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate leading-tight">
                  {item.label}
                </p>
                <p className="text-[10px] text-zinc-500 truncate mt-0.5 leading-tight">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-rose-400 font-medium animate-fadeIn pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default CategorySelector;
