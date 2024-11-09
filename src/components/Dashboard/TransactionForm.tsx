import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionType } from '@/types/transactions';

interface TransactionFormProps {
  onSubmit: (transaction: {
    type: TransactionType;
    amount: number;
    description: string;
    category: string;
  }) => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      amount: Number(amount),
      description,
      category,
    });
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm mb-8">
      <h3 className="text-lg font-semibold mb-4">Nova Transação</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="expense">Despesa</option>
            <option value="income">Receita</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="0,00"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Digite a descrição"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Digite a categoria"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-md transition-colors flex items-center justify-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Adicionar Transação
      </button>
    </form>
  );
};