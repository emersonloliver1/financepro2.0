import { Transaction } from '@/types/transactions';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Transações Recentes</h3>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              {transaction.type === 'income' ? (
                <ArrowUpCircle className="h-6 w-6 text-success mr-3" />
              ) : (
                <ArrowDownCircle className="h-6 w-6 text-danger mr-3" />
              )}
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-success' : 'text-danger'
              }`}>
                R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};