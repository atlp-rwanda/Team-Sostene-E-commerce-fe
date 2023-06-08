import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PreviewCard from './previewCard';

describe('PreviewCard', () => {
  it('renders PreviewCard component correctly', () => {
    const card = {
      productImages: [{ url: 'image-url-1' }, { url: 'image-url-2' }],
      id: '1',
      category: 'Category',
      ratings: 4,
      price: 10,
      bonus: 5,
      collectionId: 'collection-1',
      createdAt: '2023-05-28',
      expDate: '2023-06-30',
      expiredflag: false,
      name: 'Product 1',
      quantity: 10,
      details: 'Product details',
    };
    const { queryAllByText, getAllByTestId, getAllByAltText } = render(<PreviewCard card={card} />);

    expect(getAllByAltText('Icon')).toHaveLength(2);
    expect(queryAllByText('$10')).toHaveLength(1);
    expect(getAllByTestId('carouselId')).toHaveLength(1);
    expect(getAllByTestId('previewCardId')).toHaveLength(1);
  });
});
