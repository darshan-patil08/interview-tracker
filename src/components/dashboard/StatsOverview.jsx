import MetricCard from './MetricCard';
import { Layers, Code2, MessagesSquare, Laptop } from 'lucide-react';

/**
 * StatsOverview Component
 * 4-column responsive grid displaying key interview preparation KPIs.
 */
export function StatsOverview({ stats }) {
  // Aggregate DSA
  const dsaTotal = stats.dsa.total;
  const dsaDone = stats.dsa.completed;
  const dsaRate = dsaTotal > 0 ? Math.round((dsaDone / dsaTotal) * 100) : 0;

  // Aggregate Interview (Git + Technical)
  const interviewTotal = stats.git.total + stats.technical.total;
  const interviewDone = stats.git.completed + stats.technical.completed;
  const interviewRate = interviewTotal > 0 ? Math.round((interviewDone / interviewTotal) * 100) : 0;

  // Machine Coding
  const machineTotal = stats.machine.total;
  const machineDone = stats.machine.completed;
  const machineRate = machineTotal > 0 ? Math.round((machineDone / machineTotal) * 100) : 0;
  const machineStatusText =
    machineDone === machineTotal && machineTotal > 0
      ? 'All Rounds Cleared'
      : machineDone > 0
      ? `${machineDone} of ${machineTotal} Completed`
      : machineTotal > 0
      ? 'Pending Implementation'
      : 'No Challenges Yet';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Questions */}
      <MetricCard
        title="Total Questions"
        value={stats.total}
        icon={Layers}
        colorScheme="orange"
        badge={`${stats.completionRate}% Done`}
        progress={stats.completionRate}
        subtext={`${stats.completed} done · ${stats.inProgress} in progress · ${stats.pending} pending`}
      />

      {/* 2. Completed DSA Problems */}
      <MetricCard
        title="Completed DSA"
        value={dsaDone}
        icon={Code2}
        colorScheme="purple"
        badge={dsaTotal > 0 ? `${dsaDone}/${dsaTotal}` : '0'}
        progress={dsaRate}
        subtext={`${dsaRate}% DSA completion rate`}
      />

      {/* 3. Completed Interview Questions (Git + Technical) */}
      <MetricCard
        title="Technical & Git"
        value={interviewDone}
        icon={MessagesSquare}
        colorScheme="blue"
        badge={interviewTotal > 0 ? `${interviewDone}/${interviewTotal}` : '0'}
        progress={interviewRate}
        subtext={`${interviewDone} of ${interviewTotal} questions mastered`}
      />

      {/* 4. Machine-Coding Status */}
      <MetricCard
        title="Machine Coding Status"
        value={machineDone > 0 ? `${machineDone} Cleared` : machineTotal > 0 ? 'In Progress' : '0 Cleared'}
        icon={Laptop}
        colorScheme="pink"
        badge={machineTotal > 0 ? `${machineRate}%` : 'Idle'}
        progress={machineRate}
        subtext={machineStatusText}
      />
    </div>
  );
}

export default StatsOverview;
