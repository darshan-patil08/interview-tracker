import { STATUS } from '../../../constants';
import { CheckCircle2, Clock, CircleDot } from 'lucide-react';
import { getStatusStyle } from '../../../utils/helpers';

/**
 * QuestionStatusToggle Component
 * Allows cycling or selecting status directly on the question card.
 */
export function QuestionStatusToggle({ status, onToggle }) {
  const statStyle = getStatusStyle(status);

  const getIcon = () => {
    switch (status) {
      case STATUS.COMPLETED:
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />;
      case STATUS.IN_PROGRESS:
        return <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />;
      case STATUS.PENDING:
      default:
        return <CircleDot className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-400" />;
    }
  };

  return (
    <div className="relative inline-flex items-center group">
      <button
        type="button"
        onClick={onToggle}
        title="Click to cycle status: Pending → In Progress → Completed"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${statStyle.badge} hover:shadow-sm`}
      >
        {getIcon()}
        <span>{status}</span>
        <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
          ↻
        </span>
      </button>
    </div>
  );
}

export default QuestionStatusToggle;
