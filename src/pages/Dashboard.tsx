import { BalanceCard } from '@/components/Dashboard/BalanceCard';
import { BudgetManager } from '@/components/Dashboard/BudgetManager';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <BalanceCard
        balance={10000}
        income={15000}
        expenses={5000}
      />
      <div className="grid grid-cols-1 gap-8">
        <BudgetManager />
      </div>
    </div>
  );
};

export default Dashboard;