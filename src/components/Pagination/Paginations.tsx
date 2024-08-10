'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import styles from './Paginations.module.css';

interface PaginationsProps {
  totalPages: number;
}

function Paginations({ totalPages }: PaginationsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const prevPage = () => {
    if (currentPage > 1) {
      window.location.href = createPageURL(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      window.location.href = createPageURL(currentPage + 1);
    }
  };

  return (
    <div className={styles.navigation}>
      <button
        className={styles.button}
        onClick={prevPage}
        data-testid="previous-button"
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

      <div className={styles.button_arrow_right_number}>
        <h4>{currentPage}</h4>
      </div>

      <button
        data-testid="next-button"
        className={styles.button}
        onClick={nextPage}
        disabled={currentPage === 9}
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
    </div>
  );
}
export default Paginations;
