import Button from '../../ui/Button';
import { SearchX, RotateCcw } from 'lucide-react';

/**
 * NoSearchResults Component
 * Shown when search or filter combinations yield 0 questions.
 */
export function NoSearchResults({ query, onResetFilters }) {
  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-10 text-center max-w-md mx-auto my-6 shadow-sm">
      <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400 flex items-center justify-center mb-3">
        <SearchX className="w-6 h-6" />
      </div>

      <h4 className="text-base font-bold text-slate-900 dark:text-zinc-100">
        No matching questions found
      </h4>
      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
        {query ? (
          <>
            No questions matched your search for{' '}
            <span className="text-orange-600 dark:text-orange-400 font-mono font-semibold">"{query}"</span>{' '}
            with current filter criteria.
          </>
        ) : (
          'No questions matched your selected filter combination.'
        )}
      </p>

      <div className="mt-5">
        <Button
          variant="outline"
          size="sm"
          icon={RotateCcw}
          onClick={onResetFilters}
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
}

export default NoSearchResults;
