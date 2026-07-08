import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({
  currentPage,
  onPageChange,
  nextPage = <ChevronRight size={18} />,
  prevPage = <ChevronLeft size={18} />,
  firstPage = <ChevronsLeft size={18} />,
  lastPage = <ChevronsRight size={18} />,
}) => {
  const { totalPages, products } = useSelector((state) => state.product);

  if (!products || products.length === 0 || totalPages <= 1) return null;

  const btnBase =
    "h-9 min-w-9 px-2 flex items-center justify-center rounded-md border border-slate-200 text-sm font-medium transition-colors duration-150";

  const navBtn = `${btnBase} bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white`;

  const activeBtn = "bg-blue-600 border-blue-600 text-white";
  const inactiveBtn = "bg-white text-slate-600 hover:bg-slate-100";

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 1;

    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="grid grid-cols-3 items-center mt-6">
      <div className="flex gap-2 justify-self-start">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className={navBtn}
        >
          {firstPage}
        </button>

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={navBtn}
        >
          {prevPage}
        </button>
      </div>

      <div className="flex gap-2 justify-self-center">
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${btnBase} ${
              currentPage === number ? activeBtn : inactiveBtn
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 justify-self-end">
        <div className="flex gap-2">
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={navBtn}
          >
            {nextPage}
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className={navBtn}
          >
            {lastPage}
          </button>
        </div>

        <p className="text-sm text-slate-400 whitespace-nowrap">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
