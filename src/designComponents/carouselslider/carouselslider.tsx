import styles from './carouselslider.module.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface propsDeails {
  images: { url: string }[];
}
export default function Carouselslider(props: propsDeails) {
  const { images } = props;

  return (
    <Carousel className={styles.carouselslider}>
      {images &&
        images.map((img, idx) => {
          return (
            <div className="SingleImage" key={idx}>
              <img src={img.url} alt="single Slide" className="imageSlide" />
            </div>
          );
        })}
    </Carousel>
  );
}
