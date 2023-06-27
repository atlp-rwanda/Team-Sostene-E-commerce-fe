import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Carouselslider from './carouselslider';

const images = [{ url: 'image-url-1' }, { url: 'image-url-2' }, { url: 'image-url-3' }];

describe('Carouselslider', () => {
  it('renders Carousel component correctly with images', () => {
    const { getAllByRole } = render(<Carouselslider images={images} />);
    const imgs = getAllByRole('img');
    expect(imgs.length).toBeGreaterThan(2);
    imgs.forEach((image) => {
      expect(image).toHaveAttribute('src');
    });
  });
});
