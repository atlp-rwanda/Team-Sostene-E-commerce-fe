import styles from './notFoundSearch.module.scss';

interface resetSearch {
  reset: () => void;
}
export default function NotFoundSearch(props: resetSearch) {
  const { reset } = props;
  return (
    <div className={styles.notFoundSearch}>
      <div className="container">
        <div className="imageLogo">
          <img src="./svgs/404Logo.svg" alt="404 Logo" className="logo" />
        </div>
        <h1 className="title">Not Found</h1>
        <div className="subTitle">
          Missed what you are looking for? Don’t worry! You can try again with another way!
        </div>
        <button data-testid="testIdResetBtn" className="btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
