import { STATUS, STATUS_LIST } from '../../../constants';
import { AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  [STATUS.PENDING]: {
    activeClass:
      'border-slate-400 bg-slate-100 text-slate-800 ring-2 ring-slate-400/20 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600 dark:ring-zinc-600/40',
    dot: 'bg-slate-500 dark:bg-zinc-400',
  },
  [STATUS.IN_PROGRESS]: {
    activeClass:
      'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500 dark:ring-amber-500/40',
    dot: 'bg-amber-600 dark:bg-amber-400 animate-pulse',
  },
  [STATUS.COMPLETED]: {
    activeClass:
      'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500 dark:ring-emerald-500/40',
    dot: 'bg-emerald-600 dark:bg-emerald-400',
  },
};

export function StatusSelector({ value, onChange, error, required = true }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 select-none">
        Status {required && <span className="text-orange-500">*</span>}
      </label>

      <div className="grid grid-cols-3 gap-2">
        {STATUS_LIST.map((stat) => {
          const isSelected = value === stat;
          const config = STATUS_CONFIG[stat];

          return (
            <button
              key={stat}
              type="button"
              onClick={() => onChange(stat)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 cursor-pointer shadow-sm ${
                isSelected
                  ? config.activeClass
                  : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-850'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {stat}
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

export default StatusSelector;
