import { MagnifyingGlass } from 'phosphor-react';
import { useEffect } from 'react';
import * as yup from 'yup';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetTransactionsParams } from '../../domains/transaction';

interface FormProps {
  search: string;
}

const formSchema = yup
  .object({
    search: yup.string(),
  })
  .required();

interface SearchFormProps {
  handleSearch: ({ search, pageNumber }: GetTransactionsParams) => void;
}

export function SearchForm({ handleSearch }: SearchFormProps) {
  const { register, handleSubmit, setFocus, watch } = useForm<FormProps>({
    resolver: yupResolver(formSchema),
  });
  const search = watch('search');
  const isSearchEmpty = search === '';

  function handleSearchForm({ search }: FormProps) {
    const formattedSearch = search.trim();
    handleSearch({ search: formattedSearch, pageNumber: 1 });
    setFocus('search');
  }

  useEffect(() => {
    if (isSearchEmpty) handleSearch({ search, pageNumber: 1 });
  }, [!search]);

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchForm)}>
      <input type="text" {...register('search')} placeholder="Busque por transações" autoFocus />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
