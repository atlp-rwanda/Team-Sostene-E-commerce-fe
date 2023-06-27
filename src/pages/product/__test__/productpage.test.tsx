import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ProductPage from '../Product';
import { vi } from 'vitest';
import axios from 'axios';
import { Product } from '../redux/productSlice';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Product Page', () => {
  test('Render Main', () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        id: '6ac24373-0bc0-414b-92d2-d78f8ada8878',
        name: 'night product',
        price: 2000,
        category: 'night',
        expDate: '2050-09-09',
        bonus: 2,
        quantity: 11,
        collectionId: 'ccfc3ee1-20c8-4820-8e45-aa017cbc2d4c',
        expiredflag: false,
        createdAt: '2023-05-07T22:12:39.731Z',
        updatedAt: '2023-05-07T22:37:04.460Z',
        productImages: [
          {
            url: 'http://res.cloudinary.com/duuznxvqs/image/upload/v1683497559/aufmgscqotl08pszip2g.jpg',
          },
          {
            url: 'http://res.cloudinary.com/duuznxvqs/image/upload/v1683497559/mk9blkkqiniavhhgwoal.jpg',
          },
          {
            url: 'http://res.cloudinary.com/duuznxvqs/image/upload/v1683497559/nbgmy9fcgkjtg8iwtoc8.jpg',
          },
          {
            url: 'http://res.cloudinary.com/duuznxvqs/image/upload/v1683497559/qule1hzjgsrzvsdtm7br.jpg',
          },
        ],
      } as Product,
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPage />
        </Provider>
      </BrowserRouter>
    );
    expect(getByTestId('product-page')).toBeInTheDocument();
  });
  test('Render Main with no images', () => {
    vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        id: '6ac24373-0bc0-414b-92d2-d78f8ada8878',
        name: 'night product',
        price: 2000,
        category: 'night',
        expDate: '2050-09-09',
        bonus: 2,
        quantity: 11,
        collectionId: 'ccfc3ee1-20c8-4820-8e45-aa017cbc2d4c',
        expiredflag: false,
        createdAt: '2023-05-07T22:12:39.731Z',
        updatedAt: '2023-05-07T22:37:04.460Z',
      } as Product,
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPage />
        </Provider>
      </BrowserRouter>
    );
    expect(getByTestId('product-page')).toBeInTheDocument();
  });
  test('Render Main with error', () => {
    vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Error',
        },
      },
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPage />
        </Provider>
      </BrowserRouter>
    );
    expect(getByTestId('product-page')).toBeInTheDocument();
  });
  test('Render Main with error', () => {
    vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          message: undefined,
        },
      },
    });
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPage />
        </Provider>
      </BrowserRouter>
    );
    expect(getByTestId('product-page')).toBeInTheDocument();
  });
});
