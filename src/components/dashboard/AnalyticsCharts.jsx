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
  const { total, completed, inProgress, pending, dsa, git, technical, machine } = stats;

  // Doughnut Chart Data (Status)
  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: total === 0 ? [1, 0, 0] : [completed, inProgress, pending],
        backgroundColor:
          total === 0
            ? ['#27272a', '#27272a', '#27272a']
            : ['#10b981', '#f59e0b', '#71717a'],
        borderColor: '#13111c',
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
          color: '#a1a1aa',
          boxWidth: 12,
          padding: 12,
          font: { size: 11, family: 'Inter, sans-serif' },
        },
      },
      tooltip: {
        backgroundColor: '#18181b',
        titleColor: '#f4f4f5',
        bodyColor: '#e4e4e7',
        borderColor: '#27272a',
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
        backgroundColor: '#27272a',
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
          color: '#a1a1aa',
          boxWidth: 10,
          font: { size: 10, family: 'Inter, sans-serif' },
        },
      },
      tooltip: {
        backgroundColor: '#18181b',
        titleColor: '#f4f4f5',
        bodyColor: '#e4e4e7',
        borderColor: '#27272a',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#a1a1aa', font: { size: 11 } },
      },
      y: {
        grid: { color: '#27272a' },
        ticks: { color: '#71717a', stepSize: 1, font: { size: 10 } },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Doughnut Chart */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-semibold text-zinc-200">Status Distribution</h4>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            {total} total items
          </span>
        </div>
        <div className="h-44 relative">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-400" />
            <h4 className="text-xs font-semibold text-zinc-200">Completion by Track</h4>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
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
