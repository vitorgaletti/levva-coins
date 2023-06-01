import { RequestError } from '../../domains/request';
import { NewTransactionParams } from '../../domains/transaction';
import { TransactionService } from '../../services/TransactionService/TransactionService';
import {
  loadCreateTransactionDone,
  loadTransaction,
  loadTransactionFail,
} from '../../stores/TransactionStore/TransactionEvents';

const execute = async ({
  description,
  amount,
  type,
  categoryId,
}: NewTransactionParams): Promise<void> => {
  loadTransaction();

  return TransactionService.createTransaction({
    description,
    amount,
    type,
    categoryId,
  })
    .then(() => {
      loadCreateTransactionDone();
    })
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
      throw new Error();
    });
};

const NewTransactionUseCases = {
  execute,
};

export default NewTransactionUseCases;
