import Slider from './Slider';

const items = [
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/007/535/204/non_2x/happy-summer-sale-web-banner-for-social-media-horizontal-poster-banner-space-area-and-background-free-vector.jpg',
    link: '#',
    alt: 'slide',
  },
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/007/535/188/original/happy-summer-sale-web-banner-for-social-media-horizontal-poster-banner-space-area-and-background-vector.jpg',
    link: '#',
    alt: 'slide1',
  },
  {
    image:
      'https://static.vecteezy.com/system/resources/previews/014/898/183/original/banner-spring-sale-beautiful-evening-landscape-the-yacht-floats-on-the-lake-river-mountains-and-water-sunset-sky-flowering-bushes-illustration-for-background-website-posters-flyers-vector.jpg',
    link: '#',
    alt: 'slide2',
  },
];

function SlideShow() {
  return <Slider items={items} interval={10000} />;
}

export default SlideShow;
