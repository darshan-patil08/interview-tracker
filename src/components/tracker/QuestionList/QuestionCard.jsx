import Badge from '../../ui/Badge';
import QuestionStatusToggle from './QuestionStatusToggle';
import QuestionActions from './QuestionActions';
import QuestionNotes from './QuestionNotes';
import { formatDate, timeAgo, getCategoryStyle } from '../../../utils/helpers';
import { STATUS } from '../../../constants';
import { Calendar, CheckCheck } from 'lucide-react';

/**
 * QuestionCard Component
 * High-contrast card with proper shadows and clean light/dark mode support.
 */
export function QuestionCard({
  question,
  onToggleStatus,
  onEdit,
  onDelete,
}) {
  const { id, title, category, difficulty, status, notes, leetcodeUrl, createdAt, completedAt } = question;
  const isCompleted = status === STATUS.COMPLETED;
  const catStyle = getCategoryStyle(category);

  return (
    <div
      className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between border ${
        isCompleted
          ? 'bg-emerald-50/40 dark:bg-zinc-900/70 border-emerald-200 dark:border-emerald-500/25 shadow-sm'
          : 'bg-white dark:bg-zinc-900/80 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Category accent bar at the top edge */}
      <div
        className={`absolute top-0 left-6 right-6 h-[2px] rounded-b opacity-60 group-hover:opacity-100 transition-opacity ${catStyle.bar}`}
      />

      <div>
        {/* Header row: Badges + Action Buttons */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="category" value={category}>
              {category}
            </Badge>
            <Badge variant="difficulty" value={difficulty}>
              {difficulty}
            </Badge>
          </div>

          <QuestionActions
            leetcodeUrl={leetcodeUrl}
            onEdit={() => onEdit(question)}
            onDelete={() => onDelete(id)}
            title={title}
          />
        </div>

        {/* Question Title - High Contrast */}
        <h4
          className={`text-sm sm:text-base font-bold leading-snug transition-colors break-words ${
            isCompleted
              ? 'text-slate-500 dark:text-zinc-400 line-through decoration-slate-400 dark:decoration-zinc-600'
              : 'text-slate-900 dark:text-zinc-100 group-hover:text-orange-600 dark:group-hover:text-white'
          }`}
        >
          {title}
        </h4>

        {/* Expandable Notes */}
        <QuestionNotes notes={notes} />
      </div>

      {/* Footer row: Status Toggle + Date Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between gap-2 flex-wrap text-xs">
        <QuestionStatusToggle
          status={status}
          onToggle={() => onToggleStatus(id)}
        />

        <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 font-sans text-[11px]">
          {isCompleted && completedAt ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Done {timeAgo(completedAt)}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(createdAt)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
