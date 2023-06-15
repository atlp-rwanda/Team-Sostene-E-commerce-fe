import TopProducts from '../../components/Product/TopProducts';
import HomeCards from './components/IntroCards/HomeCards';
import HomeParallax from './components/parallax/homeParallax';
import styles from './home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
      <div className="homeSlides" data-testid="home">
        <HomeParallax />
        <HomeCards />
        <TopProducts />
      </div>
    </div>
  );
}

export default Home;
