import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom'; // Navigate нужен для перехода на другую страницу
import { RootState } from '../../redux/store';

function formatCompoundText(string: string) {
  let formatedString = string;
  const tokens = ['Калорийность', 'Белки', 'Жиры', 'Углеводы', 'Состав', 'Срок годности'];
  tokens.forEach((token) => {
    formatedString = formatedString.replace(token, `\n${token}`);
  });
  return formatedString;
}

type PieBlockProps = {
  id: number;
  firstImage: string;
  secondImage?: string;
  title: string;
  secondTitle: string;
  description: string;
  size?: string;
  weight?: string;
  compound?: string;
  price: number;
};

export const PieBlock: React.FC<PieBlockProps> = (props) => {
  const formatedCompoundText = formatCompoundText(props.compound ? props.compound : '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === props.id),
  );
  const addedCount = currentItem && currentItem.count;

  const onClickAdd = () => {
    dispatch(addItem(props));
  };

  return (
    <div className="pie-block">
      <div className="animate">
        <img
          className={props.secondImage ? 'pie-block__image first' : 'pie-block__image'}
          src={props.secondImage}
          alt="pie"
        />
        <img
          className={props.secondImage ? 'pie-block__image second' : 'pie-block__image'}
          src={props.firstImage}
          alt="pie"
        />
      </div>

      <h4
        onClick={() => {
          navigate(`/pies/${props.id}`);
        }}
        className="pie-block__title">
        {props.title}
      </h4>
      <em className="pie-block__second-title">{props.secondTitle}</em>
      <div className="pie-block__selector">
        <p>{props.description}</p>

        <ul>
          {props.size && <li>{props.size} см.</li>}
          {props.weight && <li>{props.weight}г</li>}
          {formatedCompoundText && (
            <li className="active tooltip">
              Состав
              <span className="tooltiptext">{formatedCompoundText}</span>
            </li>
          )}
        </ul>
      </div>
      <div className="pie-block__bottom">
        <div className="pie-block__price">{props.price} ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
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
          {currentItem && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
