
import styles from './Carts.module.css';
import CartItem from '../../pages/cartid/[id]';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import Checkbox from '../Checkbox/Checkbox';
import Link from 'next/link';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}
export function extractIdFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

function Carts({ localResult, items }: CartsProps) {
  //const location = useLocation();
  // const navigate = useNavigate();
  const isDetailPage = location.pathname.includes('/item/');
  // const handleClosePageItem = () => {
  //   if (location.pathname.includes('/item')) {
  //    navigate(-1);
  //  }
  // };

  return (
    <section className="section-main">
      <div
        // onClick={handleClosePageItem}
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
                    //className={({ isActive, isPending }) =>
                    // isPending ? 'pending' : isActive ? 'active-linc' : ''
                    // }
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
      </div>
    </section>
  );
}

export default Carts;
