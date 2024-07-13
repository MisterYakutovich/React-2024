import { NavLink, useLocation } from 'react-router-dom';
import './Carts.css';
import CartItem from '../CartItem/CartItem';
import { ArrSearchResult, PeopleArray } from '../../types/types';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}

function Carts({ localResult, items }: CartsProps) {
  const location = useLocation();
  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
  const isDetailPage = location.pathname.includes('/item/');
  return (
    <section className="section-main">
      <div className={`container ${isDetailPage ? 'container-small' : ''}`}>
        {localResult.length === 0
          ? items.map((i, index) => (
              <NavLink
                key={i.id}
                to={`/item/${extractIdFromUrl(i.url)}/`}
                style={{ textDecoration: 'none' }}
                className={({ isActive, isPending }) =>
                  isPending ? 'pending' : isActive ? 'active-linc' : ''
                }
              >
                <CartItem key={i.id} i={i} index={index} />
              </NavLink>
            ))
          : localResult.map((i, index) => (
              <CartItem key={i.id} i={i} index={index} />
            ))}
      </div>
    </section>
  );
}

export default Carts;
