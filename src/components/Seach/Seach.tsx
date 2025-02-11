import { useEffect, useState } from 'react';
import './Seach.css';
import ErrorButton from '../ErrorButton/ErrorButton';

export interface SearchProps {
  enterHandler: (search: string) => void;
  savedSearchLocal: string;
}
function Seach({ enterHandler, savedSearchLocal }: SearchProps) {
  const [search, setSearch] = useState<string>('');
  const [isSavedSearch, setisSavedSearch] = useState<boolean>(false);

  useEffect(() => {
    if (savedSearchLocal) {
      setSearch(savedSearchLocal);
      setisSavedSearch(true);
    }
  }, [savedSearchLocal]);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      enterHandler(search);
    }
  };
  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          className="input_search"
          type="text"
          value={isSavedSearch ? savedSearchLocal : search}
          onChange={(event) => {
            setSearch(event.target.value);
            setisSavedSearch(false);
          }}
          onKeyUp={handleEnter}
          placeholder="Enter the name of the person"
        />
        <button className="btn" onClick={() => enterHandler(search)}>
          Search
        </button>
        <ErrorButton />
      </div>
    </div>
  );
}

export default Seach;
