import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleArray } from '../components/Main/Main';
import { URL_EXTENSION, URL_PERSON } from '../consts/api';

function PageItemCart() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [item, setItem] = useState<PeopleArray | null>(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((result) => {
        setItem(result);
        setLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        alert(error);
      });
  }, [id]);
  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  if (!item) {
    return <div>No data found.</div>;
  }

  return (
    <div className="card">
      <img
        className="card_img"
        src={`${URL_PERSON}${extractIdFromUrl(item.url)}${URL_EXTENSION}`}
        alt={item.name}
      />
      <p key={item.name} className="card_title">
        {item.name}
      </p>
    </div>
  );
}

export default PageItemCart;
