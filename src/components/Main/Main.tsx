import { useEffect } from 'react';

import Carts from '../PeopleCarts/Carts';
import { ArrSearchResult } from '../../types/types';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setItemsCurrentPage } from '../../redux/slices/itemsCurrentPageSlice';

export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
}

function Main({ localResult }: PeopleProps) {
  const dispatch = useDispatch<AppDispatch>();

  const items = useSelector((state: RootState) => state.itemsCurrentPage.items);

  useEffect(() => {
    if (items) {
      dispatch(setItemsCurrentPage(items));
    }
  }, [items, dispatch]);

  return (
    <>
      <Carts localResult={localResult} items={items} />
    </>
  );
}

export default Main;
