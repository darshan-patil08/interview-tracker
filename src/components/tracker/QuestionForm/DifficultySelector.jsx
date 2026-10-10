import { DIFFICULTY, DIFFICULTY_LIST } from '../../../constants';
import { AlertCircle } from 'lucide-react';

const DIFFICULTY_CONFIG = {
  [DIFFICULTY.EASY]: {
    activeClass: 'border-teal-500/80 bg-teal-500/10 text-teal-300 ring-1 ring-teal-500/50',
    dot: 'bg-teal-400',
  },
  [DIFFICULTY.MEDIUM]: {
    activeClass: 'border-amber-500/80 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/50',
    dot: 'bg-amber-400',
  },
  [DIFFICULTY.HARD]: {
    activeClass: 'border-rose-500/80 bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/50',
    dot: 'bg-rose-400',
  },
};

/**
 * DifficultySelector Component
 * Segmented selection for Easy, Medium, Hard.
 */
export function DifficultySelector({ value, onChange, error, required = true }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-xs font-medium text-zinc-300 select-none">
        Difficulty {required && <span className="text-orange-400">*</span>}
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
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-medium transition-all duration-150 cursor-pointer ${
                isSelected
                  ? config.activeClass
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {diff}
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

export default DifficultySelector;
