import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../../types/types';
import { extractIdFromUrl } from '../PeopleCarts/Carts';

import styles from './CartItem.module.css';
//import { useLocation } from 'react-router-dom';

export interface CartItemProps {
  element: PeopleArray;
  index: number;
}

function CartItem({ element, index }: CartItemProps) {
  // const location = useLocation();
  // const isDetailPage = location.pathname.includes('/item/');

  return (
    <div key={element.id || index} className={styles.card}>
      <img
        className={styles.card_img}
        src={`${URL_PERSON}${extractIdFromUrl(element.url)}${URL_EXTENSION}`}
        alt={element.name}
      />
      <p key={element.name} className={styles.cart_title}>
        {element.name}
      </p>
    </div>
  );
}

export default CartItem;
