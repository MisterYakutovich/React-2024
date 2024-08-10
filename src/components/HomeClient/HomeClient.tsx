'use client';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { PeopleArray } from '../../types/types';
import Main from '../Main/Main';

interface HomeClientProps {
  data: PeopleArray[];
  totalPages: number;
  currentPage: number;
}

function HomeClient({ data, totalPages, currentPage }: HomeClientProps) {
  return (
    <Provider store={store}>
      <Main data={data} totalPages={totalPages} currentPage={currentPage} />
    </Provider>
  );
}

export default HomeClient;
