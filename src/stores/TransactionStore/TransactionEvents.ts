import { createEvent } from 'effector';
import { RequestError } from '../../domains/request';
import { TransactionResponse, TransactionValues } from '../../domains/transaction';

export const loadTransaction = createEvent('loadTransaction');
export const loadCreateTransactionDone = createEvent<TransactionValues>(
  'loadCreateTransactionDone',
);
export const loadTransactionDone = createEvent<TransactionResponse>('loadTransactionDone');

export const loadDeleteTransactionDone = createEvent<Pick<TransactionValues, 'id'>>(
  'loadCreateTransactionDone',
);
export const loadTransactionFail = createEvent<RequestError>('loadTransactionFail');
