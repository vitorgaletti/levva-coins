import { CategoryValues } from '../category';

export interface NewTransactionParams {
  description: string;
  amount: number;
  type: number;
  categoryId: string;
  userEmail: string;
}

export interface TransactionValues {
  id: string;
  description: string;
  amount: number;
  type: number;
  category: CategoryValues;
  createdAt: string;
}

export interface GetTransactionsParams {
  search?: string;
  pageNumber: number;
}

export interface RemoveTransactionsParams {
  id: string;
}

export interface TransactionResponse {
  transactions: TransactionValues[];
  totalPages: number;
  totalIncomes: number;
  totalOutcomes: number;
  totalBalance: number;
}
