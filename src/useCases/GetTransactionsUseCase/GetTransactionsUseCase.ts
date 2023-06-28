import { RequestError } from '../../domains/request';
import { GetTransactionsParams, TransactionResponse } from '../../domains/transaction';
import { TransactionService } from '../../services/TransactionService/TransactionService';
import {
  loadTransaction,
  loadTransactionDone,
  loadTransactionFail,
} from '../../stores/TransactionStore/TransactionEvents';

const execute = async ({ search, pageNumber }: GetTransactionsParams): Promise<void> => {
  loadTransaction();

  return TransactionService.getTransactions({ search, pageNumber })
    .then((response: TransactionResponse) => {
      const { transactions, totalPages, totalIncomes, totalOutcomes, totalBalance } = response;
      loadTransactionDone({ transactions, totalPages, totalIncomes, totalOutcomes, totalBalance });
    })
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
    });
};

const GetTransactionsUseCase = {
  execute,
};

export default GetTransactionsUseCase;
