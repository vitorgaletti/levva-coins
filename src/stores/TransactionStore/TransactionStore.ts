import { createStore } from 'effector';
import {
  loadCreateTransactionDone,
  loadDeleteTransactionDone,
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
  totalPages: 1,
  totalIncomes: 0,
  totalOutcomes: 0,
  totalBalance: 0,
};

const TransactionStore = createStore<TransactionState>(initialState)
  .on(loadTransaction, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: '',
  }))
  .on(loadCreateTransactionDone, (state, data) => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    transactions: [data, ...state.transactions],
  }))
  .on(loadTransactionDone, (_, data) => ({
    isLoading: false,
    transactions: data.transactions,
    hasError: false,
    errorMessage: '',
    totalPages: data.totalPages,
    totalIncomes: data.totalIncomes,
    totalOutcomes: data.totalOutcomes,
    totalBalance: data.totalBalance,
  }))
  .on(loadDeleteTransactionDone, (state, transactionId) => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    transactions: state.transactions.filter(transaction => transaction.id !== transactionId.id),
  }))
  .on(loadTransactionFail, (state, data) => ({
    ...state,
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
  }));

export default TransactionStore;
