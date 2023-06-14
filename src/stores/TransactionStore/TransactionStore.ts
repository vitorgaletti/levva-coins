import { createStore } from 'effector';
import {
  loadCreateTransactionDone,
  loadDeleteTransactionDone,
  loadTotalPageTransactionDone,
  loadTransaction,
  loadTransactionDone,
  loadTransactionFail,
} from './TransactionEvents';
import { TransactionState } from './TransactionState';

const initialState: TransactionState = {
  isLoading: false,
  transactions: [],
  hasError: false,
  errorMessage: '',
  totalPages: 0,
};

const TransactionStore = createStore<TransactionState>(initialState)
  .on(loadTransaction, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: '',
    totalPages: 0,
  }))
  .on(loadCreateTransactionDone, (state, data) => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    transactions: [data, ...state.transactions],
    totalPages: 0,
  }))
  .on(loadTransactionDone, (_, data) => ({
    isLoading: false,
    transactions: data,
    hasError: false,
    errorMessage: '',
    totalPages: 0,
  }))
  .on(loadTotalPageTransactionDone, (state, number) => ({
    ...state,
    totalPages: number,
  }))
  .on(loadDeleteTransactionDone, (state, transactionId) => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    transactions: [...state.transactions.filter(transaction => transaction.id !== transactionId)],
  }))
  .on(loadTransactionFail, (state, data) => ({
    ...state,
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
  }));

export default TransactionStore;
