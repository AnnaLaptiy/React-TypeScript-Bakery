import React from 'react';
import cartEmpty from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

export const CartEmpty: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Корзина пустая <span>😕</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали ещё пирог.
          <br />
          Для того, чтобы заказать пирог, перейдите на главную страницу.
        </p>
        <img src={cartEmpty} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
