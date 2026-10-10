/**
 * constants/index.js
 * ─────────────────────────────────────────────────────────────
 * Central place for all app-wide constants.
 * WHY: Avoids "magic strings" scattered across the codebase.
 *      When a label changes, you update it here — one location.
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

// ── Seed Data (shown on first load so the UI isn't empty) ────
export const SEED_QUESTIONS = [
  {
    id: 'seed-1',
    title: 'Two Sum',
    category: CATEGORIES.DSA,
    difficulty: DIFFICULTY.EASY,
    status: STATUS.COMPLETED,
    notes: 'HashMap approach — O(n) time, O(n) space. LC 1',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    createdAt: new Date('2026-10-05').toISOString(),
    completedAt: new Date('2026-10-05').toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Remove Duplicates from Sorted Array',
    category: CATEGORIES.DSA,
    difficulty: DIFFICULTY.EASY,
    status: STATUS.COMPLETED,
    notes: 'Two-pointer technique. LC 26',
    leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
    createdAt: new Date('2026-10-05').toISOString(),
    completedAt: new Date('2026-10-06').toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Move Zeroes',
    category: CATEGORIES.DSA,
    difficulty: DIFFICULTY.EASY,
    status: STATUS.IN_PROGRESS,
    notes: 'LC 283 — two pointers',
    leetcodeUrl: 'https://leetcode.com/problems/move-zeroes/',
    createdAt: new Date('2026-10-06').toISOString(),
    completedAt: null,
  },
  {
    id: 'seed-4',
    title: 'Rotate Array',
    category: CATEGORIES.DSA,
    difficulty: DIFFICULTY.MEDIUM,
    status: STATUS.PENDING,
    notes: 'LC 189 — reverse trick',
    leetcodeUrl: 'https://leetcode.com/problems/rotate-array/',
    createdAt: new Date('2026-10-06').toISOString(),
    completedAt: null,
  },
  {
    id: 'seed-5',
    title: '3Sum',
    category: CATEGORIES.DSA,
    difficulty: DIFFICULTY.MEDIUM,
    status: STATUS.PENDING,
    notes: 'LC 15 — sort + two pointers',
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    createdAt: new Date('2026-10-07').toISOString(),
    completedAt: null,
  },
  {
    id: 'seed-6',
    title: 'Wrong Branch, Correct Work',
    category: CATEGORIES.GIT,
    difficulty: DIFFICULTY.MEDIUM,
    status: STATUS.COMPLETED,
    notes: 'git cherry-pick / git reset --soft approach explained',
    createdAt: new Date('2026-10-07').toISOString(),
    completedAt: new Date('2026-10-07').toISOString(),
  },
  {
    id: 'seed-7',
    title: 'Merge Conflict During PR',
    category: CATEGORIES.GIT,
    difficulty: DIFFICULTY.MEDIUM,
    status: STATUS.IN_PROGRESS,
    notes: 'Rebase vs merge trade-offs, conflict resolution workflow',
    createdAt: new Date('2026-10-08').toISOString(),
    completedAt: null,
  },
  {
    id: 'seed-8',
    title: 'Secret Accidentally Committed',
    category: CATEGORIES.GIT,
    difficulty: DIFFICULTY.HARD,
    status: STATUS.PENDING,
    notes: 'git filter-branch / BFG Repo Cleaner + rotate secrets',
    createdAt: new Date('2026-10-08').toISOString(),
    completedAt: null,
  },
  {
    id: 'seed-9',
    title: 'JavaScript — Async Flow & Event Loop',
    category: CATEGORIES.TECHNICAL,
    difficulty: DIFFICULTY.MEDIUM,
    status: STATUS.COMPLETED,
    notes: 'Microtask vs macrotask queue, Promise callbacks, blocking JS',
    createdAt: new Date('2026-10-09').toISOString(),
    completedAt: new Date('2026-10-09').toISOString(),
  },
  {
    id: 'seed-10',
    title: 'React — Unnecessary Re-render',
    category: CATEGORIES.TECHNICAL,
    difficulty: DIFFICULTY.MEDIUM,
    status: STATUS.IN_PROGRESS,
    notes: 'React.memo, useMemo, useCallback — when to use and when NOT to',
    createdAt: new Date('2026-10-09').toISOString(),
    completedAt: null,
  },
  {
    id: 'seed-11',
    title: 'Interview Practice Tracker — Machine Coding',
    category: CATEGORIES.MACHINE,
    difficulty: DIFFICULTY.HARD,
    status: STATUS.IN_PROGRESS,
    notes: 'React + LocalStorage + Chart.js dashboard. Building now!',
    createdAt: new Date('2026-10-10').toISOString(),
    completedAt: null,
  },
];
