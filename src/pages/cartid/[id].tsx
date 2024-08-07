import styles from './PageItemCart.module.css';
import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import Loader from '../../components/Loader/Loader';

import { extractIdFromUrl } from '../../components/PeopleCarts/Carts';
import {
  getPeopleId,
  useGetPeopleIdQuery,
} from '../../redux/services/api_people';
import { useRouter } from 'next/router';
import { RootState, wrapper } from '../../redux/store';
import { InferGetServerSidePropsType } from 'next';
import CartItem from '../../components/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setItemsCurrentPage } from '../../redux/slices/itemsCurrentPageSlice';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.query.id;
    const { data: item } = await store.dispatch(getPeopleId.initiate(id));

    return { props: { item } };
  }
);
function PageItemCart({
  item,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const items = useSelector((state: RootState) => state.itemsCurrentPage.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, isError } = useGetPeopleIdQuery(``);
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);

      dispatch(setItemsCurrentPage(parsedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
        <Loader />
      </>
    );
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  if (!item) {
    return <div className="isError">No data found.</div>;
  }
  const handleClose = () => {
    router.push('/');
  };

  return (
    <section className={styles.section_container}>
      <div className={styles.container_itemcart_description}>
        <div className={styles.container_pageitem}>
          <div
            onClick={handleClose}
            className={styles.close_pageitem}
            data-testid="close-pageitem"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="7.5"
                fill="white"
                stroke="#DBDBDB"
              />
              <path
                d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                fill="#B5B5B5"
              />
            </svg>{' '}
          </div>

          <div className={styles.cart_pageitem}>
            <img
              className={styles.cart_img_pageitem}
              src={`${URL_PERSON}${extractIdFromUrl(item.url)}${URL_EXTENSION}`}
              alt=""
            ></img>
            <p className={styles.cart_title_pageitem}>{item.name}</p>
          </div>
        </div>
        <div className={styles.description}>
          <p>Height:{item.height}</p>
          <p>Birth_year:{item.birth_year}</p>
          <p>Eye_color:{item.eye_color}</p>
          <p>Mass:{item.mass}</p>
          <p>Edited:{item.edited}</p>
          <p>Created:{item.created}</p>
        </div>
      </div>
      <div className={styles.container_wrapper_pageitemcart}>
        {items.map((element, index) => (
          <CartItem index={index} element={element} />
        ))}
      </div>
    </section>
  );
}

export default PageItemCart;
