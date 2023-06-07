import { useStore } from 'effector-react';
import { useCallback, useEffect, useState } from 'react';

import { TransactionValues } from '../../domains/transaction';
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

export function Home() {
  const { isLoading, hasError, errorMessage, transactions } = useStore(TransactionStore);

  const [searchTransactions, setSearchTransactions] = useState<TransactionValues[]>([]);
  const [] = useState(false);

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleSearch = useCallback(
    (search: string) => {
      const searchRegex = new RegExp(search, 'i');
      const searchResult = transactions.filter(transaction =>
        searchRegex.test(transaction.description),
      );
      setSearchTransactions(searchResult);
    },
    [transactions],
  );

  useEffect(() => {
    GetTransactionsUseCase.execute();
  }, []);

  useEffect(() => {
    setSearchTransactions(transactions);
  }, [transactions]);

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
            </tr>
          </thead>
          <tbody>
            {searchTransactions.length > 0 &&
              searchTransactions.map(transaction => (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type === 0 ? 'income' : 'outcome'}>
                      {money.format(transaction.amount)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category.description}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </TransactionsTable>
        {!searchTransactions.length && !isLoading && (
          <TransactionsTableEmpty>
            Adicione uma categoria e a sua primeira transação :)
          </TransactionsTableEmpty>
        )}

        {isLoading && <TransactionsTableEmpty>Carregando...</TransactionsTableEmpty>}
      </TransactionsContainer>
    </HomeWrapper>
  );
}
