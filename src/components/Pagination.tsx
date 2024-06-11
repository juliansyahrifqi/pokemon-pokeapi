import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center">
      <button
        className={`px-3 py-1 border rounded-full ${
          currentPage === 1 ? "bg-gray-300 text-gray-600" : "bg-gray-700 text-white"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#8249;
      </button>
      <span className="mx-2">
        {currentPage} / {totalPages}
      </span>
      <button
        className={`px-3 py-1 border rounded-full ${
          currentPage === totalPages || totalPages === 0 ? "bg-gray-300 text-gray-600" : "bg-gray-700 text-white"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Pagination;
