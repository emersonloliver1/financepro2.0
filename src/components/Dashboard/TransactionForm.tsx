import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TransactionType, RecurrenceType } from '@/types/transactions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EXPENSE_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Outros'
];

const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Outros'
];

const RECURRENCE_OPTIONS: RecurrenceType[] = ['one-time', 'monthly', 'yearly'];

const formSchema = z.object({
  type: z.enum(['expense', 'income']),
  amount: z.number().positive('O valor deve ser maior que zero'),
  description: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres'),
  category: z.string().min(1, 'Selecione uma categoria'),
  recurrence: z.enum(['one-time', 'monthly', 'yearly']).optional(),
  tags: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSubmit: (transaction: FormData) => void;
}

export const TransactionForm = ({ onSubmit }: TransactionFormProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'expense',
      amount: 0,
      description: '',
      category: '',
      recurrence: 'one-time',
      tags: [],
    },
  });

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      form.setValue('tags', [...tags, newTag]);
      setNewTag('');
    }
  };

  const handleSubmit = (values: FormData) => {
    onSubmit({ ...values, tags });
    form.reset();
    setTags([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="bg-white/80 backdrop-blur-md rounded-lg p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Nova Transação</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setType(value as TransactionType);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/80 backdrop-blur-md border border-gray-200">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-md border border-gray-200">
                    <SelectItem value="expense">Despesa</SelectItem>
                    <SelectItem value="income">Receita</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0,00"
                    className="bg-white/80 backdrop-blur-md border border-gray-200"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Digite a descrição" 
                    className="bg-white/80 backdrop-blur-md border border-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/80 backdrop-blur-md border border-gray-200">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-md border border-gray-200">
                    {type === 'expense' 
                      ? EXPENSE_CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))
                      : INCOME_CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="recurrence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recorrência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/80 backdrop-blur-md border border-gray-200">
                      <SelectValue placeholder="Selecione a recorrência" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white/80 backdrop-blur-md border border-gray-200">
                    <SelectItem value="one-time">Única vez</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="yearly">Anual</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Tags</FormLabel>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adicionar tag"
                className="flex-1 bg-white/80 backdrop-blur-md border border-gray-200"
              />
              <Button type="button" onClick={handleAddTag} variant="outline" className="bg-white/80 backdrop-blur-md">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Transação
        </Button>
      </form>
    </Form>
  );
};