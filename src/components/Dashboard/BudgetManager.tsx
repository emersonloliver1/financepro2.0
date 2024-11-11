import { useState } from 'react';
import { MonthlyBudget } from '@/types/transactions';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export const BudgetManager = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<MonthlyBudget[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const handleAddBudget = () => {
    if (!newCategory || !newLimit) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const budget: MonthlyBudget = {
      category: newCategory,
      limit: Number(newLimit),
      spent: 0,
    };

    setBudgets([...budgets, budget]);
    setNewCategory('');
    setNewLimit('');

    toast({
      title: "Orçamento adicionado",
      description: `Orçamento de R$ ${newLimit} para ${newCategory} adicionado com sucesso.`,
    });
  };

  return (
    <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Gerenciamento de Orçamento</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Categoria"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="bg-background text-foreground"
        />
        <Input
          type="number"
          placeholder="Limite (R$)"
          value={newLimit}
          onChange={(e) => setNewLimit(e.target.value)}
          className="bg-background text-foreground"
        />
        <Button onClick={handleAddBudget} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget, index) => (
          <div key={index} className="p-4 border rounded-lg bg-muted">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-foreground">{budget.category}</span>
              <span className="text-sm text-muted-foreground">
                R$ {budget.spent.toFixed(2)} / R$ {budget.limit.toFixed(2)}
              </span>
            </div>
            <Progress value={(budget.spent / budget.limit) * 100} />
            {budget.spent > budget.limit && (
              <div className="flex items-center mt-2 text-sm text-destructive">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Limite excedido
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};