import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './Pagination.module.scss';
import { NotFoundBlock } from '../NotFoundBlock';
type PaginationProps = {
  currentPage: number;
  onChangePage: (elem: number) => void;
};

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { pagesCount } = useSelector((state: RootState) => state.pie);

  return pagesCount > 1 ? (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={(event) => {
        props.onChangePage(event.selected + 1);
      }}
      pageRangeDisplayed={5}
      pageCount={pagesCount}
      forcePage={props.currentPage - 1 <= pagesCount ? props.currentPage - 1 : 0}
      previousLabel="< Previous"
    />
  ) : pagesCount === 0 ? (
    <NotFoundBlock />
  ) : (
    <></>
  );
};
