import toast from 'react-hot-toast';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Trash2,
  Download,
  Upload,
} from 'lucide-react';

const baseToastStyle = {
  borderRadius: '0.75rem',
  padding: '10px 14px',
  fontSize: '0.875rem',
  fontWeight: '500',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

export const showToast = {
  success: (message) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-up' : 'opacity-0'
        } flex items-center gap-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-lg transition-all`}
        style={baseToastStyle}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span>{message}</span>
      </div>
    )),

  error: (message) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-up' : 'opacity-0'
        } flex items-center gap-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-rose-200 dark:border-rose-900/50 rounded-xl px-4 py-3 shadow-lg transition-all`}
        style={baseToastStyle}
      >
        <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
        <span>{message}</span>
      </div>
    )),

  info: (message) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-up' : 'opacity-0'
        } flex items-center gap-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-blue-200 dark:border-blue-900/50 rounded-xl px-4 py-3 shadow-lg transition-all`}
        style={baseToastStyle}
      >
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span>{message}</span>
      </div>
    )),

  delete: (message) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-up' : 'opacity-0'
        } flex items-center gap-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-lg transition-all`}
        style={baseToastStyle}
      >
        <Trash2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
        <span>{message}</span>
      </div>
    )),

  download: (message) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-up' : 'opacity-0'
        } flex items-center gap-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-lg transition-all`}
        style={baseToastStyle}
      >
        <Download className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
        <span>{message}</span>
      </div>
    )),

  upload: (message) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-fade-up' : 'opacity-0'
        } flex items-center gap-2.5 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-lg transition-all`}
        style={baseToastStyle}
      >
        <Upload className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
        <span>{message}</span>
      </div>
    )),
};

export default showToast;
