import Button from '../../ui/Button';
import { Plus, Upload, FolderKanban } from 'lucide-react';

/**
 * EmptyState Component
 * Shown when the user has zero questions tracked. Clean, modern, no sample data clutter.
 */
export function EmptyState({ onAddQuestion, onOpenImport }) {
  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-sm">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 shadow-sm">
        <FolderKanban className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
        No questions tracked yet
      </h3>
      <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
        Your interview practice tracker is ready. Start logging your DSA problems,
        Git scenarios, technical interview topics, and machine coding challenges.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={onAddQuestion}
        >
          Add First Question
        </Button>
        {onOpenImport && (
          <Button
            variant="outline"
            size="md"
            icon={Upload}
            onClick={onOpenImport}
          >
            Import from JSON
          </Button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
