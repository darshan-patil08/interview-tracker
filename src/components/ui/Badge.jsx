import { getCategoryStyle, getDifficultyStyle, getStatusStyle } from '../../utils/helpers';

/**
 * Badge Component
 * Displays category, difficulty, or status with tailored Tailwind styles.
 */
export function Badge({ children, variant = 'category', value, size = 'sm', className = '' }) {
  let styleClasses = 'bg-zinc-800 text-zinc-300 border-zinc-700';

  if (variant === 'category') {
    const catStyle = getCategoryStyle(value || children);
    styleClasses = catStyle.badge;
  } else if (variant === 'difficulty') {
    const diffStyle = getDifficultyStyle(value || children);
    styleClasses = diffStyle.badge;
  } else if (variant === 'status') {
    const statStyle = getStatusStyle(value || children);
    styleClasses = statStyle.badge;
  }

  const sizeClasses = size === 'xs'
    ? 'text-[11px] px-2 py-0.5'
    : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors ${sizeClasses} ${styleClasses} ${className}`}
    >
      {variant === 'status' && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(value || children).dot}`}
        />
      )}
      {variant === 'difficulty' && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${getDifficultyStyle(value || children).dot}`}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
