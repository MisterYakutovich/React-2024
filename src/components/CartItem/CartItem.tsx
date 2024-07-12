import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../Main/Main';
export interface CartItemProps {
  i: PeopleArray;
  index: number;
}

function CartItem({ i, index }: CartItemProps) {
  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  return (
    <div key={i.id || index} className="card">
      <img
        className="card_img"
        src={`${URL_PERSON}${extractIdFromUrl(i.url)}${URL_EXTENSION}`}
        alt={i.name}
      />
      <p key={i.name} className="card_title">
        {i.name}
      </p>
    </div>
  );
}
export default CartItem;
