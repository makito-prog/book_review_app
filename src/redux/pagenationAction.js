export const setCurrentPage = (pageNumber) => ({
  type: 'SET_CURRENT_PAGE',
  payload: pageNumber,
});

export const setTotalPages = (totalPages) => ({
  type: 'SET_TOTAL_PAGES',
  payload: totalPages,
});