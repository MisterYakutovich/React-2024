import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../../types/types';
import { extractIdFromUrl } from '../PeopleCarts/Carts';
import './CartItem.css';
import { useLocation } from 'react-router-dom';

export interface CartItemProps {
  element: PeopleArray;
  index: number;
}

function CartItem({ element, index }: CartItemProps) {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/item/');

  return (
    <div
      key={element.id || index}
      className={`card ${isDetailPage ? 'card-small' : ''}`}
    >
      <img
        className={`card_img ${isDetailPage ? 'card_img-small' : ''}`}
        src={`${URL_PERSON}${extractIdFromUrl(element.url)}${URL_EXTENSION}`}
        alt={element.name}
      />
      <p
        key={element.name}
        className={`cart_title ${isDetailPage ? 'cart_title_small' : ''}`}
      >
        {element.name}
      </p>
    </div>
  );
}

export default CartItem;
