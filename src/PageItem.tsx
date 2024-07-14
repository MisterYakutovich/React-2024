import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Main from './components/Main/Main';

function PageItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage1, setCurrentPage1] = useState<number>(1);
  const [currentItem, setCurrentItem] = useState<number>(
    parseInt(id || '1', 10)
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    const item = parseInt(params.get('item') || id || '1', 10);
    setCurrentPage1(page);
    setCurrentItem(item);
  }, [location.search, id]);

  const handleClick = () => {
    navigate(`?page=${currentPage1}&item=${currentItem}`);
  };
  return (
    <>
      <Main personNameSearch={[]} localResult={[]} currentPage={1} />
      <Outlet context={handleClick} />
    </>
  );
}
export default PageItem;
