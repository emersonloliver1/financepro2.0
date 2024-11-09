import { useState } from 'react';
import { Transaction } from '@/types/transactions';
import { ArrowUpCircle, ArrowDownCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DatePicker } from "@/components/ui/date-picker";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    if (startDate && endDate) {
      return transactionDate >= startDate && transactionDate <= endDate;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-lg font-semibold mb-4 md:mb-0">Transações Recentes</h3>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <DatePicker
              selected={startDate}
              onSelect={setStartDate}
              placeholder="Data inicial"
            />
          </div>
          <div>
            <DatePicker
              selected={endDate}
              onSelect={setEndDate}
              placeholder="Data final"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
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
                {format(new Date(transaction.date), "dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};