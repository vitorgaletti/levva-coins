import { AxiosError } from 'axios';
import Api from '../../clients/api/Api';
import { RequestError } from '../../domains/request';
import {
  GetTransactionsParams,
  NewTransactionParams,
  RemoveTransactionsParams,
  TransactionResponse,
  TransactionValues,
} from '../../domains/transaction';

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

const getTransactions = async ({
  search,
  pageNumber,
}: GetTransactionsParams): Promise<TransactionResponse> => {
  const isSearch = {
    ...(search ? { search } : {}),
  };

  return Api.get({
    url: `/transaction/4/${pageNumber}`,
    config: {
      params: {
        ...isSearch,
      },
    },
  })
    .then(response => {
      const { transactions, totalPages, totalIncomes, totalOutcomes, totalBalance } = response.data;
      return {
        transactions,
        totalPages,
        totalIncomes,
        totalOutcomes,
        totalBalance,
      };
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const removeTransaction = async ({ id }: RemoveTransactionsParams): Promise<void> => {
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
