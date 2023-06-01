import styled from 'styled-components';

export const HomeWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 1.5rem auto 0;

  @media only screen and (max-width: 1440px) {
    max-width: 1024px;
  }
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
    tr {
      th {
        padding: 1rem 2rem;
        text-align: start;
        color: ${props => props.theme['gray-400']};
      }
    }
  }

  tbody {
    td {
      padding: 1.25rem 2rem;
      background: ${props => props.theme['gray-500']};
    }
  }
`;

export const TransactionsTableEmpty = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
`;
interface PriceHighLightProps {
  variant?: 'income' | 'outcome';
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${props =>
    props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};
`;
