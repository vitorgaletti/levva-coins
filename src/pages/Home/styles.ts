import styled from 'styled-components';

export const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 77em 1fr;
`;

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto 0;
  padding: 0 1.5rem;

  grid-column: 2 / 3;
`;
export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  td {
    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  thead {
    td {
      padding: 1rem 2rem;
    }
  }

  tbody {
    td {
      padding: 1.25rem 2rem;
      background: ${props => props.theme['gray-500']};
    }
  }
`;

interface PriceHighLightProps {
  variant?: 'income' | 'outcome';
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${props =>
    props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};
`;
