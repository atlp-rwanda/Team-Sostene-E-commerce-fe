import axios from 'axios';
import { vi } from 'vitest';
import { addToCart } from '../redux/addToCartSlice';
import { configureStore } from '@reduxjs/toolkit';
import userAddToCartReducer from '../redux/addToCartSlice';

describe('addToCart', () => {
  test('should dispatch setCartData with the response data on successful API call', async () => {
    const responseData = {
      result: {
        products: [],
        total: 0,
      },
      message: 'Cart updated successfully',
    };
    const mockAxios = vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: responseData });
    const store = configureStore({
      reducer: userAddToCartReducer,
    });
    await store.dispatch(addToCart({ id: '123', token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}cart/123`,
      {},
      {
        headers: { Authorization: `Bearer TOKEN` },
      }
    );
  });
  test('should dispatch an Error 406', async () => {
    const errorMessage = 'Error occurred';
    const errorResponse = {
      response: {
        status: 406,
        data: {
          message: errorMessage,
        },
      },
    };
    const mockAxios = vi.spyOn(axios, 'post').mockRejectedValueOnce(errorResponse);
    const store = configureStore({
      reducer: userAddToCartReducer,
    });
    await store.dispatch(addToCart({ id: '123', token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}cart/123`,
      {},
      {
        headers: { Authorization: `Bearer TOKEN` },
      }
    );
  });
  test('should dispatch an Error 401', async () => {
    const errorMessage = 'Unauthorized';
    const errorResponse = {
      response: {
        status: 401,
        data: {
          message: errorMessage,
        },
      },
    };
    const mockAxios = vi.spyOn(axios, 'post').mockRejectedValueOnce(errorResponse);
    const store = configureStore({
      reducer: userAddToCartReducer,
    });
    await store.dispatch(addToCart({ id: '123', token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}cart/123`,
      {},
      {
        headers: { Authorization: `Bearer TOKEN` },
      }
    );
  });
  test('should dispatch an Error 500', async () => {
    const errorResponse = {
      response: {
        status: 500,
        data: {
          message: undefined,
        },
      },
    };
    const mockAxios = vi.spyOn(axios, 'post').mockRejectedValueOnce(errorResponse);
    const store = configureStore({
      reducer: userAddToCartReducer,
    });
    await store.dispatch(addToCart({ id: '123', token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}cart/123`,
      {},
      {
        headers: { Authorization: `Bearer TOKEN` },
      }
    );
  });
});
