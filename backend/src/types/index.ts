export interface ParsedExpense {
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
}

export interface Expense extends ParsedExpense {
  id: number;
  original_input: string;
  created_at: string;
}

export interface ExpenseInput {
  amount: number;
  currency: string;
  category: string;
  description: string;
  merchant: string | null;
  original_input: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  expense?: T;
  expenses?: T[];
  error?: string;
  message?: string;
}
