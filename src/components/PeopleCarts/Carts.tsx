import styles from './Carts.module.css';
import CartItem from '../CartItem/CartItem';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import Checkbox from '../Checkbox/Checkbox';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}
export function extractIdFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

function Carts({ localResult }: CartsProps) {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.itemsCurrentPage.items);
  const isDetailPage = router.pathname.includes('/cartid/');
  // const handleClosePageItem = () => {
  //  if (router.pathname.includes('/item')) {
  //    router.push('/')
  //   }

  // };

  return (
    <section className="section-main">
      <div
        //onClick={handleClosePageItem}
        className={styles.container}
      >
        {items.length === 0 ? (
          <div>No items available</div>
        ) : localResult.length === 0 ? (
          items.map((element, index) => (
            <div key={element.id} className={styles.cart_item_wrapper}>
              <Checkbox element={element} />
              <Link
                key={element.id}
                href={`/cartid/${extractIdFromUrl(element.url)}`}
                style={{ textDecoration: 'none' }}
              >
                <CartItem key={element.id} element={element} index={index} />
              </Link>
            </div>
          ))
        ) : (
          localResult.map((element, index) => (
            <CartItem key={element.id} element={element} index={index} />
          ))
        )}
      </div>
      {/*<div
        //onClick={handleClosePageItem}
        className={styles.container}
      >
        {items.length === 0 ? (
          <div>No items available</div>
        ) : localResult.length === 0 ? (
          items.map((element, index) => (
            <div key={element.id} className={styles.cart_item_wrapper}>
              {isDetailPage ? (
                <div className={styles.cart_item}>
                  <CartItem key={element.id} element={element} index={index} />
                </div>
              ) : (
                <>
                  <Checkbox element={element} />
                  <Link
                    key={element.id}
                    href={`/cartid/${extractIdFromUrl(element.url)}`}
                    style={{ textDecoration: 'none' }}
                   // className={({ isActive, isPending }) =>
                   //  isPending ? 'pending' : isActive ? 'active-linc' : ''
                   //  }
                  >
                    <CartItem
                      key={element.id}
                      element={element}
                      index={index}
                    />
                  </Link>
                </>
              )}
            </div>
          ))
        ) : (
          localResult.map((element, index) => (
            <CartItem key={element.id} element={element} index={index} />
          ))
        )}
          </div>*/}
    </section>
  );
}

export default Carts;
