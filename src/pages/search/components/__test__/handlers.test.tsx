import { render, screen } from '@testing-library/react';
import Handler from '../Handler';
import store from '../../../../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('Handler', () => {
  const products = [
    {
      id: '321',
      category: 'avinci',
      collectionId: 'collection',
      createdAt: '',
      expDate: '',
      quantity: 2,
      bonus: 2,
      updatedAt: '',
      expiredflag: false,
      name: 'test',
      price: 200,
      productImages: [
        {
          url: '',
          id: '',
          productId: '',
          createdAt: '',
          updatedAt: '',
        },
      ],
    },
    {
      id: '3261',
      category: 'furnutures',
      collectionId: 'collection1',
      createdAt: '',
      expDate: '',
      quantity: 2,
      bonus: 2,
      updatedAt: '',
      expiredflag: false,
      name: 'test',
      price: 200,
      productImages: [
        {
          url: '',
          id: '',
          productId: '',
          createdAt: '',
          updatedAt: '',
        },
      ],
    },
  ];

  test('renders the title and product cards', () => {
    const title = 'Test Title';

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Handler title={title} products={products} />
        </Provider>
      </BrowserRouter>
    );

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href');
    });
  });
});
