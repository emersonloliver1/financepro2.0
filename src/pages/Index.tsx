import { useState } from 'react';
import { Header } from '@/components/Dashboard/Header';
import { BalanceCard } from '@/components/Dashboard/BalanceCard';
import { TransactionForm } from '@/components/Dashboard/TransactionForm';
import { TransactionList } from '@/components/Dashboard/TransactionList';
import { CategoryChart } from '@/components/Dashboard/CategoryChart';
import { Transaction, TransactionType } from '@/types/transactions';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const calculateBalance = () => {
    return transactions.reduce((acc, curr) => {
      return curr.type === 'income' 
        ? acc + curr.amount 
        : acc - curr.amount;
    }, 0);
  };

  const calculateTotalByType = (type: TransactionType) => {
    return transactions
      .filter(t => t.type === type)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const calculateCategoryTotals = () => {
    const categoryTotals = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => {
        const existing = acc.find(c => c.category === curr.category);
        if (existing) {
          existing.total += curr.amount;
        } else {
          acc.push({ category: curr.category, total: curr.amount });
        }
        return acc;
      }, [] as { category: string; total: number }[]);

    return categoryTotals;
  };

  const handleNewTransaction = (data: {
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <BalanceCard
          balance={calculateBalance()}
          income={calculateTotalByType('income')}
          expenses={calculateTotalByType('expense')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TransactionForm onSubmit={handleNewTransaction} />
            <CategoryChart data={calculateCategoryTotals()} />
          </div>
          
          <TransactionList transactions={transactions} />
        </div>
      </main>
    </div>
  );
};

export default Index;