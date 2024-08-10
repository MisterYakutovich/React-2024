'use client';
import { useEffect, useState } from 'react';
import Seach from './Seach/Seach';
//import Main from './Main/Main';
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { ArrSearchResult, PeopleArray } from '../types/types';
//import Paginations from './Pagination/Paginations';
//import { useGetSearchQuery } from '../redux/services/api_people';

import { Provider, useDispatch, useSelector } from 'react-redux';

import { setCurrentPage } from '../redux/slices/currentPageSlice';

import { useRouter } from 'next/router';
import FlyoutItems from './FlyoutItems/FlyoutItems';
import Carts from './PeopleCarts/Carts';
import Loader from './Loader/Loader';

import { getPeople } from '../app/page';
import Paginations from './Pagination/Paginations';
import Themes from './Themes/Themes';
import ThemeProvider from '../context/ThemeProvider';
interface PageProps {
  data: PeopleArray[];
  totalPages: number;
  currentPage: number;
}
async function getSearch(name: string) {
  const response = await fetch(`https://swapi.dev/api/people?search=${name}`, {
    cache: 'no-store',
  });
  return response.json();
}

function Page({ data, totalPages, currentPage }: PageProps) {
  const [search, setSearch] = useState<string>('');
  const [peopleData, setPeopleData] = useState<PeopleArray[]>(data);
  const [localResultSearch, setlocalResultSearch] = useState<string>('');
  const [localResult, setLocalResult] = useState<ArrSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [search]);

  const handleEnter = (search: string) => {
    if (search.trim() === '') {
      localStorage.removeItem('key');
      localStorage.removeItem('search');
      setLocalResult([]);
      setlocalResultSearch('');
      setSearch('');
    } else {
      setSearch(search);
    }
  };
  if (loading) {
    return <Loader />;
  }
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
      </ThemeProvider>
    </>
  );
}

export default Page;
/*export async function getSearch(name:string){
  const response=await fetch(`https://swapi.dev/api/people?search=${name}`,{ cache: 'no-store' })
  return response.json();
};
function Page({data}:PageProps) {
 

  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.currentPage.currentPage
  );
  const selectedCharacters = useSelector(
    (state: RootState) => state.itemsDetails.selectedCharacters
  );
  const [, setShow] = useState<string>('index');
  const [personNameSearch, setPersonNameSearch] = useState<ArrSearchResult[]>(
    []
  );
  const [showFlyout, setShowFlyout] = useState(false);
  const [localResult, setLocalResult] = useState<ArrSearchResult[]>([]);
  const [search, setSearch] = useState<string>('');
  const [localResultSearch, setlocalResultSearch] = useState<string>('');
  const { data, isLoading } = useGetSearchQuery(search);

  const router = useRouter();

  useEffect(() => {
    setShowFlyout(selectedCharacters.length > 0);
  }, [selectedCharacters]);

  useEffect(() => {
    const page = parseInt((router.query.page as string) || '1', 10);
    dispatch(setCurrentPage(page));
  }, [router.query.page, dispatch]);
  useEffect(() => {
    const localData = localStorage.getItem('key');
    const localSearch = localStorage.getItem('search');
    const localResult = localData ? JSON.parse(localData) : [];
    const localResultSearch = localSearch ? JSON.parse(localSearch) : '';
    setLocalResult(localResult);
    setlocalResultSearch(localResultSearch);
  }, []);
  useEffect(() => {
    if (data  && search) {
      setLocalResult(data);
      setlocalResultSearch(search);
      setPersonNameSearch(data);
      localStorage.setItem('search', JSON.stringify(search));
      localStorage.setItem('key', JSON.stringify(data));
    
    }
  }, [data, search]);
  useEffect(() => {
    if (data && data.results && search) {
      setLocalResult(data.results);
      setlocalResultSearch(search);
      setPersonNameSearch(data.results);
      localStorage.setItem('search', JSON.stringify(search));
      localStorage.setItem('key', JSON.stringify(data.results));
    }
  }, [data, search]);

  const handleEnter = (search: string) => {
    if (search.trim() === '') {
      localStorage.removeItem('key');
      localStorage.removeItem('search');
      setLocalResult([]);
      setlocalResultSearch('');
      return;
    }
    setShow('search');
    setSearch(search);
  };

  const incrementPage = () => {
    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
    router.push(`?page=${nextPage}`);
  };

  const decrementPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    dispatch(setCurrentPage(prevPage));
    router.push(`?page=${prevPage}`);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ErrorBoundary>
     <>
        <Seach
          enterHandler={handleEnter}
          savedSearchLocal={localResultSearch}
        />
        <Carts items={data} localResult={localResult}/>
</>
        <Paginations nextPage={incrementPage} prevPage={decrementPage} />

        <Main data={data} personNameSearch={personNameSearch} localResult={localResult} />

        {showFlyout && <FlyoutItems />}
      </ErrorBoundary>
    </>
  );
}

export default Page;*/
