import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { PieChart, BarChart3 } from 'lucide-react';
import useTheme from '../../hooks/useTheme';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

/**
 * AnalyticsCharts Component
 * Visualizes status distribution and category completion using Chart.js.
 */
export function AnalyticsCharts({ stats }) {
  const { isDark } = useTheme();
  const { total, completed, inProgress, pending, dsa, git, technical, machine } = stats;

  const textColor = isDark ? '#a1a1aa' : '#475569';
  const subTextColor = isDark ? '#71717a' : '#64748b';
  const gridColor = isDark ? '#27272a' : '#f1f5f9';
  const borderColor = isDark ? '#18181b' : '#ffffff';
  const emptySliceBg = isDark ? '#27272a' : '#e2e8f0';
  const barTotalBg = isDark ? '#27272a' : '#e2e8f0';

  // Doughnut Chart Data (Status)
  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: total === 0 ? [1, 0, 0] : [completed, inProgress, pending],
        backgroundColor:
          total === 0
            ? [emptySliceBg, emptySliceBg, emptySliceBg]
            : ['#10b981', '#f59e0b', isDark ? '#71717a' : '#94a3b8'],
        borderColor: borderColor,
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          boxWidth: 12,
          padding: 12,
          font: { size: 11, family: 'Inter, sans-serif' },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#18181b' : '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: isDark ? '#27272a' : '#334155',
        borderWidth: 1,
      },
    },
    cutout: '70%',
  };

  // Bar Chart Data (Category Completed vs Total)
  const barData = {
    labels: ['DSA', 'Git', 'Technical', 'Machine'],
    datasets: [
      {
        label: 'Completed',
        data: [dsa.completed, git.completed, technical.completed, machine.completed],
        backgroundColor: '#f97316',
        borderRadius: 6,
      },
      {
        label: 'Total',
        data: [dsa.total, git.total, technical.total, machine.total],
        backgroundColor: barTotalBg,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: textColor,
          boxWidth: 10,
          font: { size: 10, family: 'Inter, sans-serif' },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#18181b' : '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#e2e8f0',
        borderColor: isDark ? '#27272a' : '#334155',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { size: 11 } },
      },
      y: {
        grid: { color: gridColor },
        ticks: { color: subTextColor, stepSize: 1, font: { size: 10 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Doughnut Chart */}
      <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Status Distribution</h4>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
            {total} total items
          </span>
        </div>
        <div className="h-44 relative">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-500" />
            <h4 className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Completion by Track</h4>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
            Completed vs Total
          </span>
        </div>
        <div className="h-44 relative">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;
