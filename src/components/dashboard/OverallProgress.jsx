import ProgressBar from '../ui/ProgressBar';
import { Target } from 'lucide-react';

/**
 * OverallProgress Component
 * Displays overall readiness percentage and dynamic motivational milestones.
 */
export function OverallProgress({ stats }) {
  const { total, completed, inProgress, pending, completionRate } = stats;

  const getMilestone = () => {
    if (total === 0) return { label: 'Empty Tracker', desc: 'Add questions to begin tracking readiness', color: 'text-slate-400 dark:text-zinc-400' };
    if (completionRate >= 80) return { label: 'Interview Ready', desc: 'Exceptional consistency! Ready for full interview loops', color: 'text-emerald-600 dark:text-emerald-400' };
    if (completionRate >= 50) return { label: 'Strong Momentum', desc: 'More than halfway through your prep goals', color: 'text-amber-600 dark:text-amber-400' };
    if (completionRate >= 20) return { label: 'In The Zone', desc: 'Solid foundation forming across key domains', color: 'text-blue-600 dark:text-blue-400' };
    return { label: 'Kickoff Stage', desc: 'Start knocking out pending problems one by one', color: 'text-purple-600 dark:text-purple-400' };
  };

  const milestone = getMilestone();

  return (
    <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400">
              <Target className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">Overall Progress</h3>
          </div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-orange-400 dark:via-amber-300 dark:to-yellow-400">
              {completionRate}%
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-400 ml-2 font-medium">Completed</span>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-xs font-bold ${milestone.color}`}>
            {milestone.label}
          </span>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400 max-w-[180px] mt-0.5 hidden sm:block">
            {milestone.desc}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <ProgressBar
          value={completionRate}
          showLabel={false}
          height="h-2.5"
          colorClass="from-orange-500 via-amber-400 to-yellow-400"
        />

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-slate-100 dark:border-zinc-800/80">
          <div className="bg-slate-50 dark:bg-zinc-950/40 p-2 rounded-xl border border-slate-200 dark:border-zinc-800">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase font-mono">Done</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{completed}</span>
          </div>
          <div className="bg-slate-50 dark:bg-zinc-950/40 p-2 rounded-xl border border-slate-200 dark:border-zinc-800">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase font-mono">In Progress</span>
            <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">{inProgress}</span>
          </div>
          <div className="bg-slate-50 dark:bg-zinc-950/40 p-2 rounded-xl border border-slate-200 dark:border-zinc-800">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block uppercase font-mono">Pending</span>
            <span className="font-bold text-slate-700 dark:text-zinc-300 text-sm">{pending}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallProgress;
