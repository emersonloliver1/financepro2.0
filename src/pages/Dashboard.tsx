import { BalanceCard } from '@/components/Dashboard/BalanceCard';
import { BudgetManager } from '@/components/Dashboard/BudgetManager';
import { Header } from '@/components/Dashboard/Header';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <BalanceCard
          balance={10000}
          income={15000}
          expenses={5000}
        />
        <div className="grid grid-cols-1 gap-8">
          <BudgetManager />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;