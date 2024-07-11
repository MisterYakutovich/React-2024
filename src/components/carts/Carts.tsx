import { ArrSearchResult } from '../../Page';
import { URL_EXTENSION, URL_PERSON } from '../../consts/api';
import { PeopleArray } from '../Main/Main';

interface CartsProps {
  localResult: ArrSearchResult[];
  items: PeopleArray[];
}
function Carts({ localResult, items }: CartsProps) {
  console.log(items);
  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
  return (
    <section className="section-main">
      <div className="container">
        {localResult.length === 0
          ? items.map((i, index) => (
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
            ))
          : localResult.map((i, index) => (
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
            ))}
      </div>
    </section>
  );
}
export default Carts;
