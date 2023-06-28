import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { SummaryCard, SummaryContainer } from './styles';
import { defaultTheme } from '../../styles/defaultTheme';
import { useStore } from 'effector-react';
import TransactionStore from '../../stores/TransactionStore/TransactionStore';

export function Summary() {
  const { totalIncomes, totalOutcomes, totalBalance } = useStore(TransactionStore);

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={defaultTheme['yellow-500']} />
        </header>
        <strong>{money.format(totalIncomes)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={defaultTheme['red-500']} />
        </header>

        <strong>{money.format(totalOutcomes)}</strong>
      </SummaryCard>
      <SummaryCard variant="balance">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={defaultTheme['yellow-500']} />
        </header>

        <strong>{money.format(totalBalance)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
