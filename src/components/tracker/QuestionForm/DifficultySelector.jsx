import { DIFFICULTY, DIFFICULTY_LIST } from '../../../constants';
import { AlertCircle } from 'lucide-react';

const DIFFICULTY_CONFIG = {
  [DIFFICULTY.EASY]: {
    activeClass:
      'border-teal-500 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20 dark:bg-teal-500/15 dark:text-teal-200 dark:border-teal-500 dark:ring-teal-500/40',
    dot: 'bg-teal-600 dark:bg-teal-400',
  },
  [DIFFICULTY.MEDIUM]: {
    activeClass:
      'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500 dark:ring-amber-500/40',
    dot: 'bg-amber-600 dark:bg-amber-400',
  },
  [DIFFICULTY.HARD]: {
    activeClass:
      'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500 dark:ring-rose-500/40',
    dot: 'bg-rose-600 dark:bg-rose-400',
  },
};

export function DifficultySelector({ value, onChange, error, required = true }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 select-none">
        Difficulty {required && <span className="text-orange-500">*</span>}
      </label>

      <div className="grid grid-cols-3 gap-2">
        {DIFFICULTY_LIST.map((diff) => {
          const isSelected = value === diff;
          const config = DIFFICULTY_CONFIG[diff];

          return (
            <button
              key={diff}
              type="button"
              onClick={() => onChange(diff)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer shadow-sm ${
                isSelected
                  ? config.activeClass
                  : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-850'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {diff}
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

export default DifficultySelector;
