import { useState, useEffect } from "react";
import pokeball from "../assets/pokeb.webp";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageButtons = [];
  const [maxPagesToShow, setMaxPagesToShow] = useState(5);
  const half = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMaxPagesToShow(3);
      } else {
        setMaxPagesToShow(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (currentPage <= half) {
    endPage = Math.min(totalPages, maxPagesToShow);
  } else if (currentPage + half >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  return (
    <nav className="pagination-container" aria-label="Pagination">
      {currentPage > 1 && (
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="paginationButton"
          aria-label="Go to previous page"
        >
          <img
            src={pokeball}
            alt=""
            aria-hidden="true"
            className="paginationButtonImage"
          />
          Prev
        </button>
      )}

      {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
        const i = startPage + idx;
        return (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={i === currentPage ? "active-page" : ""}
            aria-current={i === currentPage ? "page" : undefined}
            aria-label={`Go to page ${i}`}
          >
            {i}
          </button>
        );
      })}

      {currentPage < totalPages && (
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="paginationButton"
          aria-label="Go to next page"
        >
          Next
          <img
            src={pokeball}
            alt=""
            aria-hidden="true"
            className="paginationButtonImage"
          />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
