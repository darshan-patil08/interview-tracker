# PrepTrack — Interview Practice & Machine Coding Tracker 🚀

A modern, responsive web application for engineering students to track and organize their weekly interview preparation: Data Structures & Algorithms (DSA), Git workflows, Full-Stack Technical interview questions, and Machine Coding round challenges.

Built with **React 19**, **Tailwind CSS v4**, and **Chart.js** with full **LocalStorage** synchronization.

---

## 📱 Mobile Access (Same Wi-Fi Network)

To view and test this app on your phone while connected to the same Wi-Fi:

1. Ensure your laptop dev server is running (it is configured with `--host` enabled).
2. Open any web browser on your phone (Chrome, Safari, Firefox).
3. Type the following URL into your phone's browser address bar:
   ```text
   http://192.168.31.182:5173
   ```
> **Tip:** If the page does not load, verify that your Wi-Fi network profile is set to "Private" in Windows Settings, or allow inbound traffic for Node.js / Port 5173 through Windows Defender Firewall.

---

## ✨ Features & Architecture

### 1. Dashboard Overview
- **Total Questions KPI**: Real-time counter of total tracked problems with breakdown by status (*Pending*, *In Progress*, *Completed*).
- **Completed DSA Problems**: Dedicated tracker for algorithms practice with progress bar and completion rate.
- **Completed Technical & Git Questions**: Combined mastery indicator for version control and full-stack technical knowledge.
- **Machine Coding Status**: Spotlight section for live machine coding round readiness.
- **Visual Completion Percentage**: Dynamic milestone progress indicator (*Kickoff Stage*, *In The Zone*, *Strong Momentum*, *Interview Ready*).
- **Category Progress Bars**: Granular progress bars for DSA, Git, Technical, and Machine Coding tracks.
- **Interactive Analytics Charts (Chart.js)**:
  - **Doughnut Chart**: Status breakdown (Completed vs In Progress vs Pending).
  - **Bar Chart**: Track completion comparison (Completed vs Total per track).

### 2. Question Tracker & Data Management
- **Add & Edit Questions**: Modal dialog with form validation:
  - **Title**: Required (3–120 characters) with real-time feedback.
  - **Category**: Visual selector for *DSA*, *Git & GitHub*, *Full-Stack Technical*, and *Machine Coding*.
  - **Difficulty**: Segmented pill selectors for *Easy*, *Medium*, and *Hard*.
  - **Status**: Segmented pill selectors for *Pending*, *In Progress*, and *Completed*.
  - **Reference / LeetCode URL**: Validated URL format.
  - **Notes & Key Takeaways**: Multi-line notes with live character counter (up to 1,000 characters) and expandable cards.
- **One-Click Status Cycling**: Click the status badge directly on any card to cycle between `Pending → In Progress → Completed` with instant auto-timestamping.
- **Delete Confirmation**: Modal dialog prevents accidental data deletion.

### 3. Search & Multi-Dimensional Filters
- **Live Search**: Instant case-insensitive filtering across both question titles and notes. Press `/` anywhere to focus search.
- **Category Filter Chips**: Quick pills with live question count badges.
- **Status Filter**: Dropdown to filter by Pending, In Progress, or Completed.
- **Difficulty Filter**: Dropdown to filter by Easy, Medium, or Hard.
- **Sorting Options**: Sort by *Newest First*, *Oldest First*, *Alphabetical (A–Z)*, or *Z–A*.
- **Active Filter Indicators**: Displays matching item count and a "Clear Filters" button when filters are active.

### 4. Robust Edge States
- **Empty State**: Friendly invitation with a "Load Sample Practice Set" button when tracker has 0 items.
- **No Search Results**: Clear feedback and quick reset button when query/filter combination yields 0 items.
- **Validation Feedback**: Inline error messages, red input borders, touch tracking, and toast notifications via `react-hot-toast`.

### 5. Persistence & Backups
- **LocalStorage Sync**: Automatic persistence without page refresh data loss (`interview_tracker_v1`).
- **Export Data**: Download your entire problem set as a `.json` backup file.
- **Import Data**: Restore or load custom question banks from `.json`.
- **Reset Sample Data**: Restore the curated default set anytime.

---

## 🧱 Component Breakdown (Modular Design)

The codebase follows modular, single-responsibility architecture styled purely with **Tailwind CSS utility classes**:

```text
src/
├── components/
│   ├── ui/
│   │   ├── Badge.jsx             # Category, difficulty, and status badges
│   │   ├── Button.jsx            # Multi-variant button (primary, secondary, danger, ghost)
│   │   ├── Input.jsx             # Accessible input with inline error feedback
│   │   ├── Textarea.jsx          # Textarea with character counter
│   │   ├── Modal.jsx             # Accessible backdrop-blur modal dialog
│   │   ├── ProgressBar.jsx       # Animated gradient progress bar
│   │   └── ConfirmDialog.jsx     # Destructive action confirmation modal
│   │
│   ├── dashboard/
│   │   ├── MetricCard.jsx        # Individual KPI tile with glowing accents
│   │   ├── StatsOverview.jsx     # 4-card KPI responsive grid
│   │   ├── OverallProgress.jsx   # Milestone completion card
│   │   ├── CategoryBreakdown.jsx # Track-by-track progress bars
│   │   ├── AnalyticsCharts.jsx   # Doughnut & Bar charts with Chart.js
│   │   ├── MachineCodingBanner.jsx# Spotlight banner for machine coding rounds
│   │   └── Dashboard.jsx         # Dashboard coordinator
│   │
│   ├── tracker/
│   │   ├── FilterBar/
│   │   │   ├── SearchInput.jsx   # Search input with shortcut listener
│   │   │   ├── CategoryChips.jsx # Filter chip pills with count badges
│   │   │   ├── SortSelect.jsx    # Sort dropdown selector
│   │   │   └── FilterBar.jsx     # Filter bar coordinator
│   │   │
│   │   ├── QuestionForm/
│   │   │   ├── CategorySelector.jsx   # Interactive category cards
│   │   │   ├── DifficultySelector.jsx # Segmented difficulty buttons
│   │   │   ├── StatusSelector.jsx     # Segmented status buttons
│   │   │   └── QuestionFormModal.jsx  # Complete modal with validation
│   │   │
│   │   └── QuestionList/
│   │       ├── QuestionStatusToggle.jsx# In-place status cycler
│   │       ├── QuestionActions.jsx     # Card edit/delete/link buttons
│   │       ├── QuestionNotes.jsx       # Expandable notes toggle
│   │       ├── QuestionCard.jsx        # Card layout coordinator
│   │       ├── EmptyState.jsx          # 0-item empty illustration
│   │       ├── NoSearchResults.jsx     # 0-result search illustration
│   │       └── QuestionList.jsx        # Grid coordinator
│   │
│   └── layout/
│       ├── Navbar.jsx            # Header with branding and export/import menu
│       └── Footer.jsx            # Footer with shortcut keys and attribution
│
├── constants/
│   └── index.js                  # Categories, difficulty, status, and seed data
├── hooks/
│   ├── useLocalStorage.js        # Synced localStorage hook
│   ├── useQuestions.js           # CRUD operations and memoized stats
│   └── useFilters.js             # Filter and sort derived state
└── utils/
    └── helpers.js                # Tailwind styling maps, validators, date helpers
```

---

## 🛠️ Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation
1. Clone the repository or navigate to the project directory:
   ```bash
   cd interview-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 💡 Assumptions & Design Choices

1. **Seed Data**: Pre-loaded with 11 realistic questions across DSA, Git, Technical, and Machine Coding so the dashboard displays meaningful stats immediately on first load.
2. **Modular State**: Business logic is separated into custom hooks (`useQuestions`, `useFilters`) keeping components clean and focused purely on rendering and user interaction.
3. **Tailwind CSS Pure Utility**: All custom CSS files have been replaced with Tailwind CSS classes, utilizing consistent dark-theme tokens (`#09080e`, `#13111c`, `#28243d`) and vibrant category accents.
4. **Validation UX**: Form errors only appear after a field has been blurred or upon clicking submit, preventing premature error states while the user is typing.
