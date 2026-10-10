/**
 * utils/helpers.js
 * ─────────────────────────────────────────────────────────────
 * Pure utility functions for styling, formatting, and validation.
 * Optimized for high contrast in both Light Mode and Dark Mode.
 * ─────────────────────────────────────────────────────────────
 */

import { CATEGORIES, DIFFICULTY, STATUS } from '../constants';

// ── Category Styling (Dual Light/Dark with WCAG High Contrast) ─
export function getCategoryStyle(category) {
  switch (category) {
    case CATEGORIES.DSA:
      return {
        badge:
          'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30 hover:bg-purple-200 dark:hover:bg-purple-500/25',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-500/30',
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        bar: 'bg-purple-600 dark:bg-purple-500',
        hex: '#9333ea',
      };
    case CATEGORIES.GIT:
      return {
        badge:
          'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 hover:bg-emerald-200 dark:hover:bg-emerald-500/25',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-500/30',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        bar: 'bg-emerald-600 dark:bg-emerald-500',
        hex: '#059669',
      };
    case CATEGORIES.TECHNICAL:
      return {
        badge:
          'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 hover:bg-blue-200 dark:hover:bg-blue-500/25',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-500/30',
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        bar: 'bg-blue-600 dark:bg-blue-500',
        hex: '#2563eb',
      };
    case CATEGORIES.MACHINE:
      return {
        badge:
          'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-500/15 dark:text-pink-300 dark:border-pink-500/30 hover:bg-pink-200 dark:hover:bg-pink-500/25',
        text: 'text-pink-700 dark:text-pink-400',
        border: 'border-pink-200 dark:border-pink-500/30',
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        bar: 'bg-pink-600 dark:bg-pink-500',
        hex: '#db2777',
      };
    default:
      return {
        badge:
          'bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
        text: 'text-slate-700 dark:text-zinc-300',
        border: 'border-slate-200 dark:border-zinc-700',
        bg: 'bg-slate-50 dark:bg-zinc-800/50',
        bar: 'bg-slate-500 dark:bg-zinc-500',
        hex: '#64748b',
      };
  }
}

// ── Difficulty Styling ───────────────────────────────────────
export function getDifficultyStyle(difficulty) {
  switch (difficulty) {
    case DIFFICULTY.EASY:
      return {
        badge:
          'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30',
        dot: 'bg-teal-600 dark:bg-teal-400',
        text: 'text-teal-700 dark:text-teal-400',
      };
    case DIFFICULTY.MEDIUM:
      return {
        badge:
          'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
        dot: 'bg-amber-600 dark:bg-amber-400',
        text: 'text-amber-700 dark:text-amber-400',
      };
    case DIFFICULTY.HARD:
      return {
        badge:
          'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
        dot: 'bg-rose-600 dark:bg-rose-400',
        text: 'text-rose-700 dark:text-rose-400',
      };
    default:
      return {
        badge:
          'bg-slate-100 text-slate-800 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
        dot: 'bg-slate-500 dark:bg-zinc-400',
        text: 'text-slate-600 dark:text-zinc-400',
      };
  }
}

// ── Status Styling ───────────────────────────────────────────
export function getStatusStyle(status) {
  switch (status) {
    case STATUS.COMPLETED:
      return {
        badge:
          'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
        dot: 'bg-emerald-600 dark:bg-emerald-400',
        border: 'border-emerald-300 dark:border-emerald-500/40',
        text: 'text-emerald-700 dark:text-emerald-400',
      };
    case STATUS.IN_PROGRESS:
      return {
        badge:
          'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
        dot: 'bg-amber-600 dark:bg-amber-400 animate-pulse',
        border: 'border-amber-300 dark:border-amber-500/40',
        text: 'text-amber-700 dark:text-amber-400',
      };
    case STATUS.PENDING:
    default:
      return {
        badge:
          'bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
        dot: 'bg-slate-400 dark:bg-zinc-500',
        border: 'border-slate-200 dark:border-zinc-700/50',
        text: 'text-slate-600 dark:text-zinc-400',
      };
  }
}

// ── Date Formatting ──────────────────────────────────────────
export function formatDate(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

export function timeAgo(isoString) {
  if (!isoString) return '';
  const seconds = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (seconds < 60) return 'just now';

  const intervals = [
    { label: 'yr', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'w',  seconds: 604800 },
    { label: 'd',  seconds: 86400 },
    { label: 'h',  seconds: 3600 },
    { label: 'm',  seconds: 60 },
  ];

  for (const { label, seconds: s } of intervals) {
    const count = Math.floor(seconds / s);
    if (count >= 1) return `${count}${label} ago`;
  }
  return 'just now';
}

// ── Form Validation ──────────────────────────────────────────
export function validateQuestionForm(data) {
  const errors = {};

  // Title validation
  const title = (data.title || '').trim();
  if (!title) {
    errors.title = 'Title is required.';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (title.length > 120) {
    errors.title = 'Title cannot exceed 120 characters.';
  }

  // Category validation
  if (!data.category) {
    errors.category = 'Please select a category.';
  }

  // Difficulty validation
  if (!data.difficulty) {
    errors.difficulty = 'Please select a difficulty level.';
  }

  // Status validation
  if (!data.status) {
    errors.status = 'Please select a status.';
  }

  // Optional URL validation
  if (data.leetcodeUrl && data.leetcodeUrl.trim()) {
    const url = data.leetcodeUrl.trim();
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        errors.leetcodeUrl = 'URL must start with http:// or https://';
      }
    } catch {
      errors.leetcodeUrl = 'Please enter a valid web URL (e.g., https://leetcode.com/...)';
    }
  }

  // Optional notes length validation
  if (data.notes && data.notes.length > 1000) {
    errors.notes = 'Notes cannot exceed 1000 characters.';
  }

  return errors;
}
