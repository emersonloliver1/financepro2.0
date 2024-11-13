import { BalanceCard } from '@/components/Dashboard/BalanceCard';
import { BudgetManager } from '@/components/Dashboard/BudgetManager';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <BalanceCard
        balance={0}
        income={0}
        expenses={0}
      />
      <div className="grid grid-cols-1 gap-8">
        <BudgetManager />
      </div>
    </div>
  );
};

export default Dashboard;