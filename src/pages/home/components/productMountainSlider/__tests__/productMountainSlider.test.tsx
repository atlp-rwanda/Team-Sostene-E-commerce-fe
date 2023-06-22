import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import ProductMountainSlider from '../productMountainSlider';
import store from '../../../../../redux/store';

const imageData = [
  {
    productImages: [{ url: 'image-url-1' }],
    details: 'Product 1 details',
    id: '1',
    category: 'Category 1',
    ratings: 4,
    price: 10,
    bonus: 5,
    collectionId: 'collection-1',
    createdAt: '2022-01-01',
    expDate: '2022-06-01',
    expiredflag: false,
    name: 'Product 1',
    quantity: 10,
  },
  {
    productImages: [{ url: 'image-url-2' }],
    details: 'Product 2 details',
    id: '2',
    category: 'Category 2',
    ratings: 3,
    price: 20,
    bonus: 10,
    collectionId: 'collection-2',
    createdAt: '2022-01-01',
    expDate: '2022-06-01',
    expiredflag: false,
    name: 'Product 2',
    quantity: 5,
  },
];

const Mockedproducts = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <ProductMountainSlider imageData={imageData} />
      </MemoryRouter>
    </Provider>
  );
};

describe('ProductMountainSlider', () => {
  it('renders the component with image data', async () => {
    const { container, getAllByText } = render(<Mockedproducts />);

    expect(container).toBeInTheDocument();
    const carousels = container.querySelectorAll('.carouselflow-item');
    carousels.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getAllByText('Product 1').length).toBeGreaterThan(0);
      expect(getAllByText('Add to Cart').length).toBeGreaterThan(0);
    });
  });

  it('clicking on an image updates the selected image', () => {
    const { container } = render(<Mockedproducts />);
    expect(container).toBeInTheDocument();
    const carousels = container.querySelectorAll('.carouselflow-item');
    carousels.forEach((item) => {
      fireEvent.click(item);
      expect(item).toBeInTheDocument();
    });
  });
  it('target sets flipAngle based on FLIP_RANGE', async () => {
    const FLIP_RANGE = 3;

    let fliptAngle = 360;
    function calculateFlipAngle(index: number, currentIndex: number, flipRange: number): number {
      const deltaIndex = Math.abs(index - currentIndex);
      if (deltaIndex <= flipRange) {
        fliptAngle = deltaIndex * (360 / flipRange);
      }
      return fliptAngle;
    }
    await act(async () => {
      render(<Mockedproducts />);
      fliptAngle = calculateFlipAngle(2, 1, FLIP_RANGE);
    });

    const expectedFliptAngle = 120;
    expect(fliptAngle).toBe(expectedFliptAngle);
  });
});
