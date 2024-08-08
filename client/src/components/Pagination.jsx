import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Calculate the range of page numbers to display
  let startPage;
  let endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return (
    <div className="flex justify-center items-center mt-5 pb-10">
      <button
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
        className="mx-1 px-3 py-2 text-sm border bg-gray-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {pageNumbers.map((pageNumber) => (
        pageNumber >= startPage && pageNumber <= endPage && (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`mx-1 px-3 py-2 text-sm border cursor-pointer ${pageNumber === currentPage ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-green-300 hover:text-black'}`}
          >
            {pageNumber}
          </button>
        )
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
        className="mx-1 px-3 py-2 text-sm border bg-gray-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
