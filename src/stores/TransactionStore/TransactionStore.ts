import { createStore } from 'effector';
import {
  loadCreateTransactionDone,
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
    transactions: data,
    hasError: false,
    errorMessage: '',
  }))
  .on(loadTransactionFail, (state, data) => ({
    ...state,
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
  }));

export default TransactionStore;
