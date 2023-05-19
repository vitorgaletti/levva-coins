import { Header } from '../../components/Header';
import { SearchForm } from '../../components/SearchForm';
import { Summary } from '../../components/Summary';
import { HomeWrapper, PriceHighLight, TransactionsContainer, TransactionsTable } from './styles';

export function Home() {
  return (
    <HomeWrapper>
      <Header />
      <Summary />

      <SearchForm />

      <TransactionsContainer>
        <TransactionsTable>
          <thead>
            <td>Descrição</td>
            <td>Preço</td>
            <td>Categoria</td>
            <td>Data</td>
          </thead>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighLight variant="income">R$ 12.000,00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>

            <tr>
              <td width="50%">Hambúrguer</td>
              <td>
                <PriceHighLight variant="outcome">- R$ 59,00</PriceHighLight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </HomeWrapper>
  );
}
