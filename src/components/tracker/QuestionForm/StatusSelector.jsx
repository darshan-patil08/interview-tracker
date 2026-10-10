import { STATUS, STATUS_LIST } from '../../../constants';
import { AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  [STATUS.PENDING]: {
    activeClass: 'border-zinc-500/80 bg-zinc-500/10 text-zinc-300 ring-1 ring-zinc-500/50',
    dot: 'bg-zinc-400',
  },
  [STATUS.IN_PROGRESS]: {
    activeClass: 'border-amber-500/80 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/50',
    dot: 'bg-amber-400 animate-pulse',
  },
  [STATUS.COMPLETED]: {
    activeClass: 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/50',
    dot: 'bg-emerald-400',
  },
};

/**
 * StatusSelector Component
 * Segmented selection for Pending, In Progress, Completed.
 */
export function StatusSelector({ value, onChange, error, required = true }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-xs font-medium text-zinc-300 select-none">
        Status {required && <span className="text-orange-400">*</span>}
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
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-medium transition-all duration-150 cursor-pointer ${
                isSelected
                  ? config.activeClass
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              {stat}
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

export default StatusSelector;
