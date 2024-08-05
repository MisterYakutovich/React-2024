import { InferGetServerSidePropsType } from 'next';
import Page from '../Page';
import Themes from '../components/Themes/Themes';
import ThemeProvider from '../context/ThemeProvider';
import { wrapper } from '../redux/store';
import { getPeople } from '../redux/services/api_people';
import { useDispatch } from 'react-redux';
import { setItemsCurrentPage } from '../redux/slices/itemsCurrentPageSlice';
import { useEffect } from 'react';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const page = (context.query.page as string | undefined) || '1';
    const { data } = await store.dispatch(getPeople.initiate(page));
    return { props: { data } };
  }
);

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();
  const { results } = data;

  useEffect(() => {
    dispatch(setItemsCurrentPage(results));
  }, [data, dispatch]);

  return (
    <>
      <ThemeProvider>
        <Themes />
        <Page />
      </ThemeProvider>
    </>
  );
}
