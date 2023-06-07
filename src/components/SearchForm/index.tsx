import { MagnifyingGlass } from 'phosphor-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { SearchFormContainer } from './styles';

interface SearchFormProps {
  handleSearchForm: (searchForm: string) => void;
}

export function SearchForm({ handleSearchForm }: SearchFormProps) {
  const [search, setSearch] = useState<string>('');

  const inputSearchFormRef = useRef<HTMLInputElement>(null);
  const buttonSearchFormRef = useRef<HTMLButtonElement>(null);

  function handleSubmitSearchForm(event: FormEvent) {
    event.preventDefault();

    handleSearchForm(search);

    inputSearchFormRef.current?.focus();
  }

  useEffect(() => {
    if (search === '') handleSearchForm(search);
  }, [search]);

  return (
    <SearchFormContainer onSubmit={handleSubmitSearchForm}>
      <input
        type="text"
        placeholder="Busque por transações"
        value={search}
        onChange={event => setSearch(event.target.value)}
        ref={inputSearchFormRef}
        autoFocus
      />
      <button type="submit" ref={buttonSearchFormRef}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
