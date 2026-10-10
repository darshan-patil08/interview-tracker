import { Laptop, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

/**
 * MachineCodingBanner Component
 * Highlights Machine Coding round readiness and provides quick focus CTA.
 */
export function MachineCodingBanner({ machineStats, onAddMachineTask }) {
  const { total, completed } = machineStats || { total: 0, completed: 0 };
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isAllCleared = completed === total && total > 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-pink-950/40 via-zinc-900/90 to-purple-950/40 border border-pink-500/20 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-zinc-100">
                Machine Coding Round Track
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
                {isAllCleared ? 'Round Cleared' : `${completed}/${total} Cleared`}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
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
            className="border-pink-500/30 hover:border-pink-500/60 text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 text-xs"
          >
            Add Machine Task
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MachineCodingBanner;
