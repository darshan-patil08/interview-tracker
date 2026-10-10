import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * QuestionNotes Component
 * Displays expandable notes/takeaways for a question card with high-contrast text.
 */
export function QuestionNotes({ notes }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!notes) return null;

  const isLong = notes.length > 140;
  const displayNotes = isLong && !isExpanded ? `${notes.slice(0, 140)}...` : notes;

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800/60 text-xs">
      <div className="flex items-start gap-2 text-slate-600 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-950/40 p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800">
        <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed break-words whitespace-pre-wrap font-sans">
          {displayNotes}
          {isLong && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-0.5 ml-1.5 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionNotes;
