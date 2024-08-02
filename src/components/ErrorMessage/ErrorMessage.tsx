import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function ErrorMessage(): ReactNode {
  const router = useRouter();
  console.log(router);
  const handleClick = () => {
    router.push('/');
  };

  return (
    <>
      <p>Error page</p>
      <button onClick={handleClick}>Go back to search</button>
    </>
  );
}
