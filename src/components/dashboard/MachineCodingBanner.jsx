import { Laptop, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

/**
 * MachineCodingBanner Component
 * Highlights Machine Coding round readiness and provides quick focus CTA.
 */
export function MachineCodingBanner({ machineStats, onAddMachineTask }) {
  const { total, completed } = machineStats || { total: 0, completed: 0 };
  const isAllCleared = completed === total && total > 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-pink-50/80 via-white to-purple-50/80 dark:from-pink-950/40 dark:via-zinc-900/90 dark:to-purple-950/40 border border-pink-200 dark:border-pink-500/20 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100">
                Machine Coding Round Track
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30">
                {isAllCleared ? 'Round Cleared' : `${completed}/${total} Cleared`}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Machine coding tests your ability to write modular, clean React code under timed conditions (60–90 min). Practice state architecture, component breakdown, and robust validation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <Button
            variant="outline"
            size="sm"
            icon={Sparkles}
            onClick={onAddMachineTask}
            className="border-pink-300 dark:border-pink-500/30 hover:border-pink-500 text-pink-700 dark:text-pink-300 hover:text-pink-800 dark:hover:text-pink-200 bg-pink-50/50 hover:bg-pink-100 dark:bg-transparent dark:hover:bg-pink-500/10 text-xs shadow-sm"
          >
            Add Machine Task
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MachineCodingBanner;
