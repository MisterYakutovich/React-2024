import { useRouter } from 'next/router';
import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../../types/types';
import { extractIdFromUrl } from '../PeopleCarts/Carts';
import styles from './CartItem.module.css';
import { wrapper } from '../../redux/store';
import { getPeopleId } from '../../redux/services/api_people';
import { InferGetServerSidePropsType } from 'next';

export interface CartItemProps {
  element: PeopleArray;
  index: number;
}

function CartItem({ element, index }: CartItemProps) {
  const router = useRouter();

  const isDetailPage = router.pathname.includes('/item/');

  return (
    <div
      key={element.id || index}
      className={styles.card}
      // className={`${styles.card} ${isDetailPage ? styles.card_small : ''}`}
    >
      <img
        className={styles.card_img}
        // className={`${styles.card_img} ${isDetailPage ? styles.card_img_small : ''}`}
        src={`${URL_PERSON}${extractIdFromUrl(element.url)}${URL_EXTENSION}`}
        alt={element.name}
      />
      <p
        key={element.name}
        className={styles.cart_title}
        // className={`${styles.cart_title} ${isDetailPage ? styles.cart_title_small : ''}`}
      >
        {element.name}
      </p>
    </div>
  );
}

export default CartItem;
