import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export const BalanceCard = ({ balance, income, expenses }: BalanceCardProps) => {
  const expensePercentage = income > 0 ? (expenses / income) * 100 : 0;
  const savingsPercentage = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="card-gradient rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Saldo Total</h3>
          <DollarSign className="h-6 w-6" />
        </div>
        <p className="text-3xl font-bold mb-2">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center text-sm">
          {balance >= 0 ? (
            <>
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Saldo positivo</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>Saldo negativo</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Receitas</h3>
          <ArrowUpCircle className="h-6 w-6 text-success" />
        </div>
        <p className="text-2xl font-bold text-success mb-2">
          R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Meta de economia</span>
            <span>{savingsPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={savingsPercentage} className="h-2" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Despesas</h3>
          <ArrowDownCircle className="h-6 w-6 text-danger" />
        </div>
        <p className="text-2xl font-bold text-danger mb-2">
          R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Do total de receitas</span>
            <span>{expensePercentage.toFixed(1)}%</span>
          </div>
          <Progress value={expensePercentage} className="h-2" />
        </div>
      </div>
    </div>
  );
};