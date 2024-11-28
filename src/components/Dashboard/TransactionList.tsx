import { useState } from 'react';
import { Transaction } from '@/types/transactions';
import { ArrowUpCircle, ArrowDownCircle, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const matchesDate = (!startDate || transactionDate >= startDate) && 
                       (!endDate || transactionDate <= endDate);
    
    const matchesSearch = transaction.description.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesDate && matchesSearch;
  });

  return (
    <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 md:mb-0">Transações Recentes</h3>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar transação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <DatePicker
              selected={startDate}
              onSelect={setStartDate}
              placeholder="Data inicial"
            />
            <DatePicker
              selected={endDate}
              onSelect={setEndDate}
              placeholder="Data final"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma transação encontrada
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center">
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="h-6 w-6 text-success mr-3" />
                ) : (
                  <ArrowDownCircle className="h-6 w-6 text-danger mr-3" />
                )}
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-success' : 'text-danger'
                }`}>
                  R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};