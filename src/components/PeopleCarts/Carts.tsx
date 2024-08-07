import styles from './Carts.module.css';
import CartItem from '../CartItem/CartItem';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import Checkbox from '../Checkbox/Checkbox';
import Link from 'next/link';

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
  const items = useSelector((state: RootState) => state.itemsCurrentPage.items);

  return (
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
                href={`/cartid/${extractIdFromUrl(element.url)}`}
                style={{ textDecoration: 'none' }}
              >
                
                <CartItem key={element.id} element={element} index={index} data-testid={`cart-item-${index % 10}`} />
               
              </Link>
            </div>
          ))
        ) : (
          localResult.map((element, index) => (
            <CartItem key={element.id} element={element} index={index} data-testid={`cart-item-${index % 10}`} />
          ))
        )}
      </div>
    </section>
  );
}

export default Carts;
