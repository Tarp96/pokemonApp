export const Pagination = () => {
  const pageButtons = [];
  const maxPagesToShow = 5;
  const half = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, pageNumber - half);
  let endPage = Math.min(totalPages, pageNumber + half);
};
