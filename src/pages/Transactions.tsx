import { TransactionForm } from '@/components/Dashboard/TransactionForm';
import { TransactionList } from '@/components/Dashboard/TransactionList';
import { useState } from 'react';
import { Transaction, TransactionType } from '@/types/transactions';
import { useToast } from '@/components/ui/use-toast';

const Transactions = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleNewTransaction = (data: {
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
    recurrence?: 'one-time' | 'monthly' | 'yearly';
    tags?: string[];
  }) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      ...data,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: "Transação adicionada",
      description: `${data.type === 'income' ? 'Receita' : 'Despesa'} de R$ ${data.amount} adicionada com sucesso.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <TransactionForm onSubmit={handleNewTransaction} />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default Transactions;