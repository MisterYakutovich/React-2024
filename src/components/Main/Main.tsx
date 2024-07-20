import { useEffect, useState } from 'react';
import './Main.css';
import Loader from '../loading/Loader';
import Carts from '../PeopleCarts/Carts';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import { useGetPeopleQuery } from '../../redux/services/api_people';

export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
  currentPage: number;
}

function Main({ localResult, currentPage }: PeopleProps) {
  const { data, isLoading } = useGetPeopleQuery(`${currentPage}`);
  const [items, setItems] = useState<PeopleArray[]>([]);
  useEffect(() => {
    if (data) {
      setItems(data.results);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return <Carts localResult={localResult} items={items} />;
}

export default Main;
