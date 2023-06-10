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
