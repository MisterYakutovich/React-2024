import PageItemCartClient from '../../src/components/PageItemCartClient/PageItemCartClient';
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
export interface PersonDetails {
  name: string;
  id: string;
  url: string;
  birth_year: string;
  height: string;
  eye_color: string;
  mass: string;
  edited: string;
  created: string;
}
async function getDetailsPeople(
  id: string | undefined
): Promise<PersonDetails> {
  const response = await fetch(`https://swapi.dev/api/people/${id}`, {
    cache: 'no-store',
  });
  return response.json();
}
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const details = await getDetailsPeople(params.id);

  return json({ details });
};

export default function PageItemCart() {
  const { details } = useLoaderData<typeof loader>();
  console.log(details);
  return <PageItemCartClient details={details} />;
}

/*export interface Props {
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
}*/
