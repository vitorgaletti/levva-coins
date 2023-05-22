import styled from 'styled-components';

export const SearchFormContainer = styled.form`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  gap: 1rem;

  input {
    padding: 1rem;
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${props => props.theme['gray-700']};
    color: ${props => props.theme['gray-300']};

    &::placeholder {
      color: ${props => props.theme['gray-400']};
    }
  }

  button {
    padding: 1rem;

    display: flex;
    align-items: center;
    gap: 0.75rem;
    grid-column: 3 / 4;

    background-color: transparent;
    border: 1px solid ${props => props.theme['yellow-300']};
    border-radius: 6px;
    color: ${props => props.theme['yellow-300']};

    font-weight: bold;

    transition: all 0.3s;

    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme['yellow-500']};
      border-color: ${props => props.theme['yellow-500']};
      color: ${props => props.theme['gray-600']};
    }
  }
`;
