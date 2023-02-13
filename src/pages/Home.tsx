import React from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { SortLabel } from '../components/SortLabel';
import { PieBlock } from '../components/PieBlock';
import { PieLoader } from '../components/PieBlock/PieLoader';
import { Pagination } from '../components/Pagination';

import { useSelector } from 'react-redux';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPies } from '../redux/slices/piesSlice';
import { NotFoundBlock } from '../components/NotFoundBlock';
import { useAppDispatch } from '../redux/store';
import { RootState } from '../redux/store';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMounted = React.useRef(false);
  const { searchValue } = useSelector((state: { filter: { searchValue: string } }) => state.filter);

  const { items, status } = useSelector((state: RootState) => state.pie);
  const { activeSortItem, activeCategory, currentPage } = useSelector(
    (state: RootState) => state.filter,
  );

  const onChangePage = (count: number) => {
    dispatch(setCurrentPage(count));
  };

  const getPies = async () => {
    let filter = '';

    switch (Number(activeSortItem)) {
      case 0:
        filter = 'sortBy=price';
        break;
      case 5:
        filter = 'sortBy=title';
        break;
      default:
        filter = 'type=' + activeSortItem;
    }

    dispatch(fetchPies({ filter, activeCategory, searchValue, currentPage }));

    window.scroll(0, 0);
  };

  React.useEffect(() => {
    getPies();
  }, [activeCategory, activeSortItem, searchValue, currentPage]);

  interface FilterType {
    searchValue: string;
    activeSortItem: number;
    activeCategory: number;
    currentPage: number;
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FilterType; //так как нельзя передавать первым ?
      dispatch(setFilters(params));
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      //Для формирования адресной строки с параметрами
      const quetyString = qs.stringify({
        activeCategory,
        activeSortItem,
        currentPage,
      });
      navigate(`?${quetyString}`);
    }

    isMounted.current = true; //Изначально адресная строка чистая, без параметров
  }, [activeCategory, activeSortItem, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortLabel />
      </div>

      {status === 'error' ? (
        <NotFoundBlock />
      ) : (
        <>
          <div className="content__items">
            {status === 'loading'
              ? [...Array(7)].map((_, index) => <PieLoader key={index} />)
              : items.map((item) => <PieBlock key={item.id} {...item} />)}
          </div>
          {status === 'loaded' && (
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
          )}
        </>
      )}
    </div>
  );
};
