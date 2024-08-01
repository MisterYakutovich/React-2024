//import Main from '@/src/components/home/Home';
import type { InferGetServerSidePropsType } from 'next';


import { wrapper } from '../redux/store';
import { getPeople } from '../redux/services/api_people';
import Page from '../Page';



export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.query;
    const { data1 } = await store.dispatch(
        getPeople.initiate({ page: Number(page) })
    );
    return { props: { data1 } };
  }
);

export default function Home({
  data1,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Page data1={data1} />;
}