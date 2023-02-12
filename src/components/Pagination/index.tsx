import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (elem: number) => void;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={(event) => {
        props.onChangePage(event.selected + 1);
      }}
      pageRangeDisplayed={5}
      pageCount={7}
      forcePage={props.currentPage - 1}
      previousLabel="< Previous"
    />
  );
};
