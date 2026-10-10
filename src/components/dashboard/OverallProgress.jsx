import ProgressBar from '../ui/ProgressBar';
import { Target } from 'lucide-react';

/**
 * OverallProgress Component
 * Displays overall readiness percentage and dynamic motivational milestones.
 */
export function OverallProgress({ stats }) {
  const { total, completed, inProgress, pending, completionRate } = stats;

  const getMilestone = () => {
    if (total === 0) return { label: 'Empty Tracker', desc: 'Add questions to begin tracking readiness', color: 'text-zinc-400' };
    if (completionRate >= 80) return { label: 'Interview Ready 🚀', desc: 'Exceptional consistency! Ready for full loops', color: 'text-emerald-400' };
    if (completionRate >= 50) return { label: 'Strong Momentum 🔥', desc: 'More than halfway through your prep goals', color: 'text-amber-400' };
    if (completionRate >= 20) return { label: 'In The Zone ⚡', desc: 'Solid foundation forming across key domains', color: 'text-blue-400' };
    return { label: 'Kickoff Stage 🌱', desc: 'Start knocking out pending problems one by one', color: 'text-purple-400' };
  };

  const milestone = getMilestone();

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-lg shadow-black/20 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Target className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-semibold text-zinc-200">Overall Progress</h3>
          </div>
          <div className="mt-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              {completionRate}%
            </span>
            <span className="text-xs text-zinc-400 ml-2 font-medium">Completed</span>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-xs font-bold ${milestone.color}`}>
            {milestone.label}
          </span>
          <p className="text-[11px] text-zinc-500 max-w-[180px] mt-0.5 hidden sm:block">
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

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-zinc-800/80">
          <div className="bg-zinc-950/40 p-2 rounded-xl border border-zinc-850">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Done</span>
            <span className="font-bold text-emerald-400 text-sm">{completed}</span>
          </div>
          <div className="bg-zinc-950/40 p-2 rounded-xl border border-zinc-850">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">In Progress</span>
            <span className="font-bold text-amber-400 text-sm">{inProgress}</span>
          </div>
          <div className="bg-zinc-950/40 p-2 rounded-xl border border-zinc-850">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">Pending</span>
            <span className="font-bold text-zinc-400 text-sm">{pending}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallProgress;
