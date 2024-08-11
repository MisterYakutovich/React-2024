import { useDispatch, useSelector } from 'react-redux';
import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../../types/types';
import ClosePageItem from '../ClosePageItem/ClosePageItem';
import { extractIdFromUrl } from '../PeopleCarts/Carts';
import styles from './PageItemCart.module.css';
import { RootState } from '../../redux/store';
import CartItem from '../CartItem/CartItem';
import { useEffect } from 'react';
import { setItemsCurrentPage } from '../../redux/slices/itemsCurrentPageSlice';

interface PageItemProps {
  details: PeopleArray;
}
function PageItem({ details }: PageItemProps) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.itemsCurrentPage.items);
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);

      dispatch(setItemsCurrentPage(parsedItems));
    }
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('items', JSON.stringify(items));
    }
  }, [items]);
  return (
    <section className={styles.section_container}>
      <div className={styles.container_itemcart_description}>
        <div className={styles.container_pageitem}>
          <ClosePageItem />
          <div className={styles.cart_pageitem}>
            <img
              className={styles.cart_img_pageitem}
              src={`${URL_PERSON}${extractIdFromUrl(details.url)}${URL_EXTENSION}`}
              alt=""
            />
            <p className={styles.cart_title_pageitem}>{details.name}</p>
          </div>
        </div>
        <div className={styles.description}>
          <p>Height: {details.height}</p>
          <p>Birth_year: {details.birth_year}</p>
          <p>Eye_color: {details.eye_color}</p>
          <p>Mass: {details.mass}</p>
          <p>Edited: {details.edited}</p>
          <p>Created: {details.created}</p>
        </div>
      </div>
      <div className={styles.container_wrapper_pageitemcart}>
        {items.map((element, index) => (
          <CartItem key={index} index={index} element={element} />
        ))}
      </div>
    </section>
  );
}
export default PageItem;
