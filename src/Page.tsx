import { useEffect, useState } from 'react';
import Seach from './components/Seach/Seach';
import Main from './components/Main/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ArrSearchResult } from './types/types';
import Paginations from './components/Pagination/Paginations';
import { useLocation, useNavigate } from 'react-router-dom';

function Page() {
  const [, setShow] = useState<string>('index');

  const [personNameSearch, setPersonNameSearch] = useState<ArrSearchResult[]>(
    []
  );
  const [localResult, setLocalResult] = useState<ArrSearchResult[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [, setSearch] = useState<string>('');

  const [localResultSearch, setlocalResultSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search, setCurrentPage]);
  useEffect(() => {
    const localData = localStorage.getItem('key');
    const localSearch = localStorage.getItem('search');
    const localResult = localData ? JSON.parse(localData) : [];
    const localResultSearch = localSearch ? JSON.parse(localSearch) : '';
    setLocalResult(localResult);
    setlocalResultSearch(localResultSearch);
  }, []);
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);
  const handleEnter = (search: string): void => {
    if (search.trim() === '') {
      localStorage.removeItem('key');
      localStorage.removeItem('search');
      setLocalResult([]);
      setlocalResultSearch('');
      return;
    }
    setLoading(true);
    setShow('search');
    search = encodeURIComponent(search);
    const url = `https://swapi.dev/api/people/?search=${search}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPersonNameSearch(data.results);
        setLoading(false);
        setLocalResult(data.results);
        setSearch(search),
          localStorage.setItem('search', JSON.stringify(search));
        localStorage.setItem('key', JSON.stringify(data.results));
      });
  };
  const incrementPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    navigate(`?page=${nextPage}`);
  };

  const decrementPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    setCurrentPage(prevPage);
    navigate(`?page=${prevPage}`);
  };
  console.log(currentPage);
  return (
    <>
      <ErrorBoundary>
        <Seach
          enterHandler={handleEnter}
          savedSearchLocal={localResultSearch}
        />
        <Paginations
          nextPage={incrementPage}
          prevPage={decrementPage}
          currentPage={currentPage}
        />
        <Main
          personNameSearch={personNameSearch}
          localResult={localResult}
          currentPage={currentPage}
        />
      </ErrorBoundary>
    </>
  );
}

export default Page;
