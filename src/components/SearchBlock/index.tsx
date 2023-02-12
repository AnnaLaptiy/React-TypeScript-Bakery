import React from 'react';
import styles from './Search.module.scss';
import lodashDebounce from 'lodash.debounce';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const SearchBlock: React.FC = () => {
  const dispatch = useDispatch();
  const [visibleValue, setVisibleValue] = React.useState('');
  const searchFieldRef = React.useRef<HTMLInputElement | null>(null);
  const { searchValue } = useSelector((state: { filter: { searchValue: string } }) => state.filter);
  const testDebounce = React.useCallback(
    lodashDebounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const onClickDelete = () => {
    dispatch(setSearchValue(''));
    setVisibleValue('');
    if (searchFieldRef.current) {
      searchFieldRef.current.focus();
    }
  };

  const onClickInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleValue(event.target?.value); //Для немедленного обновления строки поиска
    testDebounce(event.target.value); // что бы запросы происходили с задержкой
  };

  return (
    <div className={styles.root}>
      <input
        ref={searchFieldRef}
        value={visibleValue}
        onChange={(event) => onClickInput(event)}
        className={styles.input}
        placeholder="🔍︎ Поиск"
      />
      {searchValue && (
        <svg
          onClick={onClickDelete}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
