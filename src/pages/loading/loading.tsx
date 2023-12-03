import styles from './loading.module.css';

function Loading(): JSX.Element {
  return (
    <span className={`${styles.loader}`}></span>
  );
}

export default Loading;
