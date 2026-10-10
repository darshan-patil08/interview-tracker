import { ExternalLink, Pencil, Trash2 } from 'lucide-react';

/**
 * QuestionActions Component
 * Action buttons for editing, deleting, or linking to a problem with light/dark styles.
 */
export function QuestionActions({
  leetcodeUrl,
  onEdit,
  onDelete,
  title,
}) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {leetcodeUrl && (
        <a
          href={leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open reference or problem URL"
          aria-label={`Open link for ${title}`}
          className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

      <button
        type="button"
        onClick={onEdit}
        title="Edit question"
        aria-label={`Edit ${title}`}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        title="Delete question"
        aria-label={`Delete ${title}`}
        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default QuestionActions;
