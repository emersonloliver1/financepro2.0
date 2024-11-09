import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export const BalanceCard = ({ balance, income, expenses }: BalanceCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="card-gradient rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Saldo Total</h3>
          <DollarSign className="h-6 w-6" />
        </div>
        <p className="text-3xl font-bold">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Receitas</h3>
          <ArrowUpCircle className="h-6 w-6 text-success" />
        </div>
        <p className="text-2xl font-bold text-success">
          R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Despesas</h3>
          <ArrowDownCircle className="h-6 w-6 text-danger" />
        </div>
        <p className="text-2xl font-bold text-danger">
          R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};