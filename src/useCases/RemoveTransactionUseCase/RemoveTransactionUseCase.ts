import { RequestError } from '../../domains/request';
import { RemoveTransactionsParams } from '../../domains/transaction';
import { TransactionService } from '../../services/TransactionService/TransactionService';
import {
  loadTransaction,
  loadTransactionFail,
  loadDeleteTransactionDone,
} from '../../stores/TransactionStore/TransactionEvents';

const execute = async ({ id }: RemoveTransactionsParams): Promise<void> => {
  loadTransaction();
  return TransactionService.removeTransaction({ id })
    .then(() => {
      loadDeleteTransactionDone({ id });
    })
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
    });
};

const RemoveTransactionUseCase = {
  execute,
};
export default RemoveTransactionUseCase;
