import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import ProductPage from '../Product';
import { vi } from 'vitest';
import axios from 'axios';
import productReducer, { Product, getProduct } from '../redux/productSlice';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

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
  it('review should fail with status 500', async () => {
    const store = configureStore({
      reducer: productReducer,
    });
    const postSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error.',
        },
      },
    });
    const id = '66d5250c-158d-11ee-be56-0242ac120002';
    await store.dispatch(getProduct(id));
    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}products/${id}`);
  });
  it('should dispatch product action correctly', async () => {
    const store = configureStore({
      reducer: productReducer,
    });
    const postSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error.',
        },
      },
    });
    const id = '66d5250c-158d-11ee-be56-0242ac120002';
    await store.dispatch(getProduct(id));
    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}products/${id}`);
  });
  it('should dispatch product action correctly', async () => {
    const store = configureStore({
      reducer: productReducer,
    });
    const errorMessage = 'Some error message';
    const getSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          message: errorMessage,
        },
      },
    });
    const id = '66d5250c-158d-11ee-be56-0242ac120002';
    try {
      await store.dispatch(getProduct(id));
    } catch (error) {
      const rejectedValue = store.getState().error;
      expect(rejectedValue).toEqual(errorMessage);
    }
    expect(getSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}products/${id}`);
  });
  it('review should fail with status 500', async () => {
    const store = configureStore({
      reducer: productReducer,
    });
    const postSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error.',
        },
      },
    });
    const id = '66d5250c-158d-11ee-be56-0242ac120002';
    await store.dispatch(getProduct(id));
    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}products/${id}`);
  });
});
