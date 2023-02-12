import React from 'react';
import pay from '../assets/img/8Mvj.gif';
import { Link } from 'react-router-dom';

export const PaymentBlock: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Thank you!</h2>
        <p>
          Приходите к нам еще!
          <br />
        </p>

        <img className="pay" src={pay} alt="Thank you" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};
