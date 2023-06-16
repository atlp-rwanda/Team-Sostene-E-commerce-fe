import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardItem from './cardItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

function products(id: string) {
  const product = {
    productImages: [{ url: 'image-url' }],
    id,
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
  return product;
}
const MockcontainerError = () => {
  const productTwo = products('2');
  return (
    <Provider store={Demostore}>
      <CardItem product={productTwo} />
    </Provider>
  );
};

const MockcontainerNull = () => {
  const productTwo = products('3');
  return (
    <Provider store={Demostore}>
      <CardItem product={productTwo} />
    </Provider>
  );
};
const Demostore = configureStore({
  reducer: function (state = '') {
    return state;
  },
});

const Mockcontainer = () => {
  const productTwo = products('1');
  return (
    <Provider store={Demostore}>
      <CardItem product={productTwo} />
    </Provider>
  );
};

describe('card item', () => {
  it('renders card item', () => {
    const { getByText, getAllByAltText, getAllByRole, getAllByTestId } = render(<Mockcontainer />);
    expect(getAllByAltText('Delete icon')).toHaveLength(2);
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images.length).toBeGreaterThan(1);
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
    fireEvent.click(getByText('Product 1'));

    expect(getAllByTestId('cardItemId')).toHaveLength(1);
  });
  it('renders card item', () => {
    const { getByText, getAllByAltText, getAllByRole, getAllByTestId } = render(<Mockcontainer />);
    expect(getAllByAltText('Delete icon')).toHaveLength(2);
    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images.length).toBeGreaterThan(1);
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
    fireEvent.click(getByText('Product 1'));
    expect(getAllByTestId('cardItemId')).toHaveLength(1);
  });
});

describe('card item error', () => {
  const testCases = [
    { name: 'renders card item', component: <MockcontainerError /> },
    { name: 'renders card item 2', component: <MockcontainerNull /> },
  ];

  testCases.forEach(({ name, component }) => {
    it(name, () => {
      const { getByText } = render(component);
      expect(getByText('$10')).toBeInTheDocument();
    });
  });
});
