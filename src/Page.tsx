import { useEffect, useState } from 'react';
import Seach from './components/Seach/Seach';
import Main from './components/Main/Main';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ArrSearchResult, PeopleArray } from './types/types';
import Paginations from './components/Pagination/Paginations';
//import { useLocation, useNavigate } from 'react-router-dom';
import { useGetSearchQuery } from './redux/services/api_people';
import Loader from './components/loading/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { setCurrentPage } from './redux/slices/currentPageSlice';
import FlyoutItems from './components/FlyoutItems/FlyoutItems';

interface PageProps {
  data1: PeopleArray[];
}
function Page() {
 
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

  //const location = useLocation();
  //const navigate = useNavigate();
  useEffect(() => {
    setShowFlyout(selectedCharacters.length > 0);
  }, [selectedCharacters]);
  // useEffect(() => {
  //  const params = new URLSearchParams(location.search);
  //  const page = parseInt(params.get('page') || '1', 10);
  //   dispatch(setCurrentPage(page));
  // }, [location.search, dispatch]);
  useEffect(() => {
    const localData = localStorage.getItem('key');
    const localSearch = localStorage.getItem('search');
    const localResult = localData ? JSON.parse(localData) : [];
    const localResultSearch = localSearch ? JSON.parse(localSearch) : '';
    setLocalResult(localResult);
    setlocalResultSearch(localResultSearch);
  }, []);

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
    // navigate(`?page=${nextPage}`);
  };

  const decrementPage = () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    dispatch(setCurrentPage(prevPage));
    // navigate(`?page=${prevPage}`);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <ErrorBoundary>
        <Seach
          enterHandler={handleEnter}
          savedSearchLocal={localResultSearch}
        />
        <Paginations nextPage={incrementPage} prevPage={decrementPage} />
        <Main personNameSearch={personNameSearch} localResult={localResult} />
        {showFlyout && <FlyoutItems />}
      </ErrorBoundary>
    </>
  );
}

export default Page;
