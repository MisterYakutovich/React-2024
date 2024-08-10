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
export async function getSearch(name: string) {
  const response = await fetch(`https://swapi.dev/api/people?search=${name}`, {
    cache: 'no-store',
  });
  return response.json();
}
