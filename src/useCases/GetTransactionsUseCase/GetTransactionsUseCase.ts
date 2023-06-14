import { RequestError } from '../../domains/request';
import { TransactionValues } from '../../domains/transaction';
import { TransactionService } from '../../services/TransactionService/TransactionService';
import {
  loadTotalPageTransactionDone,
  loadTransaction,
  loadTransactionDone,
  loadTransactionFail,
} from '../../stores/TransactionStore/TransactionEvents';

const execute = async (search?: string, numberPage?: number): Promise<void> => {
  loadTransaction();

  return TransactionService.getTransactions(search, numberPage)
    .then(
      ({ transactions, totalPages }: { transactions: TransactionValues[]; totalPages: number }) => {
        loadTransactionDone(transactions);
        loadTotalPageTransactionDone(totalPages);
      },
    )
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
    });
};

const GetTransactionsUseCase = {
  execute,
};

export default GetTransactionsUseCase;
