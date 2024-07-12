import { NavLink } from 'react-router-dom';
import { ArrSearchResult } from '../../Page';
import { PeopleArray } from '../Main/Main';
import CartItem from '../CartItem/CartItem';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}

function Carts({ localResult, items }: CartsProps) {
  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  return (
    <section className="section-main">
      <div className="container">
        {localResult.length === 0
          ? items.map((i, index) => (
              <NavLink
                key={i.id}
                to={`/${extractIdFromUrl(i.url)}/`}
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
