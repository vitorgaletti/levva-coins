import styled from 'styled-components';

export const TransactionActionButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;

  svg {
    color: ${props => props.theme['gray-350']};
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
      color: ${props => props.theme['red-500']};
    }
  }
`;

export const DeleteTransactionContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  div {
    display: flex;
    flex: 1;
    align-self: flex-end;
    gap: 0.5rem;
  }
`;

interface DeleteTransactionButtonProps {
  variant: 'confirm' | 'cancel';
}

export const DeleteTransactionButton = styled.button<DeleteTransactionButtonProps>`
  padding: 0.875rem;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${props =>
    props.variant === 'confirm' ? props.theme['red-500'] : props.theme['gray-300']};

  color: ${props => (props.variant === 'confirm' ? props.theme['white'] : props.theme['black'])};

  transition: all 0.3s;

  &:hover {
    background-color: ${props =>
      props.variant === 'confirm' ? props.theme['red-600'] : props.theme['gray-350']};

    color: ${props => (props.variant === 'confirm' ? props.theme['white'] : props.theme['black'])};
  }
`;
