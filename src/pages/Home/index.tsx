import { useStore } from 'effector-react';

import TransactionStore from '../../stores/TransactionStore/TransactionStore';

import { useGetTransactionData } from '../../hooks/useGetTransactionData';

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
import CircularProgress from '@mui/material/CircularProgress';

export function Home() {
  const { isLoading, transactions } = useStore(TransactionStore);

  const { handleSearch, handlePagination, pageNumber, totalPages } = useGetTransactionData();

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <HomeWrapper>
      <Header />
      <Summary />

      <SearchForm handleSearch={handleSearch} />

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

        {isLoading && (
          <TransactionsTableEmpty>
            <CircularProgress />
          </TransactionsTableEmpty>
        )}
      </TransactionsContainer>

      {transactions.length > 0 && (
        <Pagination
          handlePagination={handlePagination}
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    </HomeWrapper>
  );
}
