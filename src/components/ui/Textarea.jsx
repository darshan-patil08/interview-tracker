import { AlertCircle } from 'lucide-react';

/**
 * Textarea Component
 * Multi-line input with character counter, error indicator, and auto-styled focus.
 */
export function Textarea({
  label,
  id,
  name,
  value = '',
  onChange,
  onBlur,
  placeholder,
  rows = 3,
  maxLength,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const textareaId = id || name;
  const currentLength = (value || '').length;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-medium text-zinc-300 select-none"
          >
            {label}
            {required && <span className="text-orange-400 ml-1">*</span>}
          </label>
        )}
        {maxLength && (
          <span
            className={`text-[11px] font-mono ${
              currentLength >= maxLength ? 'text-rose-400' : 'text-zinc-500'
            }`}
          >
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        className={`w-full rounded-xl bg-zinc-900/90 text-sm text-zinc-100 placeholder-zinc-500 border transition-all duration-150 p-3 focus:outline-none resize-y min-h-[80px] disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-950/10'
            : 'border-zinc-800 focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 hover:border-zinc-700'
        } ${className}`}
        {...props}
      />

      {error ? (
        <p
          id={`${textareaId}-error`}
          className="flex items-center gap-1.5 text-xs text-rose-400 font-medium animate-fadeIn pt-0.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-zinc-500 pt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}

export default Textarea;
