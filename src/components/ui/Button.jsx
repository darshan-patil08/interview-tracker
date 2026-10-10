
/**
 * Button Component
 * Accessible, customizable button with subtle micro-animations and Tailwind styles.
 */
export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2 focus:ring-offset-[#09080e] disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 gap-2 rounded-xl',
    lg: 'text-base px-5 py-2.5 gap-2.5 rounded-xl',
  }[size] || 'text-sm px-4 py-2 gap-2 rounded-xl';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white shadow-lg shadow-orange-500/20 active:scale-[0.98] border border-orange-400/20',
    secondary:
      'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/80 hover:border-zinc-600 active:scale-[0.98]',
    outline:
      'border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white bg-transparent hover:bg-zinc-800/40 active:scale-[0.98]',
    danger:
      'bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 active:scale-[0.98]',
    ghost:
      'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70 border border-transparent active:scale-[0.98]',
  }[variant] || '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}

export default Button;
