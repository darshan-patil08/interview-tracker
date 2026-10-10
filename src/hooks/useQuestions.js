/**
 * hooks/useQuestions.js
 * ─────────────────────────────────────────────────────────────
 * Primary data hook handling CRUD operations, data backups,
 * and derived statistics for interview preparation.
 * Defaults to an empty list.
 * ─────────────────────────────────────────────────────────────
 */

import { useMemo, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { STORAGE_KEY, STATUS, CATEGORIES } from '../constants';

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useQuestions() {
  // ── Persistent State in LocalStorage (defaults to empty array) ──
  const [questions, setQuestions] = useLocalStorage(STORAGE_KEY, []);

  // ── Add Question ─────────────────────────────────────────
  const addQuestion = useCallback(
    (formData) => {
      const newQuestion = {
        id: generateId(),
        title: (formData.title || '').trim(),
        category: formData.category || CATEGORIES.DSA,
        difficulty: formData.difficulty,
        status: formData.status || STATUS.PENDING,
        notes: (formData.notes || '').trim(),
        leetcodeUrl: (formData.leetcodeUrl || '').trim(),
        createdAt: new Date().toISOString(),
        completedAt:
          formData.status === STATUS.COMPLETED ? new Date().toISOString() : null,
      };

      setQuestions((prev) => [newQuestion, ...(prev || [])]);
      return newQuestion;
    },
    [setQuestions]
  );

  // ── Update Question ──────────────────────────────────────
  const updateQuestion = useCallback(
    (id, updates) => {
      setQuestions((prev) =>
        (prev || []).map((q) => {
          if (q.id !== id) return q;

          const updated = { ...q, ...updates };

          if (updates.status === STATUS.COMPLETED && !q.completedAt) {
            updated.completedAt = new Date().toISOString();
          } else if (updates.status && updates.status !== STATUS.COMPLETED) {
            updated.completedAt = null;
          }

          return updated;
        })
      );
    },
    [setQuestions]
  );

  // ── Delete Question ──────────────────────────────────────
  const deleteQuestion = useCallback(
    (id) => {
      setQuestions((prev) => (prev || []).filter((q) => q.id !== id));
    },
    [setQuestions]
  );

  // ── Toggle Status ────────────────────────────────────────
  const toggleStatus = useCallback(
    (id) => {
      const cycle = [STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.COMPLETED];
      setQuestions((prev) =>
        (prev || []).map((q) => {
          if (q.id !== id) return q;
          const nextIndex = (cycle.indexOf(q.status) + 1) % cycle.length;
          const nextStatus = cycle[nextIndex];
          return {
            ...q,
            status: nextStatus,
            completedAt:
              nextStatus === STATUS.COMPLETED ? new Date().toISOString() : null,
          };
        })
      );
    },
    [setQuestions]
  );

  // ── Clear All Questions ──────────────────────────────────
  const clearAll = useCallback(() => {
    setQuestions([]);
  }, [setQuestions]);

  // ── Import JSON Array ────────────────────────────────────
  const importQuestions = useCallback(
    (importedList) => {
      if (Array.isArray(importedList)) {
        setQuestions(importedList);
      }
    },
    [setQuestions]
  );

  // ── Derived Stats (memoized) ─────────────────────────────
  const stats = useMemo(() => {
    const list = questions || [];
    const total = list.length;
    const completed = list.filter((q) => q.status === STATUS.COMPLETED).length;
    const inProgress = list.filter((q) => q.status === STATUS.IN_PROGRESS).length;
    const pending = list.filter((q) => q.status === STATUS.PENDING).length;

    // Per-category counts
    const dsaTotal = list.filter((q) => q.category === CATEGORIES.DSA).length;
    const dsaCompleted = list.filter(
      (q) => q.category === CATEGORIES.DSA && q.status === STATUS.COMPLETED
    ).length;

    const gitTotal = list.filter((q) => q.category === CATEGORIES.GIT).length;
    const gitCompleted = list.filter(
      (q) => q.category === CATEGORIES.GIT && q.status === STATUS.COMPLETED
    ).length;

    const techTotal = list.filter((q) => q.category === CATEGORIES.TECHNICAL).length;
    const techCompleted = list.filter(
      (q) => q.category === CATEGORIES.TECHNICAL && q.status === STATUS.COMPLETED
    ).length;

    const machineTotal = list.filter((q) => q.category === CATEGORIES.MACHINE).length;
    const machineCompleted = list.filter(
      (q) => q.category === CATEGORIES.MACHINE && q.status === STATUS.COMPLETED
    ).length;

    const completionRate =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      inProgress,
      pending,
      completionRate,
      dsa: { total: dsaTotal, completed: dsaCompleted },
      git: { total: gitTotal, completed: gitCompleted },
      technical: { total: techTotal, completed: techCompleted },
      machine: { total: machineTotal, completed: machineCompleted },
    };
  }, [questions]);

  return {
    questions: questions || [],
    stats,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleStatus,
    clearAll,
    importQuestions,
  };
}

export default useQuestions;
