import React, { useEffect, useState } from 'react';
import './Main.css';
import { ArrSearchResult } from '../../Page';
import { URL_PERSON, URL_EXTENSION } from '../../consts/api';
import Loader from '../loading/Loader';

export interface PeopleProps {
  personNameSearch: ArrSearchResult[];
  localResult: ArrSearchResult[];
}
interface PeopleArray {
  name: string;
  id: string;
  url: string;
}
function Main({ localResult }: PeopleProps) {
  const [items, setItems] = useState<PeopleArray[]>([]);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/?page=1')
      .then((res) => res.json())
      .then((result) => {
        setisLoaded(true);
        setItems(result.results);
      })
      .catch(() => {
        setisLoaded(true);
      });
  }, []);
  function extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  if (!isLoaded) {
    return <Loader />;
  }
  return (
    <section className="section-main">
      <div className="container">
        {localResult.length === 0
          ? items.map((i, index) => (
              <div key={i.id || index} className="card">
                <img
                  className="card_img"
                  src={`${URL_PERSON}${extractIdFromUrl(i.url)}${URL_EXTENSION}`}
                  alt={i.name}
                />
                <p key={i.name} className="card_title">
                  {i.name}
                </p>
              </div>
            ))
          : localResult.map((i, index) => (
              <div key={i.id || index} className="card">
                <img
                  className="card_img"
                  src={`${URL_PERSON}${extractIdFromUrl(i.url)}${URL_EXTENSION}`}
                  alt={i.name}
                />
                <p key={i.name} className="card_title">
                  {i.name}
                </p>
              </div>
            ))}
      </div>
    </section>
  );
}

export default Main;
