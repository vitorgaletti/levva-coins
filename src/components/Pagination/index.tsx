import { useState } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { PaginationContainer, PrevNextButton, PageNumberButtonsContainer } from './styles';

interface PaginationProps {
  totalPages: number;
  handlePage: (page: number) => void;
}

export function Pagination({ totalPages, handlePage }: PaginationProps) {
  const [pageNumber, setPageNumber] = useState(1);

  function handlePrevPage() {
    if (pageNumber > 0) {
      const prevPage = pageNumber - 1;
      setPageNumber(prevPage);
      handlePage(prevPage);
    }
  }

  function handleNextPage() {
    if (pageNumber < totalPages) {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      handlePage(nextPage);
    }
  }
  function handleGoToPage(page: number) {
    setPageNumber(page);
    handlePage(page);
  }
  function renderPageButtons() {
    const buttons = [];

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handleGoToPage(page)}
          data-currentpage={pageNumber === page}
        >
          <span>{page}</span>
        </button>,
      );
    }

    return buttons;
  }

  return (
    <>
      {totalPages > 0 && (
        <PaginationContainer>
          <PrevNextButton
            onClick={handlePrevPage}
            limit={pageNumber === 1}
            disabled={pageNumber === 1}
          >
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
      )}
    </>
  );
}
