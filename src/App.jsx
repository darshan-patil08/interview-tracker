import { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import useQuestions from './hooks/useQuestions';
import useFilters from './hooks/useFilters';
import useTheme from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import FilterBar from './components/tracker/FilterBar/FilterBar';
import QuestionList from './components/tracker/QuestionList/QuestionList';
import QuestionFormModal from './components/tracker/QuestionForm/QuestionFormModal';
import ImportModal from './components/tracker/ImportModal';
import ConfirmDialog from './components/ui/ConfirmDialog';
import { CATEGORIES } from './constants';
import showToast from './utils/toast';
import {
  ListChecks,
  BarChart3,
  CheckCircle2,
  Clock,
  CircleDashed,
  Layers,
} from 'lucide-react';

export function App() {
  const { isDark, toggleTheme } = useTheme();

  const {
    questions,
    stats,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleStatus,
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

  // ── Active Section View Tab ('tracker' | 'analytics') ─────
  const [activeTab, setActiveTab] = useState('tracker');

  // ── Modal States ─────────────────────────────────────────
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
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
      showToast.success('Question updated successfully!');
    } else {
      addQuestion({
        ...formData,
        category: prefilledCategory || formData.category,
      });
      showToast.success('Question added to your tracker!');
    }
  };

  // ── Delete Confirmation ──────────────────────────────────
  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteQuestion(deletingId);
      showToast.delete('Question removed from tracker.');
      setDeletingId(null);
    }
  };

  // ── Clear All Data Confirmation ──────────────────────────
  const handleConfirmClearAll = () => {
    clearAll();
    setIsClearAllDialogOpen(false);
    showToast.delete('All questions cleared from tracker.');
  };

  // ── Export JSON ──────────────────────────────────────────
  const handleExportData = () => {
    if (!questions || questions.length === 0) {
      showToast.error('No questions to export! Add questions to your tracker first.');
      return;
    }

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
      showToast.download(`Exported backup of ${questions.length} questions as JSON.`);
    } catch {
      showToast.error('Failed to export questions.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09080e] text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors selection:bg-orange-500/20 selection:text-orange-900 dark:selection:bg-orange-500/30 dark:selection:text-orange-200">
      {/* Toast Notification Container */}
      <Toaster position="top-right" />

      {/* 1. Header Navigation */}
      <Navbar
        stats={stats}
        onOpenAddModal={() => handleOpenAddModal()}
        onClearAllData={() => setIsClearAllDialogOpen(true)}
        onExportData={handleExportData}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Section Navigation Tabs (Organized, unclustered layout) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center p-1 rounded-xl bg-slate-200/70 dark:bg-zinc-900/90 border border-slate-300/80 dark:border-zinc-800 shadow-xs">
            {/* Tab 1: Question Tracker */}
            <button
              type="button"
              onClick={() => setActiveTab('tracker')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'tracker'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <ListChecks className="w-4 h-4 text-orange-500" />
              <span>Question Tracker</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-700/60 font-mono text-slate-700 dark:text-zinc-300 font-bold">
                {stats.total}
              </span>
            </button>

            {/* Tab 2: Analytics & Insights */}
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-sm'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span>Analytics & Insights</span>
              {stats.completionRate > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 font-mono text-emerald-800 dark:text-emerald-300 font-bold">
                  {stats.completionRate}%
                </span>
              )}
            </button>
          </div>

          {/* Quick status summary chip on the right */}
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <strong className="text-slate-800 dark:text-zinc-200 font-mono">{stats.completed}</strong> Done
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <strong className="text-slate-800 dark:text-zinc-200 font-mono">{stats.inProgress}</strong> Active
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-zinc-600" />
              <strong className="text-slate-800 dark:text-zinc-200 font-mono">{stats.pending}</strong> Pending
            </span>
          </div>
        </div>

        {/* ── View 1: Question Tracker ────────────────────── */}
        {activeTab === 'tracker' && (
          <section aria-label="Question Tracker View" className="space-y-5 animate-fade-up">
            {/* Quick KPI Strip when questions exist */}
            {stats.total > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium block">Total In Track</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-zinc-100 font-mono">{stats.total}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium block">Completed</span>
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-mono">{stats.completed}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium block">In Progress</span>
                    <span className="text-lg font-bold text-amber-700 dark:text-amber-400 font-mono">{stats.inProgress}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium block">Pending</span>
                    <span className="text-lg font-bold text-slate-600 dark:text-zinc-400 font-mono">{stats.pending}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 flex items-center justify-center">
                    <CircleDashed className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

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
              onOpenImport={() => setIsImportModalOpen(true)}
            />
          </section>
        )}

        {/* ── View 2: Analytics & Insights ────────────────── */}
        {activeTab === 'analytics' && (
          <section aria-label="Analytics & Insights View" className="animate-fade-up">
            <Dashboard
              stats={stats}
              onAddMachineTask={() => {
                setActiveTab('tracker');
                handleOpenAddModal(CATEGORIES.MACHINE);
              }}
            />
          </section>
        )}
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

      {/* JSON Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(importedQuestions) => {
          importQuestions(importedQuestions);
        }}
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
        message="This will permanently delete all stored interview questions from LocalStorage. This action cannot be undone."
        confirmText="Clear All Data"
        variant="danger"
      />
    </div>
  );
}

export default App;
