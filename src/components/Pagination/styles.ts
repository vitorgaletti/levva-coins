import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

interface PrevNextButtonProps {
  limit: boolean;
}

export const PrevNextButton = styled.button<PrevNextButtonProps>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  svg {
    color: ${props => (props.limit ? props.theme['gray-500'] : props.theme['yellow-500'])};
  }

  :hover {
    transform: translate(-3px);
  }
`;

export const PageNumberButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    width: 2.5rem;
    height: 2.5rem;
    flex: 1;
    border-radius: 6px;
    cursor: pointer;
    border: 0;
    background-color: #323238;
    color: #8d8d99;

    &[data-currentpage='true'] {
      background-color: #1e1e1e;

      span {
        color: ${props => props.theme['yellow-500']};
      }
    }
  }
`;
