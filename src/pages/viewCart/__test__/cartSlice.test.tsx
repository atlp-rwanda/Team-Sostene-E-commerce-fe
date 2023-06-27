import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import axios from 'axios';
import cartDataReducer from '../redux/getCartSlice';
import { getCart } from '../redux/getCartSlice';
import store from '../../../redux/store';
import { useGetCart } from '../redux/hooks';
import { act, renderHook } from '@testing-library/react';
import { ReactNode } from 'react';

describe('Get cart data action test', () => {
  test('should dispatch getCart', async () => {
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
    await store.dispatch(getCart({ token: 'TOKEN' }));

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
    await store.dispatch(getCart({ token: 'TOKEN' }));

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
    await store.dispatch(getCart({ token: 'TOKEN' }));

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
    await store.dispatch(getCart({ token: 'TOKEN' }));

    expect(mockAxios).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}cart`, {
      headers: { Authorization: `Bearer TOKEN` },
    });
  });
});

describe('useGetCart', () => {
  test('should handleGetCart correctly', () => {
    const wrapper = (props: { children: ReactNode }) => (
      <Provider store={store}>{props.children}</Provider>
    );

    const { result } = renderHook(() => useGetCart(), { wrapper });

    act(() => {
      result.current.handleGetCart();
    });

    expect(result.current.result).toBeDefined();
  });
});
