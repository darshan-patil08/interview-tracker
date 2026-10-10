/**
 * utils/helpers.js
 * ─────────────────────────────────────────────────────────────
 * Pure utility functions for styling, formatting, and validation.
 * ─────────────────────────────────────────────────────────────
 */

import { CATEGORIES, DIFFICULTY, STATUS } from '../constants';

// ── Category Styling (Tailwind utility classes) ───────────────
export function getCategoryStyle(category) {
  switch (category) {
    case CATEGORIES.DSA:
      return {
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        bg: 'bg-purple-500/10',
        bar: 'bg-purple-500',
        hex: '#a855f7',
      };
    case CATEGORIES.GIT:
      return {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        bar: 'bg-emerald-500',
        hex: '#10b981',
      };
    case CATEGORIES.TECHNICAL:
      return {
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        bg: 'bg-blue-500/10',
        bar: 'bg-blue-500',
        hex: '#3b82f6',
      };
    case CATEGORIES.MACHINE:
      return {
        badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:bg-pink-500/20',
        text: 'text-pink-400',
        border: 'border-pink-500/30',
        bg: 'bg-pink-500/10',
        bar: 'bg-pink-500',
        hex: '#ec4899',
      };
    default:
      return {
        badge: 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700',
        text: 'text-zinc-300',
        border: 'border-zinc-700',
        bg: 'bg-zinc-800/50',
        bar: 'bg-zinc-500',
        hex: '#71717a',
      };
  }
}

// ── Difficulty Styling ───────────────────────────────────────
export function getDifficultyStyle(difficulty) {
  switch (difficulty) {
    case DIFFICULTY.EASY:
      return {
        badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
        dot: 'bg-teal-400',
        text: 'text-teal-400',
      };
    case DIFFICULTY.MEDIUM:
      return {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        dot: 'bg-amber-400',
        text: 'text-amber-400',
      };
    case DIFFICULTY.HARD:
      return {
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        dot: 'bg-rose-400',
        text: 'text-rose-400',
      };
    default:
      return {
        badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        dot: 'bg-zinc-400',
        text: 'text-zinc-400',
      };
  }
}

// ── Status Styling ───────────────────────────────────────────
export function getStatusStyle(status) {
  switch (status) {
    case STATUS.COMPLETED:
      return {
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        dot: 'bg-emerald-400',
        border: 'border-emerald-500/40',
        text: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10 text-emerald-400',
      };
    case STATUS.IN_PROGRESS:
      return {
        badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        dot: 'bg-amber-400 animate-pulse',
        border: 'border-amber-500/40',
        text: 'text-amber-400',
        iconBg: 'bg-amber-500/10 text-amber-400',
      };
    case STATUS.PENDING:
    default:
      return {
        badge: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
        dot: 'bg-zinc-400',
        border: 'border-zinc-700/50',
        text: 'text-zinc-400',
        iconBg: 'bg-zinc-800 text-zinc-400',
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
