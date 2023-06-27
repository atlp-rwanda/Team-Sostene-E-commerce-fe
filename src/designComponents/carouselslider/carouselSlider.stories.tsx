import Carouselslider from './carouselslider';

const images = [
  { url: 'https://unsplash.com/photos/01_igFr7hd4' },
  { url: 'https://unsplash.com/photos/ndN00KmbJ1c' },
  { url: 'https://unsplash.com/photos/XykVSjPQJzQ' },
  { url: 'https://unsplash.com/photos/pHANr-CpbYM' },
  { url: 'https://unsplash.com/photos/mEZ3PoFGs_k' },
  { url: 'https://unsplash.com/photos/kVJdgGPSUSI' },
  { url: 'https://unsplash.com/photos/6j79Y9G3Dfo' },
];

export default {
  title: 'DesignComponents/carousel',
  component: Carouselslider,
};

export const Default = () => <Carouselslider images={images} />;
