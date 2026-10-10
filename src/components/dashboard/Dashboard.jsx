import StatsOverview from './StatsOverview';
import OverallProgress from './OverallProgress';
import CategoryBreakdown from './CategoryBreakdown';
import AnalyticsCharts from './AnalyticsCharts';
import MachineCodingBanner from './MachineCodingBanner';

/**
 * Dashboard Component
 * Clean master view dividing all statistical insights into focused child components.
 */
export function Dashboard({ stats, onAddMachineTask }) {
  return (
    <div className="space-y-5 animate-fade-up">
      {/* 1. Top 4 KPI metric cards */}
      <StatsOverview stats={stats} />

      {/* 2. Visual Progress + Category Breakdown (side by side on larger screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OverallProgress stats={stats} />
        <CategoryBreakdown stats={stats} />
      </div>

      {/* 3. Interactive Charts (Doughnut + Bar) */}
      <AnalyticsCharts stats={stats} />

      {/* 4. Machine Coding Round Spotlight */}
      <MachineCodingBanner
        machineStats={stats.machine}
        onAddMachineTask={onAddMachineTask}
      />
    </div>
  );
}

export default Dashboard;
