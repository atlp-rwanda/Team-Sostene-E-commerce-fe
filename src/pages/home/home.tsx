import TopProducts from '../../components/Product/TopProducts';
import SlideShow from './components/slider/MainSlider';
import styles from './home.module.scss';

function Home() {
  return (
    <div className={styles.home}>
      <div className="homeSlides" data-testid="home">
        <SlideShow />
        <TopProducts />
      </div>
    </div>
  );
}

export default Home;
