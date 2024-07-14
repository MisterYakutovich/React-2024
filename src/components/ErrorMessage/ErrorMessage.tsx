import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorMessage(): ReactNode {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <p>Error page</p>
      <button onClick={handleClick}>Go back to search</button>
    </>
  );
}
