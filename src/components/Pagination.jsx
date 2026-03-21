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

  if (currentPage > 1) {
    pageButtons.push(
      <button
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        className="paginationButton"
      >
        <img src={pokeball} alt="Pokeball" className="paginationButtonImage" />
        Prev
      </button>,
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={i === currentPage ? "active-page" : ""}
      >
        {i}
      </button>,
    );
  }

  if (currentPage < totalPages) {
    pageButtons.push(
      <button
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        className="paginationButton"
      >
        Next
        <img src={pokeball} alt="Pokeball" className="paginationButtonImage" />
      </button>,
    );
  }

  return <div className="pagination-container">{pageButtons}</div>;
};

export default Pagination;
