import NotFoundSearch from '../../designComponents/notFoundSearch/notFoundSearch';
import styles from './page404.module.scss';
import { useNavigate } from 'react-router-dom';

function Page404() {
  const navigate = useNavigate();

  const handleReturnBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.page404}>
      <div className="homeSlides" data-testid="home">
        <NotFoundSearch reset={handleReturnBack} btnText={'Back'} />
      </div>
    </div>
  );
}

export default Page404;
