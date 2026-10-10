import Button from '../../ui/Button';
import { Plus, Sparkles, FolderKanban } from 'lucide-react';

/**
 * EmptyState Component
 * Shown when the user has zero questions tracked in localStorage.
 */
export function EmptyState({ onAddQuestion, onLoadSamples }) {
  return (
    <div className="bg-zinc-900/40 border border-dashed border-zinc-800 rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto my-6 animate-fade-up">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/10">
        <FolderKanban className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-zinc-100">No questions tracked yet</h3>
      <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
        Your interview practice tracker is currently empty. Start logging your DSA
        problems, Git scenarios, system design questions, and machine-coding practice.
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
        {onLoadSamples && (
          <Button
            variant="outline"
            size="md"
            icon={Sparkles}
            onClick={onLoadSamples}
          >
            Load Sample Practice Set
          </Button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
