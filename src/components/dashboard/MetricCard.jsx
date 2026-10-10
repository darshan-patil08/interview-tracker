/**
 * MetricCard Component
 * Displays a single KPI stat with light and dark mode high contrast.
 */
export function MetricCard({
  title,
  value,
  subtext,
  icon: Icon,
  colorScheme = 'orange', // 'orange' | 'purple' | 'emerald' | 'blue' | 'pink'
  progress,
  badge,
  className = '',
}) {
  const schemeClasses = {
    orange: {
      iconBg:
        'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
      barColor: 'from-orange-500 to-amber-500',
    },
    purple: {
      iconBg:
        'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
      barColor: 'from-purple-500 to-indigo-500',
    },
    emerald: {
      iconBg:
        'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
      barColor: 'from-emerald-500 to-teal-500',
    },
    blue: {
      iconBg:
        'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
      barColor: 'from-blue-500 to-cyan-500',
    },
    pink: {
      iconBg:
        'bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-500/20',
      barColor: 'from-pink-500 to-rose-500',
    },
  }[colorScheme] || {
    iconBg: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
    barColor: 'from-orange-500 to-amber-500',
  };

  return (
    <div
      className={`relative bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 truncate">
            {title}
          </span>
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${schemeClasses.iconBg}`}
          >
            {Icon && <Icon className="w-4 h-4" />}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight font-sans">
            {value}
          </span>
          {badge && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3">
        {typeof progress === 'number' && (
          <div className="w-full bg-slate-100 dark:bg-zinc-800/80 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full bg-gradient-to-r ${schemeClasses.barColor} transition-all duration-500`}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        )}
        {subtext && (
          <p className="text-xs text-slate-500 dark:text-zinc-400 truncate leading-normal">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

export default MetricCard;
