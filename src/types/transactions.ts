export type TransactionType = 'income' | 'expense';
export type RecurrenceType = 'one-time' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  recurrence?: RecurrenceType;
  tags?: string[];
  attachments?: string[];
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface MonthlyBudget {
  category: string;
  limit: number;
  spent: number;
}