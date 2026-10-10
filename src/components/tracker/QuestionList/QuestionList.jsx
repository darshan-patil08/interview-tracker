import QuestionCard from './QuestionCard';
import EmptyState from './EmptyState';
import NoSearchResults from './NoSearchResults';

/**
 * QuestionList Component
 * Container for the grid of practice questions with empty and no-results states.
 */
export function QuestionList({
  questions,
  totalCount,
  searchQuery,
  // eslint-disable-next-line no-unused-vars
  hasActiveFilters,
  onToggleStatus,
  onEdit,
  onDelete,
  onResetFilters,
  onAddQuestion,
  onLoadSamples,
}) {
  // Case 1: Database/LocalStorage has no items at all
  if (totalCount === 0) {
    return (
      <EmptyState
        onAddQuestion={onAddQuestion}
        onLoadSamples={onLoadSamples}
      />
    );
  }

  // Case 2: Filters/Search resulted in 0 items
  if (questions.length === 0) {
    return (
      <NoSearchResults
        query={searchQuery}
        onResetFilters={onResetFilters}
      />
    );
  }

  // Case 3: Render question cards grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default QuestionList;
