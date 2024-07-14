import { useEffect, useState } from 'react';
import './Main.css';
import Loader from '../loading/Loader';
import Carts from '../Carts/Carts';
import { ArrSearchResult, PeopleArray } from '../../types/types';

export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
  currentPage: number;
}

function Main({ localResult, currentPage }: PeopleProps) {
  const [items, setItems] = useState<PeopleArray[]>([]);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((res) => res.json())
      .then((result) => {
        setisLoaded(true);
        setItems(result.results);
      })
      .catch(() => {
        setisLoaded(true);
      });
  }, [currentPage]);

  if (!isLoaded) {
    return <Loader />;
  }

  return <Carts localResult={localResult} items={items} />;
}

export default Main;
