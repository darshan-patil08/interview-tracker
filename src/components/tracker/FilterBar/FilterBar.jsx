import SearchInput from './SearchInput';
import CategoryChips from './CategoryChips';
import SortSelect from './SortSelect';
import { DIFFICULTY_LIST, STATUS_LIST } from '../../../constants';
import { RotateCcw } from 'lucide-react';

/**
 * FilterBar Component
 * Complete filter controls with responsive layout and light/dark mode support.
 */
export function FilterBar({
  filters,
  updateFilter,
  resetFilters,
  hasActiveFilters,
  totalCount,
  filteredCount,
  categoryCounts,
}) {
  return (
    <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm hover:shadow transition-shadow">
      {/* Top Row: Search Input + Status Filter + Difficulty Filter + Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <SearchInput
          value={filters.search}
          onChange={(val) => updateFilter('search', val)}
        />

        {/* Status Dropdown */}
        <div className="relative inline-flex items-center">
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            aria-label="Filter by status"
            className="w-full sm:w-auto bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-300 rounded-xl border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-3 py-2.5 sm:py-2 appearance-none cursor-pointer outline-none transition-all pr-8 shadow-sm"
          >
            <option value="All" className="bg-white text-slate-800 dark:bg-zinc-900 dark:text-zinc-200">
              All Statuses
            </option>
            {STATUS_LIST.map((stat) => (
              <option key={stat} value={stat} className="bg-white text-slate-800 dark:bg-zinc-900 dark:text-zinc-200">
                {stat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500 text-[10px]">
            ▼
          </div>
        </div>

        {/* Difficulty Dropdown */}
        <div className="relative inline-flex items-center">
          <select
            value={filters.difficulty}
            onChange={(e) => updateFilter('difficulty', e.target.value)}
            aria-label="Filter by difficulty"
            className="w-full sm:w-auto bg-white dark:bg-zinc-900 text-xs font-semibold text-slate-700 dark:text-zinc-300 rounded-xl border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 px-3 py-2.5 sm:py-2 appearance-none cursor-pointer outline-none transition-all pr-8 shadow-sm"
          >
            <option value="All" className="bg-white text-slate-800 dark:bg-zinc-900 dark:text-zinc-200">
              All Difficulties
            </option>
            {DIFFICULTY_LIST.map((diff) => (
              <option key={diff} value={diff} className="bg-white text-slate-800 dark:bg-zinc-900 dark:text-zinc-200">
                {diff}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500 text-[10px]">
            ▼
          </div>
        </div>

        {/* Sort Select */}
        <SortSelect
          value={filters.sortBy}
          onChange={(val) => updateFilter('sortBy', val)}
        />
      </div>

      {/* Bottom Row: Category Chips + Results Summary & Clear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-zinc-800/60">
        <CategoryChips
          activeCategory={filters.category}
          onChange={(val) => updateFilter('category', val)}
          counts={categoryCounts}
        />

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-slate-900 dark:text-zinc-100 font-bold">{filteredCount}</span>
            <span>of</span>
            <span className="text-slate-900 dark:text-zinc-100 font-bold">{totalCount}</span>
            <span>questions</span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
