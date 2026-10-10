
/**
 * MetricCard Component
 * Displays a single KPI stat with icon, value, sub-text, and optional badge or bar.
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
      iconBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      accentGlow: 'hover:border-orange-500/30',
      barColor: 'from-orange-500 to-amber-500',
    },
    purple: {
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      accentGlow: 'hover:border-purple-500/30',
      barColor: 'from-purple-500 to-indigo-500',
    },
    emerald: {
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      accentGlow: 'hover:border-emerald-500/30',
      barColor: 'from-emerald-500 to-teal-500',
    },
    blue: {
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      accentGlow: 'hover:border-blue-500/30',
      barColor: 'from-blue-500 to-cyan-500',
    },
    pink: {
      iconBg: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      accentGlow: 'hover:border-pink-500/30',
      barColor: 'from-pink-500 to-rose-500',
    },
  }[colorScheme] || {
    iconBg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    accentGlow: 'hover:border-zinc-700',
    barColor: 'from-orange-500 to-amber-500',
  };

  return (
    <div
      className={`relative bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-lg shadow-black/20 ${schemeClasses.accentGlow} flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-zinc-400 truncate">
            {title}
          </span>
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${schemeClasses.iconBg}`}
          >
            {Icon && <Icon className="w-4 h-4" />}
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight font-sans">
            {value}
          </span>
          {badge && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3">
        {typeof progress === 'number' && (
          <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full bg-gradient-to-r ${schemeClasses.barColor} transition-all duration-500`}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        )}
        {subtext && (
          <p className="text-xs text-zinc-400 truncate leading-normal">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

export default MetricCard;
