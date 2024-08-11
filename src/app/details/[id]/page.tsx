import { Metadata } from 'next';
import PageItemCartClient from '../../../components/PageItemCartClient/PageItemCartClient';

async function getDetailsPeople(id: string) {
  const response = await fetch(`https://swapi.dev/api/people/${id}`, {
    cache: 'no-store',
  });
  return response.json();
}
export interface Props {
  params: {
    id: string;
  };
}
export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  return {
    title: id,
  };
}
export default async function PageItemCart({ params: { id } }: Props) {
  const details = await getDetailsPeople(id);

  return <PageItemCartClient details={details} />;
}
