import React from 'react';
import { setActiveCategory } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveCategory } from '../redux/slices/filterSlice';

export const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(selectActiveCategory);
  const items: string[] = ['Все', 'На песочном тесте', 'Русские', 'Осетинские', 'Чизкейки'];

  const onClickCategoryItem = (index: number) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((elem, index) => (
            <li
              className={elem === items[activeCategory] ? 'active' : ''}
              onClick={() => onClickCategoryItem(index)}
              key={elem}>
              {elem}
            </li>
          ))}
      </ul>
    </div>
  );
};
