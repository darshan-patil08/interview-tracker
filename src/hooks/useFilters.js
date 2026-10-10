/**
 * hooks/useFilters.js
 * ─────────────────────────────────────────────────────────────
 * Manages search + filter state and computes the filtered list.
 *
 * PATTERN: Derived state with useMemo — the filtered list is
 * never stored in state; it's always computed from the source.
 *
 * ALGORITHM:
 *  - Search: case-insensitive String.includes — O(n × m)
 *    where n = questions, m = search string length
 *  - Filters: Array.filter with multiple conditions — O(n)
 *
 * WHY NOT store filtered list in state?
 *  Storing derived data creates a "two sources of truth" bug.
 *  If the source changes and you forget to update the derived
 *  copy, you get stale UI. useMemo prevents this entirely.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useMemo, useCallback } from 'react';

const INITIAL_FILTERS = {
  search:     '',
  category:   'All',
  status:     'All',
  difficulty: 'All',
  sortBy:     'newest', // newest | oldest | az | za
};

function useFilters(questions) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // ── Update a single filter field ─────────────────────────
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // ── Reset all filters ────────────────────────────────────
  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // ── Derived filtered + sorted list ───────────────────────
  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    // 1. Search filter (title and notes)
    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(term) ||
          (q.notes && q.notes.toLowerCase().includes(term))
      );
    }

    // 2. Category filter
    if (filters.category !== 'All') {
      result = result.filter((q) => q.category === filters.category);
    }

    // 3. Status filter
    if (filters.status !== 'All') {
      result = result.filter((q) => q.status === filters.status);
    }

    // 4. Difficulty filter
    if (filters.difficulty !== 'All') {
      result = result.filter((q) => q.difficulty === filters.difficulty);
    }

    // 5. Sort
    switch (filters.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [questions, filters]);

  // ── Flag: are any non-default filters active? ─────────────
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.category !== 'All' ||
      filters.status !== 'All' ||
      filters.difficulty !== 'All' ||
      filters.sortBy !== 'newest'
    );
  }, [filters]);

  return {
    filters,
    filteredQuestions,
    hasActiveFilters,
    updateFilter,
    resetFilters,
  };
}

export default useFilters;
