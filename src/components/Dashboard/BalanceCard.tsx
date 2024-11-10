import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

export const BalanceCard = ({ balance, income, expenses }: BalanceCardProps) => {
  const expensePercentage = income > 0 ? (expenses / income) * 100 : 0;
  const savingsPercentage = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card-gradient rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Saldo Total</h3>
          <DollarSign className="h-6 w-6 opacity-80" />
        </div>
        <p className="text-3xl font-bold mb-3">
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex items-center text-sm bg-white/10 rounded-lg px-3 py-2">
          {balance >= 0 ? (
            <>
              <TrendingUp className="h-4 w-4 mr-2" />
              <span>Saldo positivo</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 mr-2" />
              <span>Saldo negativo</span>
            </>
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Receitas</h3>
          <ArrowUpCircle className="h-6 w-6 text-success" />
        </div>
        <p className="text-2xl font-bold text-success mb-3">
          R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Meta de economia</span>
            <span className="font-medium">{savingsPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={savingsPercentage} className="h-2.5" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Despesas</h3>
          <ArrowDownCircle className="h-6 w-6 text-danger" />
        </div>
        <p className="text-2xl font-bold text-danger mb-3">
          R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Do total de receitas</span>
            <span className="font-medium">{expensePercentage.toFixed(1)}%</span>
          </div>
          <Progress value={expensePercentage} className="h-2.5" />
        </div>
      </motion.div>
    </div>
  );
};