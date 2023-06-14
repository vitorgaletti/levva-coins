import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';

import GetTransactionsUseCase from '../../useCases/GetTransactionsUseCase/GetTransactionsUseCase';
import TransactionStore from '../../stores/TransactionStore/TransactionStore';

import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';

import {
  HomeWrapper,
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableEmpty,
} from './styles';
import { TransactionActionModal } from '../../components/TransactionActionModal';
import { Pagination } from '../../components/Pagination';

export function Home() {
  const { isLoading, hasError, errorMessage, transactions, totalPages } =
    useStore(TransactionStore);

  const [searchTransactions, setSearchTransactions] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  function handleSearch(search: string) {
    setPageNumber(1);
    setSearchTransactions(search);
  }

  function handlePagination(page: number) {
    setPageNumber(page);
  }

  function getTransactions(reset: boolean = false) {
    GetTransactionsUseCase.execute(searchTransactions.trim(), reset ? 1 : pageNumber);
  }

  useEffect(() => {
    getTransactions();
  }, [pageNumber, transactions.length]);

  useEffect(() => {
    getTransactions(true);
  }, [searchTransactions]);

  return (
    <HomeWrapper>
      <Header />
      <Summary />

      <SearchForm handleSearchForm={handleSearch} />

      <TransactionsContainer>
        <TransactionsTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 &&
              transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type === 0 ? 'income' : 'outcome'}>
                      {money.format(transaction.amount)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category.description}</td>
                  <td>{new Date(transaction.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <TransactionActionModal id={transaction.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
        {!transactions.length && !isLoading && (
          <TransactionsTableEmpty>
            Adicione uma categoria e a sua primeira transação :)
          </TransactionsTableEmpty>
        )}

        {isLoading && <TransactionsTableEmpty>Carregando...</TransactionsTableEmpty>}
      </TransactionsContainer>

      <Pagination totalPages={totalPages} handlePage={handlePagination} pageSelect={pageNumber} />
    </HomeWrapper>
  );
}
