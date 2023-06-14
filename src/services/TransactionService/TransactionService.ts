import { AxiosError } from 'axios';
import Api from '../../clients/api/Api';
import { RequestError } from '../../domains/request';
import { NewTransactionParams, TransactionValues } from '../../domains/transaction';

const createTransaction = async ({
  description,
  amount,
  type,
  categoryId,
  userEmail,
}: NewTransactionParams): Promise<TransactionValues> => {
  return Api.post({
    url: '/transaction',
    body: {
      description,
      amount,
      type,
      categoryId,
      userEmail,
    },
  })
    .then(response => {
      return response.data.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      return err.response?.data;
    });
};

const getTransactions = async (
  search?: string,
  numberPage?: number,
): Promise<{ transactions: TransactionValues[]; totalPages: number }> => {
  return Api.get({
    url: `/transaction/4/${numberPage}`,
    config: {
      params: {
        ...(search
          ? {
              search,
            }
          : {}),
      },
    },
  })
    .then(response => {
      return { transactions: response.data.transactions, totalPages: response.data.totalPages };
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const removeTransaction = async (id: string): Promise<void> => {
  return Api.delete({
    url: `/transaction/${id}`,
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const TransactionService = {
  createTransaction,
  getTransactions,
  removeTransaction,
};
