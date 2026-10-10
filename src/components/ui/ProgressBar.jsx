
/**
 * ProgressBar Component
 * Smooth animated progress bar with glowing fill and optional percentage label.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  showLabel = true,
  label = '',
  colorClass = 'from-orange-500 to-amber-500',
  height = 'h-2',
  className = '',
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100) || 0, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          {label && <span className="text-zinc-300">{label}</span>}
          {showLabel && (
            <span className="text-zinc-400 font-mono text-[11px] ml-auto">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-800 ${height}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
