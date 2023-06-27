import styles from './loadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner} data-testid="loading" id="loadingSpiner">
      <img
        src="https://media.tenor.com/0JK1fHxqYGEAAAAi/loading.gif"
        alt="loading"
        className="loading"
      />
    </div>
  );
}
