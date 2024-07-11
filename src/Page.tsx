import { useEffect, useState } from 'react';
import Seach from './components/Seach/Seach';
import Main from './components/Main/Main';

export interface ArrSearchResult {
  url: string;
  name: string;
  id: string;
}
function Page() {
  const [, setShow] = useState<string>('index');
  const [personNameSearch, setPersonNameSearch] = useState<ArrSearchResult[]>(
    []
  );
  const [localResult, setLocalResult] = useState<ArrSearchResult[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [, setSearch] = useState<string>('');
  const [localResultSearch, setlocalResultSearch] = useState<string>('');

  useEffect(() => {
    const localData = localStorage.getItem('key');
    const localSearch = localStorage.getItem('search');
    const localResult = localData ? JSON.parse(localData) : [];
    const localResultSearch = localSearch ? JSON.parse(localSearch) : '';
    setLocalResult(localResult);
    setlocalResultSearch(localResultSearch);
  }, []);

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
  return (
    <>
      <Seach enterHandler={handleEnter} savedSearchLocal={localResultSearch} />
      <Main personNameSearch={personNameSearch} localResult={localResult} />
    </>
  );
}

export default Page;
