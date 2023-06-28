import { useEffect, useState } from 'react';
import GetTransactionsUseCase from '../useCases/GetTransactionsUseCase/GetTransactionsUseCase';
import { GetTransactionsParams } from '../domains/transaction';
import { useStore } from 'effector-react';
import TransactionStore from '../stores/TransactionStore/TransactionStore';
import {
  loadCreateTransactionDone,
  loadDeleteTransactionDone,
} from '../stores/TransactionStore/TransactionEvents';

export function useGetTransactionData() {
  const [searchTransactions, setSearchTransactions] = useState<
    Pick<GetTransactionsParams, 'search'>
  >({ search: '' });

  const [pageNumber, setPageNumber] = useState<Pick<GetTransactionsParams, 'pageNumber'>>({
    pageNumber: 1,
  });

  const { totalPages } = useStore(TransactionStore);

  function handleSearch({ search, pageNumber = 1 }: GetTransactionsParams) {
    setPageNumber({ pageNumber });
    setSearchTransactions({ search });
  }

  function handlePagination({ pageNumber }: GetTransactionsParams) {
    setPageNumber({ pageNumber });
  }

  function getTransactions() {
    GetTransactionsUseCase.execute({
      search: searchTransactions.search,
      pageNumber: pageNumber.pageNumber,
    });
  }

  useEffect(() => {
    getTransactions();
  }, [pageNumber, searchTransactions]);

  useEffect(() => {
    const createTransaction = loadCreateTransactionDone.watch(_ => {
      handlePagination({ pageNumber: 1 });
    });

    const deleteTransaction = loadDeleteTransactionDone.watch(_ => {
      handlePagination({ pageNumber: 1 });
    });

    return () => {
      createTransaction();
      deleteTransaction();
    };
  }, []);

  return {
    searchTransactions,
    pageNumber,
    handleSearch,
    handlePagination,
    totalPages,
    getTransactions,
  };
}
