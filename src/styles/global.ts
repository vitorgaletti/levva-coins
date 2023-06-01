import styled, { createGlobalStyle } from 'styled-components';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['yellow-500']}
  }

  body {
    background-color: ${props => props.theme['gray-600']};
    color: ${props => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 400 1rem 'Roboto', sans-serif;
  }

`;

export const Form = styled.form`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const FormInput = styled.input`
  width: 100%;
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  border: 0;
  padding: 1rem;
  border-radius: 6px;

  & + & {
    margin-top: 1rem;
  }
`;

export const FormError = styled.span`
  color: ${props => props.theme['red-500']};
  margin: 0.5rem 0 1rem;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 1rem 0;
  margin-top: 1.5rem;

  background-color: ${props => props.theme['yellow-300']};
  border-radius: 6px;
  border: 1px solid ${props => props.theme['yellow-300']};

  font-weight: bold;

  transition: background 0.5s ease;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme['yellow-500']};
    border: 1px solid ${props => props.theme['yellow-500']};
  }
`;

export const FormLink = styled(Link)`
  align-items: flex-end;
  margin-top: 1rem;
  color: ${props => props.theme['yellow-500']};
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;

  font: 400 1rem 'Roboto', sans-serif;
  background: ${props => props.theme.black};
  color: ${props => props.theme['white']};
  border: 0;
  border-radius: 6px;
`;

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome';
}

export const TransactionTypeContainer = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  cursor: pointer;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background: ${props => props.theme['gray-700']};
  color: ${props => props.theme['gray-300']};
  border-radius: 6px;
  border: 0;

  svg {
    color: ${props =>
      props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};
  }

  &[data-state='checked'] {
    color: ${props => props.theme.white};
    background: ${props =>
      props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};
    outline: ${props =>
      props.variant === 'income' ? props.theme['green-500'] : props.theme['red-500']};

    transition: background 0.3s;

    svg {
      color: ${props => props.theme.white};
    }
  }
`;
