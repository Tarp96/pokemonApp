const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageButtons = [];
  const maxPagesToShow = 5;
  const half = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - half);
  let endPage = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    endPage = Math.min(totalPages, maxPagesToShow);
  } else if (currentPage + half >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  if (currentPage > 1) {
    pageButtons.push(
      <button key="prev" onClick={() => onPageChange(currentPage - 1)}>
        <img
          src="/assets/pokeb.png"
          alt="Pokeball"
          style={{
            width: "20px",
            height: "auto",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
        />
        Prev
      </button>
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
      </button>
    );
  }

  if (currentPage < totalPages) {
    pageButtons.push(
      <button key="next" onClick={() => onPageChange(currentPage + 1)}>
        Next
        <img
          src="/assets/pokeb.png"
          alt="Pokeball"
          className="paginationButtonImage"
        />
      </button>
    );
  }

  return <div className="pagination-container">{pageButtons}</div>;
};

export default Pagination;
