import { useState } from 'react';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';
import Button from '../../ui/Button';
import CategorySelector from './CategorySelector';
import DifficultySelector from './DifficultySelector';
import StatusSelector from './StatusSelector';
import { CATEGORIES, DIFFICULTY, STATUS } from '../../../constants';
import { validateQuestionForm } from '../../../utils/helpers';
import { Link2, Sparkles, CheckCircle2 } from 'lucide-react';
import showToast from '../../../utils/toast';

/**
 * QuestionFormContent Component
 * Inner form with isolated state, eliminating the need for useEffect synchronization.
 */
function QuestionFormContent({ initialData, onSubmit, onClose }) {
  const isEditing = Boolean(initialData?.id);

  const [formData, setFormData] = useState(() => ({
    title: initialData?.title || '',
    category: initialData?.category || CATEGORIES.DSA,
    difficulty: initialData?.difficulty || DIFFICULTY.MEDIUM,
    status: initialData?.status || STATUS.PENDING,
    leetcodeUrl: initialData?.leetcodeUrl || '',
    notes: initialData?.notes || '',
  }));

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    if (touched[name]) {
      const allErrors = validateQuestionForm(nextFormData);
      setErrors((prev) => ({
        ...prev,
        [name]: allErrors[name],
      }));
    }
  };

  // Handle blur for touch tracking
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const allErrors = validateQuestionForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: allErrors[name],
    }));
  };

  // Direct select for category, difficulty, status
  const handleSelectField = (field, value) => {
    const nextFormData = { ...formData, [field]: value };
    setFormData(nextFormData);
    setTouched((prev) => ({ ...prev, [field]: true }));
    const allErrors = validateQuestionForm(nextFormData);
    setErrors((prev) => ({
      ...prev,
      [field]: allErrors[field],
    }));
  };

  // Submit with validation gate
  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {
      title: true,
      category: true,
      difficulty: true,
      status: true,
      leetcodeUrl: true,
      notes: true,
    };
    setTouched(allTouched);

    const validationErrors = validateQuestionForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      showToast.error(firstError || 'Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit(formData);
      showToast.success(
        isEditing ? 'Question updated successfully!' : 'Question added to tracker!'
      );
      onClose();
    } catch {
      showToast.error('Failed to save question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <Input
        label="Question Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g., Two Sum, LRU Cache, Git Rebase conflict"
        required
        error={touched.title ? errors.title : undefined}
        helperText="A clear, identifiable title for the problem"
        autoFocus
      />

      {/* Category Selector */}
      <CategorySelector
        value={formData.category}
        onChange={(val) => handleSelectField('category', val)}
        error={touched.category ? errors.category : undefined}
        required
      />

      {/* Difficulty & Status (side by side) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DifficultySelector
          value={formData.difficulty}
          onChange={(val) => handleSelectField('difficulty', val)}
          error={touched.difficulty ? errors.difficulty : undefined}
          required
        />

        <StatusSelector
          value={formData.status}
          onChange={(val) => handleSelectField('status', val)}
          error={touched.status ? errors.status : undefined}
          required
        />
      </div>

      {/* LeetCode / Reference URL */}
      <Input
        label="Reference / LeetCode / Repo URL (Optional)"
        name="leetcodeUrl"
        value={formData.leetcodeUrl}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="https://leetcode.com/problems/... or GitHub repo"
        icon={Link2}
        error={touched.leetcodeUrl ? errors.leetcodeUrl : undefined}
        helperText="Direct link to practice problem or solution repository"
      />

      {/* Notes & Key Takeaways */}
      <Textarea
        label="Notes & Key Takeaways (Optional)"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="e.g., Optimal approach: HashMap for O(n) time. Watch edge cases: duplicate elements, empty array."
        rows={3}
        maxLength={1000}
        error={touched.notes ? errors.notes : undefined}
        helperText="Summarize time/space complexity, pitfalls, or interview talking points"
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
        <Button variant="ghost" size="md" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isSubmitting}
          icon={isEditing ? CheckCircle2 : Sparkles}
        >
          {isEditing ? 'Save Changes' : 'Add to Tracker'}
        </Button>
      </div>
    </form>
  );
}

/**
 * QuestionFormModal Component
 * Full modal for adding or editing a question with key-based lifecycle.
 */
export function QuestionFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const isEditing = Boolean(initialData?.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Question' : 'Add New Question'}
      subtitle={
        isEditing
          ? 'Update interview question details and notes'
          : 'Track a new DSA, Git, Technical, or Machine Coding problem'
      }
      maxWidth="max-w-xl"
    >
      {isOpen && (
        <QuestionFormContent
          key={initialData?.id || initialData?.category || 'new'}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}

export default QuestionFormModal;
