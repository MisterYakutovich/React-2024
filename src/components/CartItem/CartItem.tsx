import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../../types/types';
import './CartItem.css';
import { useLocation } from 'react-router-dom';

export interface CartItemProps {
  i: PeopleArray;
  index: number;
}

function CartItem({ i, index }: CartItemProps) {
  const location = useLocation();

  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  const isDetailPage = location.pathname.includes('/item/');

  return (
    <div
      key={i.id || index}
      className={`card ${isDetailPage ? 'card-small' : ''}`}
    >
      <img
        className={`card_img ${isDetailPage ? 'card_img-small' : ''}`}
        src={`${URL_PERSON}${extractIdFromUrl(i.url)}${URL_EXTENSION}`}
        alt={i.name}
      />
      <p
        key={i.name}
        className={`cart_title ${isDetailPage ? 'cart_title_small' : ''}`}
      >
        {i.name}
      </p>
    </div>
  );
}

export default CartItem;
