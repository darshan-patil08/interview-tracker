import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * QuestionNotes Component
 * Displays expandable notes/takeaways for a question card.
 */
export function QuestionNotes({ notes }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!notes) return null;

  const isLong = notes.length > 140;
  const displayNotes = isLong && !isExpanded ? `${notes.slice(0, 140)}...` : notes;

  return (
    <div className="mt-3 pt-3 border-t border-zinc-800/60 text-xs">
      <div className="flex items-start gap-2 text-zinc-400 bg-zinc-950/40 p-2.5 rounded-xl border border-zinc-850">
        <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed break-words whitespace-pre-wrap font-sans">
          {displayNotes}
          {isLong && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-0.5 ml-1.5 text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
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
