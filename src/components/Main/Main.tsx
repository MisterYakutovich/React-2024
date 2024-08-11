'use client';
import { useEffect, useState } from 'react';
import Seach from '../Seach/Seach';
import { ArrSearchResult, PeopleArray } from '../../types/types';
import FlyoutItems from '../FlyoutItems/FlyoutItems';
import Carts from '../PeopleCarts/Carts';
import Loader from '../Loader/Loader';
import Paginations from '../Pagination/Paginations';
import Themes from '../Themes/Themes';
import ThemeProvider from '../../context/ThemeProvider';
import { getPeople, getSearch } from '../../redux/services/api_people';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setItemsCurrentPage } from '../../redux/slices/itemsCurrentPageSlice';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface PageProps {
  data: PeopleArray[];
  totalPages: number;
  currentPage: number;
}

function Main({ data, totalPages, currentPage }: PageProps) {
  const [search, setSearch] = useState<string>('');
  const [peopleData, setPeopleData] = useState<PeopleArray[]>(data);
  const [localResultSearch, setlocalResultSearch] = useState<string>('');
  const [localResult, setLocalResult] = useState<ArrSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFlyout, setShowFlyout] = useState(false);
  const dispatch = useDispatch();
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemsDetails.selectedCharacters
  );

  // useEffect(() => {
  //   dispatch(setItemsCurrentPage(data));
  // }, [data, dispatch]);

  // useEffect(() => {
  //   setShowFlyout(selectedCharacters.length > 0);
  //  }, [selectedCharacters]);

  useEffect(() => {
    const localData = localStorage.getItem('key');
    const localSearch = localStorage.getItem('search');
    const localResult = localData ? JSON.parse(localData) : [];
    const localResultSearch = localSearch ? JSON.parse(localSearch) : '';
    if (localSearch) {
      setSearch(localResultSearch);
      setLocalResult(localResult);
      setPeopleData(localResult);
    } else {
      setPeopleData(data);
    }
    setLoading(false);
    setLocalResult(localResult);
    setlocalResultSearch(localResultSearch);
  }, [data]);

  useEffect(() => {
    if (search.trim()) {
      setLoading(true);
      getSearch(search).then((result) => {
        setPeopleData(result.results);
        localStorage.setItem('key', JSON.stringify(result.results));
        localStorage.setItem('search', JSON.stringify(search));
        setLoading(false);
      });
    } else if (!loading) {
      getPeople(currentPage).then((result) => {
        setPeopleData(result.results);
      });
    }
  }, [search, currentPage, dispatch, loading]);
  const handleEnter = (search: string) => {
    if (search.trim() !== '') {
      localStorage.removeItem('key');
      localStorage.removeItem('search');
      setLocalResult([]);
      setlocalResultSearch('');
      setSearch('');
    } else {
      setSearch(search);
    }
  };
  console.log(search);
  return (
    <>
      <ThemeProvider>
        <Themes />
        <Seach
          enterHandler={handleEnter}
          savedSearchLocal={localResultSearch}
        />

        <Paginations totalPages={totalPages} />
        <Carts items={peopleData} localResult={localResult} />
        {/*{showFlyout && <FlyoutItems />}*/}
      </ThemeProvider>
    </>
  );
}

export default Main;
