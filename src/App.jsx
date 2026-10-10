import { useState, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useQuestions from './hooks/useQuestions';
import useFilters from './hooks/useFilters';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import FilterBar from './components/tracker/FilterBar/FilterBar';
import QuestionList from './components/tracker/QuestionList/QuestionList';
import QuestionFormModal from './components/tracker/QuestionForm/QuestionFormModal';
import ConfirmDialog from './components/ui/ConfirmDialog';
import { CATEGORIES } from './constants';
import { BookOpen } from 'lucide-react';

export function App() {
  const {
    questions,
    stats,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleStatus,
    resetToSeed,
    clearAll,
    importQuestions,
  } = useQuestions();

  const {
    filters,
    filteredQuestions,
    hasActiveFilters,
    updateFilter,
    resetFilters,
  } = useFilters(questions);

  // ── Modal States ─────────────────────────────────────────
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isClearAllDialogOpen, setIsClearAllDialogOpen] = useState(false);
  const [prefilledCategory, setPrefilledCategory] = useState(null);

  // Category counts for FilterBar pills
  const categoryCounts = useMemo(() => {
    return {
      All: stats.total,
      [CATEGORIES.DSA]: stats.dsa.total,
      [CATEGORIES.GIT]: stats.git.total,
      [CATEGORIES.TECHNICAL]: stats.technical.total,
      [CATEGORIES.MACHINE]: stats.machine.total,
    };
  }, [stats]);

  // Find question to be deleted for confirmation dialog message
  const deletingQuestion = useMemo(() => {
    return questions.find((q) => q.id === deletingId);
  }, [questions, deletingId]);

  // ── Open Add Modal ───────────────────────────────────────
  const handleOpenAddModal = (category = null) => {
    setEditingQuestion(null);
    setPrefilledCategory(category);
    setIsFormModalOpen(true);
  };

  // ── Open Edit Modal ──────────────────────────────────────
  const handleOpenEditModal = (question) => {
    setEditingQuestion(question);
    setPrefilledCategory(null);
    setIsFormModalOpen(true);
  };

  // ── Form Submit (Add or Update) ──────────────────────────
  const handleFormSubmit = (formData) => {
    if (editingQuestion) {
      updateQuestion(editingQuestion.id, formData);
    } else {
      addQuestion({
        ...formData,
        category: prefilledCategory || formData.category,
      });
    }
  };

  // ── Delete Confirmation ──────────────────────────────────
  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteQuestion(deletingId);
      toast.success('Question deleted from tracker.', { icon: '🗑️' });
      setDeletingId(null);
    }
  };

  // ── Reset to Sample Data ─────────────────────────────────
  const handleResetSeedData = () => {
    resetToSeed();
    toast.success('Reset to sample practice questions!', { icon: '🔄' });
  };

  // ── Clear All Data Confirmation ──────────────────────────
  const handleConfirmClearAll = () => {
    clearAll();
    setIsClearAllDialogOpen(false);
    toast.success('All questions cleared.', { icon: '🧹' });
  };

  // ── Export JSON ──────────────────────────────────────────
  const handleExportData = () => {
    try {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(questions, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute(
        'download',
        `interview-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success('Exported questions backup as JSON!', { icon: '💾' });
    } catch {
      toast.error('Failed to export data.');
    }
  };

  // ── Import JSON ──────────────────────────────────────────
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          importQuestions(parsed);
          toast.success(`Imported ${parsed.length} questions successfully!`, {
            icon: '📥',
          });
        } else {
          toast.error('Invalid JSON file format. Expected an array of questions.');
        }
      } catch {
        toast.error('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-[#09080e] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Toast Notification Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#13111c',
            color: '#f3f4f6',
            border: '1px solid #28243d',
            borderRadius: '1rem',
            fontSize: '0.875rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#13111c',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#13111c',
            },
          },
        }}
      />

      {/* 1. Header Navigation */}
      <Navbar
        stats={stats}
        onOpenAddModal={() => handleOpenAddModal()}
        onResetSeedData={handleResetSeedData}
        onClearAllData={() => setIsClearAllDialogOpen(true)}
        onExportData={handleExportData}
        onImportData={handleImportData}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Dashboard Section */}
        <section aria-label="Interview Readiness Dashboard">
          <Dashboard
            stats={stats}
            onAddMachineTask={() => handleOpenAddModal(CATEGORIES.MACHINE)}
          />
        </section>

        {/* Question Tracker Section */}
        <section aria-label="Question Tracker" className="space-y-4 pt-2">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-zinc-100">
                  Question Tracker
                </h2>
                <p className="text-xs text-zinc-400">
                  Search, filter, track status, and review practice notes
                </p>
              </div>
            </div>
          </div>

          {/* Filter, Search, and Sort Controls */}
          <FilterBar
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
            totalCount={stats.total}
            filteredCount={filteredQuestions.length}
            categoryCounts={categoryCounts}
          />

          {/* Question Grid / Empty States */}
          <QuestionList
            questions={filteredQuestions}
            totalCount={stats.total}
            searchQuery={filters.search}
            hasActiveFilters={hasActiveFilters}
            onToggleStatus={toggleStatus}
            onEdit={handleOpenEditModal}
            onDelete={(id) => setDeletingId(id)}
            onResetFilters={resetFilters}
            onAddQuestion={() => handleOpenAddModal()}
            onLoadSamples={handleResetSeedData}
          />
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* ── Modals & Dialogs ───────────────────────────────── */}

      {/* Add / Edit Question Modal */}
      <QuestionFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingQuestion(null);
          setPrefilledCategory(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={
          editingQuestion ||
          (prefilledCategory ? { category: prefilledCategory } : null)
        }
      />

      {/* Delete Single Question Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Question?"
        message={`Are you sure you want to remove "${
          deletingQuestion?.title || 'this question'
        }" from your interview tracker? This action cannot be undone.`}
        confirmText="Delete Question"
        variant="danger"
      />

      {/* Clear All Questions Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isClearAllDialogOpen}
        onClose={() => setIsClearAllDialogOpen(false)}
        onConfirm={handleConfirmClearAll}
        title="Clear All Questions?"
        message="This will permanently delete all stored interview questions from LocalStorage. You can reload sample questions anytime."
        confirmText="Clear All Data"
        variant="danger"
      />
    </div>
  );
}

export default App;
