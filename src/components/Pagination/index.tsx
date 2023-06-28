import { CaretLeft, CaretRight } from 'phosphor-react';
import { PageNumberButtonsContainer, PaginationContainer, PrevNextButton } from './styles';
import { GetTransactionsParams } from '../../domains/transaction';

interface PaginationProps {
  handlePagination: ({ pageNumber }: GetTransactionsParams) => void;
  pageNumber: Pick<GetTransactionsParams, 'pageNumber'>;
  totalPages: number;
}

export function Pagination({
  handlePagination,
  pageNumber: { pageNumber },
  totalPages,
}: PaginationProps) {
  function handlePrevPage() {
    if (pageNumber > 1) {
      const prevPage = pageNumber - 1;

      handlePagination({ pageNumber: prevPage });
    }
  }

  function handleNextPage() {
    if (pageNumber < totalPages) {
      const nextPage = pageNumber + 1;

      handlePagination({ pageNumber: nextPage });
    }
  }

  function handleGoToPage(page: number) {
    handlePagination({ pageNumber: page });
  }

  function renderPageButtons() {
    const array = Array.from(Array(totalPages).keys(), index => index + 1);
    return array.map(page => (
      <button
        key={page}
        onClick={() => handleGoToPage(page)}
        data-currentpage={pageNumber === page}
      >
        <span>{page}</span>
      </button>
    ));
  }

  return (
    <PaginationContainer>
      <PrevNextButton onClick={handlePrevPage} limit={pageNumber === 1} disabled={pageNumber === 1}>
        <CaretLeft size={24} weight="bold" />
      </PrevNextButton>
      <PageNumberButtonsContainer>{renderPageButtons()}</PageNumberButtonsContainer>
      <PrevNextButton
        onClick={handleNextPage}
        limit={pageNumber === totalPages}
        disabled={pageNumber === totalPages}
      >
        <CaretRight size={24} weight="bold" />
      </PrevNextButton>
    </PaginationContainer>
  );
}
