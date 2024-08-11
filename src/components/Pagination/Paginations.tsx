import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from '@remix-run/react';
import styles from './Paginations.module.css';


interface PaginationsProps {
  totalPages: number;
}

function Paginations({ totalPages }: PaginationsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  
  const currentPage = Number(searchParams.get('page')) || 1;
  const prevPage = () => {
    if (currentPage > 1) {
      const page = currentPage - 1;
      params.set('page', page.toString());
      setSearchParams(params.toString());
    }
};
const nextPage = () => {
  if (currentPage < totalPages) {
    const page = currentPage + 1;
    params.set('page', page.toString());
    setSearchParams(params.toString());
  }
};

  return (
    <div className={styles.navigation}>
      <Link
         to={`?page=${currentPage - 1}`}>
  <button
        className={styles.button}
        onClick={prevPage}
        data-testid="previous-button"
        disabled={currentPage ===1}
      >
        <div className={styles.two}>
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.98242 10.7852L0.949219 6.08789V4.98438L9.98242 0.287109V1.625L2.47266 5.53125L9.98242 9.44727V10.7852Z"
              fill="#CDCDCD"
            />
          </svg>
        </div>
      </button>
</Link>
      <div className={styles.button_arrow_right_number}>
        <h4>{currentPage}</h4>
      </div>

      <Link
       to={`?page=${currentPage + 1}`}>
         <button
        data-testid="next-button"
        className={styles.button}
        onClick={nextPage}
        disabled={currentPage === totalPages}
         
      >
        <div className={styles.two}>
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.04102 6.08789L0.0078125 10.7852V9.44727L7.51758 5.53125L0.0078125 1.625V0.287109L9.04102 4.98438V6.08789Z"
              fill="#292929"
            />
          </svg>
        </div>
        </button>
      </Link>
    </div>
  );
}
export default Paginations;
 