import { useEffect } from 'react';
import './Main.css';
import Loader from '../loading/Loader';
import Carts from '../PeopleCarts/Carts';
import { ArrSearchResult } from '../../types/types';
import { useGetPeopleQuery } from '../../redux/services/api_people';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setItemsCurrentPage } from '../../redux/slices/itemsCurrentPageSlice';

export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
}

function Main({ localResult }: PeopleProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.currentPage.currentPage
  );
  const { data, isLoading } = useGetPeopleQuery(`${currentPage}`);
  const items = useSelector((state: RootState) => state.itemsCurrentPage.items);

  useEffect(() => {
    if (data) {
      dispatch(setItemsCurrentPage(data.results));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Carts localResult={localResult} items={items} />
    </>
  );
}

export default Main;
