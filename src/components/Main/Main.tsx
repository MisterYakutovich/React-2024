import { useEffect, useState } from 'react';
import './Main.css';
import { ArrSearchResult } from '../../Page';

import Loader from '../loading/Loader';
import Carts from '../carts/Carts';

export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
}
export interface PeopleArray {
  name: string;
  id: string;
  url: string;
}
function Main({ localResult }: PeopleProps) {
  const [items, setItems] = useState<PeopleArray[]>([]);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/?page=1')
      .then((res) => res.json())
      .then((result) => {
        setisLoaded(true);
        setItems(result.results);
      })
      .catch(() => {
        setisLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }
  return <Carts localResult={localResult} items={items} />;
}

export default Main;
