import styles from './notFoundSearch.module.scss';

interface resetSearch {
  reset: () => void;
  btnText: string;
  component?: boolean;
}
export default function NotFoundSearch(props: resetSearch) {
  const { reset, btnText, component } = props;
  return (
    <div className={styles.notFoundSearch}>
      <div className={component ? 'container component' : 'container'} data-testid="404Page">
        <div className="imageLogo">
          <img src="/svgs/404Logo.svg" alt="404 Logo" className="logo" />
        </div>
        <h1 className="title">Not Found</h1>
        <div className="subTitle">
          Missed what you are looking for? Don’t worry! You can try again with another way!
        </div>
        <button data-testid="testIdResetBtn" className="btn" onClick={reset}>
          {btnText}
        </button>
      </div>
    </div>
  );
}
