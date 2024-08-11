import styles from './Carts.module.css';
import CartItem from '../CartItem/CartItem';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import Checkbox from '../Checkbox/Checkbox';
import { Link } from 'react-router-dom';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}
export function extractIdFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

function Carts({ localResult, items }: CartsProps) {
  return (
    <>
      <section className="section-main">
        <div className={styles.container}>
          {items.length === 0 ? (
            <div>No items available</div>
          ) : localResult.length === 0 ? (
            items.map((element, index) => (
              <div key={element.id} className={styles.cart_item_wrapper}>
                <Checkbox element={element} />
                <Link
                  key={element.id}
                  to={`/details/${extractIdFromUrl(element.url)}`}
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
      </section>
    </>
  );
}

export default Carts;
