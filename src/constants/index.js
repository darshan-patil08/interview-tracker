/**
 * constants/index.js
 * ─────────────────────────────────────────────────────────────
 * Central place for all app-wide constants.
 * ─────────────────────────────────────────────────────────────
 */

// ── Categories ───────────────────────────────────────────────
export const CATEGORIES = {
  DSA:       'DSA',
  GIT:       'Git & GitHub',
  TECHNICAL: 'Full-Stack Technical',
  MACHINE:   'Machine Coding',
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

// ── Difficulty ───────────────────────────────────────────────
export const DIFFICULTY = {
  EASY:   'Easy',
  MEDIUM: 'Medium',
  HARD:   'Hard',
};

export const DIFFICULTY_LIST = Object.values(DIFFICULTY);

// ── Status ───────────────────────────────────────────────────
export const STATUS = {
  PENDING:     'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED:   'Completed',
};

export const STATUS_LIST = Object.values(STATUS);

// ── LocalStorage Key ─────────────────────────────────────────
export const STORAGE_KEY = 'interview_tracker_v1';
