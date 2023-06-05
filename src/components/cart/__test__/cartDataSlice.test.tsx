import axios from 'axios';
import { vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import cartDataReducer from '../redux/cartDataSlice';
import { getCartData } from '../redux/cartDataSlice';

describe('Get cart data action test', () => {
  test('should dispatch getCartData', async () => {
    const responseData = {
      result: {
        products: [],
        total: 0,
      },
      message: 'Cart updated successfully',
    };
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });
    const store = configureStore({
      reducer: cartDataReducer,
    });
    await store.dispatch(getCartData({ token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}cart`, {
      headers: { Authorization: `Bearer TOKEN` },
    });
  });
  test('should dispatch an Error 401', async () => {
    const errorMessage = 'Error occurred';
    const errorResponse = {
      response: {
        status: 401,
        data: {
          message: errorMessage,
        },
      },
    };
    const mockAxios = vi.spyOn(axios, 'get').mockRejectedValueOnce(errorResponse);
    const store = configureStore({
      reducer: cartDataReducer,
    });
    await store.dispatch(getCartData({ token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}cart`, {
      headers: { Authorization: `Bearer TOKEN` },
    });
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
    const mockAxios = vi.spyOn(axios, 'get').mockRejectedValueOnce(errorResponse);
    const store = configureStore({
      reducer: cartDataReducer,
    });
    await store.dispatch(getCartData({ token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}cart`, {
      headers: { Authorization: `Bearer TOKEN` },
    });
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
    const mockAxios = vi.spyOn(axios, 'get').mockRejectedValueOnce(errorResponse);
    const store = configureStore({
      reducer: cartDataReducer,
    });
    await store.dispatch(getCartData({ token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}cart`, {
      headers: { Authorization: `Bearer TOKEN` },
    });
  });
});
