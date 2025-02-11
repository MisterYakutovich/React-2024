import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Carts.css';
import CartItem from '../CartItem/CartItem';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import Checkbox from '../Checkbox/Checkbox';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}
export function extractIdFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

function Carts({ localResult, items }: CartsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname.includes('/item/');
  const handleClosePageItem = () => {
    if (location.pathname.includes('/item')) {
      navigate(-1);
    }
  };

  return (
    <section className="section-main">
      <div
        onClick={handleClosePageItem}
        className={`container ${isDetailPage ? 'container-small' : ''}`}
      >
        {items.length === 0 ? (
          <div>No items available</div>
        ) : localResult.length === 0 ? (
          items.map((element, index) => (
            <div key={element.id} className="cart-item-wrapper">
              {isDetailPage ? (
                <div className="cart-item">
                  <CartItem key={element.id} element={element} index={index} />
                </div>
              ) : (
                <>
                  <Checkbox element={element} />
                  <NavLink
                    key={element.id}
                    to={`/item/${extractIdFromUrl(element.url)}/`}
                    style={{ textDecoration: 'none' }}
                    className={({ isActive, isPending }) =>
                      isPending ? 'pending' : isActive ? 'active-linc' : ''
                    }
                  >
                    <CartItem
                      key={element.id}
                      element={element}
                      index={index}
                    />
                  </NavLink>
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
