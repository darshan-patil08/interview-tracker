# 📘 PrepTrack — Complete Codebase Architecture & Learning Guide

Welcome to the comprehensive architecture guide for **PrepTrack (Interview Practice & Machine Coding Tracker)**. This document was written specifically for students and engineers to understand every design decision, file, hook, component, and data flow from start to finish.

---

## 📑 Table of Contents
1. [Project Overview & Core Mission](#1-project-overview--core-mission)
2. [Tech Stack & Engineering Rationale](#2-tech-stack--engineering-rationale)
3. [Architecture & Design Principles](#3-architecture--design-principles)
4. [Complete File-by-File Directory Breakdown](#4-complete-file-by-file-directory-breakdown)
5. [Data Flow & State Management Lifecycle](#5-data-flow--state-management-lifecycle)
6. [Deep-Dive: How Key Features Work](#6-deep-dive-how-key-features-work)
   - [Form Validation & Error States](#a-form-validation--error-states)
   - [Key-Based Modal State Architecture (No Set-State-in-Effect)](#b-key-based-modal-state-architecture)
   - [Derived Search & Filter Pipeline](#c-derived-search--filter-pipeline)
   - [LocalStorage Synchronization](#d-localstorage-synchronization)
   - [Data Visualization (Chart.js)](#e-data-visualization-chartjs)
7. [How to Explain This Project in an Interview or Demo Video](#7-how-to-explain-this-project-in-an-interview)

---

## 1. Project Overview & Core Mission

### What is PrepTrack?
PrepTrack is a single-page application (SPA) created for engineering candidates to track, measure, and organize their weekly interview preparation across four critical pillars:
1. **Data Structures & Algorithms (DSA)**: LeetCode problems, patterns (two pointers, sliding window, dynamic programming).
2. **Git & GitHub**: Real-world version control scenarios (merge conflicts, rebasing, cherry-picking, secrets recovery).
3. **Full-Stack Technical**: System design, event loop, React performance, Node.js internals.
4. **Machine Coding**: Timed 60–90 minute live frontend/full-stack build challenges.

### Core Problems Solved
- **No Stale Data**: Persistent storage in the browser's `localStorage` prevents losing notes or progress on refresh.
- **Actionable Visual Feedback**: Live completion percentages, track progress meters, and status charts clearly show where preparation gaps exist.
- **Fast Workflow**: Quick status toggling directly on cards, instant keyboard search with `/`, and JSON export/import for backups.

---

## 2. Tech Stack & Engineering Rationale

| Technology | Role | Why It Was Chosen |
|---|---|---|
| **React 19** | View Layer / UI | Latest concurrent React features, modern custom hooks, clean JSX composition. |
| **Vite 8** | Build Tool & Bundler | Sub-second Hot Module Replacement (HMR), lightweight Rollup-based production builds. |
| **Tailwind CSS v4** | Styling System | Utility-first styling with `@tailwindcss/vite`, CSS theme variables, zero runtime CSS overhead, dark-mode design system. |
| **Chart.js + react-chartjs-2** | Analytics Visualization | High-performance HTML5 Canvas charts (Doughnut chart for status distribution, Bar chart for category breakdown). |
| **Lucide React** | Icons | Tree-shakeable, clean SVG icons with uniform sizing and stroke styling. |
| **React Hot Toast** | Feedback Notifications | Accessible, lightweight toast alerts for CRUD actions and validation errors. |

---

## 3. Architecture & Design Principles

The application strictly adheres to three core architectural guidelines:

### Principle 1: Separation of Concerns (Logic vs Presentation)
Components do not write directly to `localStorage` or execute complex filtering math. Instead:
- **Custom Hooks** (`useQuestions`, `useFilters`, `useLocalStorage`) encapsulate all data processing, mutations, and algorithms.
- **Components** (`Dashboard`, `FilterBar`, `QuestionList`) focus exclusively on rendering UI, managing local UI states (e.g. modals), and forwarding user actions.

### Principle 2: Modular Component Breakdown (No "God" Components)
Rather than writing giant 500-line components, every section is divided into small, single-responsibility sub-components:
- `QuestionFormModal` is composed of `CategorySelector`, `DifficultySelector`, and `StatusSelector`.
- `FilterBar` is composed of `SearchInput`, `CategoryChips`, and `SortSelect`.
- `QuestionCard` is composed of `QuestionStatusToggle`, `QuestionActions`, and `QuestionNotes`.

### Principle 3: Single Source of Truth & Derived State
We never store filtered lists or calculated stats in separate `useState` variables. Storing derived state in `useState` creates the classic "stale synchronization" bug. Instead:
- `stats` is calculated via `useMemo` in `useQuestions.js` directly from `questions`.
- `filteredQuestions` is calculated via `useMemo` in `useFilters.js` directly from `questions` and `filters`.

---

## 4. Complete File-by-File Directory Breakdown

```text
interview-tracker/
├── index.html                   # HTML entry point with metadata & SEO title
├── vite.config.js               # Vite bundler config with Tailwind & network host
├── package.json                 # Project dependencies & scripts
├── README.md                    # Setup instructions & feature summary
├── CODEBASE_GUIDE.md            # This complete educational guide
│
└── src/
    ├── main.jsx                 # Mounts the React root into the DOM
    ├── App.jsx                  # Root container orchestrating hooks & layouts
    ├── index.css                # Tailwind CSS import, Google Fonts, theme tokens
    │
    ├── constants/
    │   └── index.js             # Enums (CATEGORIES, DIFFICULTY, STATUS) & seed questions
    │
    ├── utils/
    │   └── helpers.js           # Pure utilities (styling maps, date formatters, validation)
    │
    ├── hooks/
    │   ├── useLocalStorage.js   # Custom hook syncing state with localStorage
    │   ├── useQuestions.js      # Business logic: CRUD, stats computation, backups
    │   └── useFilters.js        # Derived search, category/difficulty filtering, sorting
    │
    └── components/
        ├── ui/                  # Reusable UI primitives
        │   ├── Badge.jsx        # Pill badge with category/difficulty/status colors
        │   ├── Button.jsx       # Multi-variant button (primary, secondary, danger, ghost)
        │   ├── Input.jsx        # Text input with validation feedback & error message
        │   ├── Textarea.jsx     # Multiline textarea with character counter
        │   ├── Modal.jsx        # Accessible backdrop-blurred modal dialog
        │   ├── ProgressBar.jsx  # Animated gradient progress track
        │   └── ConfirmDialog.jsx# Confirmation modal for deletions
        │
        ├── dashboard/           # Analytics & KPI overview section
        │   ├── MetricCard.jsx   # Individual KPI tile with glowing accents
        │   ├── StatsOverview.jsx# 4-column responsive KPI card grid
        │   ├── OverallProgress.jsx # Milestone progress card with dynamic motivational text
        │   ├── CategoryBreakdown.jsx # Track-by-track progress bars (DSA, Git, Tech, Machine)
        │   ├── AnalyticsCharts.jsx # Interactive Doughnut & Bar charts via Chart.js
        │   ├── MachineCodingBanner.jsx # Spotlight card for timed machine coding rounds
        │   └── Dashboard.jsx    # Master dashboard orchestrator
        │
        ├── tracker/             # Question management, filters, and list view
        │   ├── FilterBar/
        │   │   ├── SearchInput.jsx   # Live search bar with keyboard shortcut ('/')
        │   │   ├── CategoryChips.jsx # Quick category pills with live count badges
        │   │   ├── SortSelect.jsx    # Dropdown sorting (newest, oldest, A-Z, Z-A)
        │   │   └── FilterBar.jsx     # Filter bar coordinator
        │   │
        │   ├── QuestionForm/
        │   │   ├── CategorySelector.jsx   # Selectable category cards with icons
        │   │   ├── DifficultySelector.jsx # Segmented pill buttons for Easy/Medium/Hard
        │   │   ├── StatusSelector.jsx     # Segmented pill buttons for Pending/In Progress/Completed
        │   │   └── QuestionFormModal.jsx  # Add/Edit modal with real-time validation
        │   │
        │   └── QuestionList/
        │       ├── QuestionStatusToggle.jsx # Direct status cycler on the card
        │       ├── QuestionActions.jsx      # Edit, Delete, and External Link buttons
        │       ├── QuestionNotes.jsx        # Expandable/collapsible notes box
        │       ├── QuestionCard.jsx         # Card layout for an individual problem
        │       ├── EmptyState.jsx           # Zero-state illustration when database is empty
        │       ├── NoSearchResults.jsx      # Zero-result illustration when search matches 0 items
        │       └── QuestionList.jsx         # Responsive grid coordinator
        │
        └── layout/              # App chrome & layout
            ├── Navbar.jsx       # Header with branding, live stats pill, and actions menu
            └── Footer.jsx       # Footer with keyboard shortcut reminders
```

---

## 5. Data Flow & State Management Lifecycle

Below is the end-to-end data flow:

```
[ LocalStorage ("interview_tracker_v1") ]
                   ▲  ▼
       [ useLocalStorage Hook ]
                   ▲  ▼
         [ useQuestions Hook ]  ──► Computes `stats` via useMemo
                   ▲  ▼
                 [ App ]
               /        \
  (questions, stats)    (questions)
            ▼                ▼
     [ Dashboard ]     [ useFilters Hook ]  ──► Computes `filteredQuestions` via useMemo
                             ▼
                     [ FilterBar ]  ◄── (updates filters)
                             ▼
                    [ QuestionList ] ◄── (renders filteredQuestions)
                             ▼
                    [ QuestionCard ]
                             │
                             ▼
             [ User Action: Toggle Status ]
                             │
                             ▼
               (calls toggleStatus in useQuestions)
                             │
                             ▼
              [ Immutable Update in State ]
                             │
                             ▼
               [ Auto-Saved to LocalStorage ]
```

### The Mutation Cycle Explained
1. When a user clicks the status badge on a question card, `onToggle(id)` triggers.
2. `useQuestions` cycles the status (`Pending → In Progress → Completed → Pending`).
3. If changing to `Completed`, an ISO timestamp `completedAt` is recorded.
4. `useLocalStorage` saves the updated array to `window.localStorage`.
5. `useMemo` automatically recalculates `stats` (KPIs, percentage, chart data) in $O(n)$ time.
6. The entire UI updates synchronously without any page reload.

---

## 6. Deep-Dive: How Key Features Work

### A. Form Validation & Error States
Form validation is handled in `src/utils/helpers.js` via `validateQuestionForm(formData)`:
```javascript
export function validateQuestionForm(data) {
  const errors = {};
  const title = (data.title || '').trim();

  if (!title) {
    errors.title = 'Title is required.';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (title.length > 120) {
    errors.title = 'Title cannot exceed 120 characters.';
  }

  if (!data.category) errors.category = 'Please select a category.';
  if (!data.difficulty) errors.difficulty = 'Please select a difficulty level.';
  if (!data.status) errors.status = 'Please select a status.';

  if (data.leetcodeUrl && data.leetcodeUrl.trim()) {
    try {
      const parsed = new URL(data.leetcodeUrl.trim());
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        errors.leetcodeUrl = 'URL must start with http:// or https://';
      }
    } catch {
      errors.leetcodeUrl = 'Please enter a valid web URL.';
    }
  }

  return errors;
}
```

#### User Experience Touch Tracking:
To avoid frustrating users with immediate red errors while they are still typing:
1. Every input maintains a `touched` dictionary (e.g. `{ title: false }`).
2. An error message and red border (`border-rose-500`) are only rendered if `touched[fieldName]` is true.
3. When the user clicks **"Add to Tracker"**, all fields are marked as touched simultaneously. If errors exist, the first error is surfaced via a toast alert and submission is halted.

---

### B. Key-Based Modal State Architecture (Solving `react-hooks/set-state-in-effect`)
In React, using `useEffect` to synchronize props into state like this is an anti-pattern that triggers ESLint's `react-hooks/set-state-in-effect`:
```javascript
// ❌ ANTI-PATTERN: Calling setState synchronously in useEffect
useEffect(() => {
  if (initialData) {
    setFormData(initialData); // Causes an extra render pass!
  }
}, [initialData]);
```

**The Solution:**
We extracted the inner form into `QuestionFormContent` and use React's built-in `key` prop:
```javascript
// ✅ RECOMMENDED PATTERN: Key-based state reset
<Modal isOpen={isOpen} onClose={onClose}>
  {isOpen && (
    <QuestionFormContent
      key={initialData?.id || initialData?.category || 'new'}
      initialData={initialData}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )}
</Modal>
```
When `key` changes (e.g. editing question A vs editing question B vs adding a new question), React automatically unmounts the old instance and mounts a fresh instance with the exact initial state. Zero `useEffect` needed, zero cascading renders, and zero ESLint warnings!

---

### C. Derived Search & Filter Pipeline
In `src/hooks/useFilters.js`, the search and filter pipeline processes questions in a single functional pipeline:
1. **Search**: Case-insensitive substring match across both `title` and `notes`.
2. **Category**: Filters by `DSA`, `Git & GitHub`, `Full-Stack Technical`, or `Machine Coding`.
3. **Status**: Filters by `Pending`, `In Progress`, or `Completed`.
4. **Difficulty**: Filters by `Easy`, `Medium`, or `Hard`.
5. **Sort**: Orders by `newest`, `oldest`, `az` (A–Z), or `za` (Z–A).

Because this is wrapped in `useMemo([questions, filters])`, re-filtering only executes when either the underlying question array or filter criteria change.

---

### D. LocalStorage Synchronization
In `src/hooks/useLocalStorage.js`:
- **Lazy Initialization**: `useState(() => { ... })` reads from `window.localStorage` only once during initial mount, avoiding expensive `JSON.parse` operations on every re-render.
- **Fail-Safe Fallback**: If localStorage is disabled (e.g. private browsing restrictions or malformed JSON), it catches the error and cleanly falls back to the curated `SEED_QUESTIONS`.

---

### E. Data Visualization (Chart.js)
In `src/components/dashboard/AnalyticsCharts.jsx`:
- **Status Distribution**: Doughnut chart with clean colors (`#10b981` Completed, `#f59e0b` In Progress, `#71717a` Pending).
- **Completion by Track**: Dual-bar chart comparing completed items vs total items for each domain.
- **Dark Theme Styling**: Chart axes, tooltips, and legends are styled to match the dark aesthetic (`#18181b` tooltips, `#a1a1aa` axis labels).

---

## 7. How to Explain This Project in an Interview

When presenting this project to an interviewer or recording your 1–2 minute demo video, follow this structured explanation:

### Step 1: The Elevator Pitch (15 seconds)
> *"PrepTrack is a responsive dashboard for students preparing for technical interviews. It allows you to track Data Structures & Algorithms, Git workflows, technical topics, and timed Machine Coding challenges with real-time analytics and LocalStorage persistence."*

### Step 2: Architecture & Clean Code (30 seconds)
> *"For the frontend architecture, I used React 19 with Tailwind CSS v4. I avoided monolithic components by breaking the UI into single-responsibility sub-components—such as isolated filter chips, expandable note cards, and custom modal selectors. All business logic and localStorage persistence are encapsulated in custom hooks like `useQuestions` and `useFilters`, keeping the UI components completely declarative."*

### Step 3: Key Features & UX Polish (30 seconds)
> *"Key highlights include:
> 1. Multi-dimensional search and filtering with a global `/` keyboard shortcut.
> 2. One-click status cycling directly from each card.
> 3. Real-time form validation with touch tracking so errors don't appear prematurely.
> 4. Interactive data visualization using Chart.js to track completion rates by domain.
> 5. Full backup capabilities with JSON export and import."*

### Step 4: Technical Challenge You Solved (15 seconds)
> *"One technical optimization was handling modal state resets cleanly. Instead of using `useEffect` to synchronize form state—which causes cascading renders and violates modern React rules—I used a key-based component lifecycle that resets form state automatically when switching questions."*
