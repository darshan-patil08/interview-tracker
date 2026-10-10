import Badge from '../../ui/Badge';
import QuestionStatusToggle from './QuestionStatusToggle';
import QuestionActions from './QuestionActions';
import QuestionNotes from './QuestionNotes';
import { formatDate, timeAgo, getCategoryStyle } from '../../../utils/helpers';
import { STATUS } from '../../../constants';
import { Calendar, CheckCheck } from 'lucide-react';

/**
 * QuestionCard Component
 * Modern card displaying individual problem information with modular sub-components.
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
      className={`group relative bg-zinc-900/80 hover:bg-zinc-900 border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between ${
        isCompleted
          ? 'border-emerald-500/25 bg-zinc-900/60'
          : 'border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Category accent bar at the top edge */}
      <div
        className={`absolute top-0 left-6 right-6 h-[2px] rounded-b opacity-40 group-hover:opacity-100 transition-opacity ${catStyle.bar}`}
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

        {/* Question Title */}
        <h4
          className={`text-sm sm:text-base font-semibold leading-snug transition-colors break-words ${
            isCompleted
              ? 'text-zinc-300 line-through decoration-zinc-600/70'
              : 'text-zinc-100 group-hover:text-white'
          }`}
        >
          {title}
        </h4>

        {/* Expandable Notes */}
        <QuestionNotes notes={notes} />
      </div>

      {/* Footer row: Status Toggle + Date Info */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2 flex-wrap text-xs">
        <QuestionStatusToggle
          status={status}
          onToggle={() => onToggleStatus(id)}
        />

        <div className="flex items-center gap-1.5 text-zinc-500 font-sans text-[11px]">
          {isCompleted && completedAt ? (
            <span className="inline-flex items-center gap-1 text-emerald-400/90 font-medium">
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
