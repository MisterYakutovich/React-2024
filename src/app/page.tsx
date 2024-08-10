import { fetchInvoicesPages, getPeople } from '../redux/services/api_people';
import HomeClient from '../components/HomeClient/HomeClient';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages();

  const data = await getPeople(currentPage);

  const { results } = data;

  return (
    <HomeClient
      data={results}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
