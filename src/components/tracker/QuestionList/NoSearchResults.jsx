import Button from '../../ui/Button';
import { SearchX, RotateCcw } from 'lucide-react';

/**
 * NoSearchResults Component
 * Shown when search or filter combinations yield 0 questions.
 */
export function NoSearchResults({ query, onResetFilters }) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8 sm:p-10 text-center max-w-md mx-auto my-6 animate-fade-up">
      <div className="w-12 h-12 mx-auto rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 flex items-center justify-center mb-3">
        <SearchX className="w-6 h-6 text-zinc-400" />
      </div>

      <h4 className="text-base font-semibold text-zinc-200">No matching questions found</h4>
      <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
        {query ? (
          <>
            No questions matched your search for{' '}
            <span className="text-orange-400 font-mono font-medium">"{query}"</span>{' '}
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
