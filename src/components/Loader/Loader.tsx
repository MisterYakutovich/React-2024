import styles from './Loader.module.css';

function Loader() {
  return (
    <>
      <span className={styles.loader} role="status"></span>
    </>
  );
}

export default Loader;
