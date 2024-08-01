//import Main from '@/src/components/home/Home';
import type { InferGetServerSidePropsType } from 'next';

import { wrapper } from '../redux/store';
import { getPeople } from '../redux/services/api_people';
import Page from '../Page';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const { page } = context.query;
  
      try {
        const { data1 } = await store.dispatch(
          getPeople.initiate({ page: Number(page) })
        ).unwrap(); // Используем unwrap для получения данных
        
        return { props: { data1: data1 } }; // Теперь data1 будет иметь правильный тип
      } catch (error) {
        // Обработка ошибок
        console.error('Failed to fetch people:', error);
        return { props: { data1: [] } // Или другое значение по умолчанию
      }
    }
}
  );

export default function Home({
  data1,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Page data1={data1} />;
}
