import { AlertCircle } from 'lucide-react';

/**
 * Input Component
 * Accessible input with high-contrast light & dark mode styles and inline error feedback.
 */
export function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const inputId = id || name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 select-none"
        >
          {label}
          {required && <span className="text-orange-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-xl">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded-xl text-sm transition-all duration-150 py-2.5 ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/50 dark:bg-rose-950/20 text-slate-900 dark:text-zinc-100 border'
              : 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 shadow-sm'
          } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p
          id={`${inputId}-error`}
          className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium pt-0.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-zinc-400 pt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Input;
