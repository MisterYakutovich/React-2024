import Page from '../components/Page';

export async function fetchInvoicesPages(): Promise<number> {
  const response = await fetch(`https://swapi.dev/api/people`, {
    cache: 'no-store',
  });
  const total = await response.json();
  return Math.ceil(total.count / 10);
}
export async function getPeople(page: number) {
  const response = await fetch(`https://swapi.dev/api/people?page=${page}`, {
    cache: 'no-store',
  });
  return response.json();
}

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
    <Page data={results} totalPages={totalPages} currentPage={currentPage} />
  );
}
