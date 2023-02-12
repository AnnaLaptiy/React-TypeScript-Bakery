import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../redux/slices/cartSlice';
import { fetchItemById } from '../redux/slices/piesSlice';
import { NotFoundBlock } from '../components/NotFoundBlock';
import loadingGIF from '../assets/img/200w.gif';
import { useAppDispatch } from '../redux/store';
import { RootState } from '../redux/store';

export const FullPie: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { currentItem, status } = useSelector((state: RootState) => state.pie);
  const itemInCart = useSelector((state: { cart: { items: { id: number; count: number }[] } }) =>
    state.cart.items.find((item) => item.id === Number(id)),
  );
  const addedCount = itemInCart && itemInCart.count;

  React.useEffect(() => {
    dispatch(fetchItemById(Number(id)));
  }, []);

  const onClickAdd = () => {
    dispatch(addItem(currentItem));
  };

  return status === 'loaded' ? (
    !currentItem ? (
      <NotFoundBlock />
    ) : (
      <div className="full-page">
        <img className="image" src={currentItem.firstImage} alt="pie" />
        {currentItem.secondImage && (
          <img className="image" src={currentItem.secondImage} alt="pie" />
        )}

        <h4 className="pie-block__title">{currentItem.title}</h4>
        <em className="pie-block__second-title">{currentItem.secondTitle}</em>
        <div className="full-page__selector">
          <p>{currentItem.description}</p>

          <ul>
            {currentItem.size && <li>{currentItem.size} см.</li>}
            {currentItem.weight && <li>{currentItem.weight}г</li>}
          </ul>
        </div>

        {currentItem.compound && <h5 className="full-page__compound">Состав</h5>}
        <p>{currentItem.compound}</p>
        <div className="pie-block__bottom">
          <div className="pie-block__price">{currentItem.price} ₽</div>
        </div>
        <Link to="/" className="button button--black full-page__button">
          <span>Вернуться назад</span>
        </Link>

        <button
          onClick={onClickAdd}
          className="button button--outline button--add full-page__button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {itemInCart && <i>{addedCount}</i>}
        </button>
      </div>
    )
  ) : (
    <div className="full-page">
      <h3>Loading</h3>
      <img className="pay" src={loadingGIF} alt="Thank you" />
    </div>
  );
};
