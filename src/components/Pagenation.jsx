import React from 'react';
import { useSelector } from 'react-redux';
import './pagination.css'

export const Pagination = (props) => {
  const {goToPage} = props;

  const currentPage = useSelector((state) => state.pagination.currentPage);
  const totalPages = useSelector((state) => state.pagination.totalPages);

  return (
    <div className="pagination">
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>前のページ</button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>次のページ</button>
    </div>
  );
};
