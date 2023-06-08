import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardItem from './cardItem';

const product = {
  productImages: [{ url: 'image-url' }],
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
};

describe('card item', () => {
  it('renders card item', () => {
    const { getByText, getAllByAltText, getAllByRole, getAllByTestId } = render(
      <CardItem product={product} />
    );

    expect(getAllByAltText('Delete icon')).toHaveLength(2);
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images.length).toBeGreaterThan(2);
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
    fireEvent.click(getByText('Product 1'));

    expect(getAllByTestId('cardItemId')).toHaveLength(1);
  });
});
