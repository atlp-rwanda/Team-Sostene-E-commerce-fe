/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import axios from 'axios';
import orderStatusReducer, { getOrder } from '../redux/trackOrderSlice';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import store from '../../../redux/store';
import { ReactNode } from 'react';
import { useGetOrderStatus } from '../redux/hooks';

const initialState = {
  loading: false,
  message: '',
  error: '',
  data: {
    orders: [
      {
        id: '',
        status: '',
        products: [{ product: { id: '', image: '', name: '' }, quantity: 0 }],
        totalPrice: 0,
      },
    ],
  },
};
describe('Get cart data action test', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        orderStatus: orderStatusReducer,
      },
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('should dispatch getOrder and update state on success', async () => {
    const responseData = {
      message: 'order status found',
      data: {
        orders: [
          {
            id: '',
            status: '',
            products: [{ product: { id: '', image: '', name: '' }, quantity: 0 }],
            totalPrice: 0,
          },
        ],
      },
    };
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: responseData });

    await store.dispatch(getOrder({ token: 'TOKEN' }));

    const state = store.getState().orderStatus;
    expect(state.loading).toBe(false);
    expect(state.message).toBe(responseData.message);
    expect(state.error).toBe('');
    expect(state.data).toEqual(responseData.data);
    expect(mockAxios).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}orders`,
      expect.objectContaining({
        headers: { Authorization: `Bearer TOKEN` },
      })
    );
  });

  test('should dispatch getOrder and update state on error (500)', async () => {
    const errorResponse = {
      response: {
        status: 500,
        data: {
          message: undefined,
        },
      },
    };
    const mockAxios = vi.spyOn(axios, 'get').mockRejectedValueOnce(errorResponse);

    await store.dispatch(getOrder({ token: 'TOKEN' }));

    const state = store.getState().orderStatus;
    expect(state.loading).toBe(false);
    expect(state.message).toBe('');
    expect(state.error).toBe('Unknown Error');
    expect(state.data).toEqual(initialState.data);
    expect(mockAxios).toHaveBeenCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}orders`,
      expect.objectContaining({
        headers: { Authorization: `Bearer TOKEN` },
      })
    );
  });
});

describe('useGetOrderStatus', () => {
  test('should handle order status correctly', () => {
    const wrapper = (props: { children: ReactNode }) => (
      <Provider store={store}>{props.children}</Provider>
    );

    const { result } = renderHook(() => useGetOrderStatus(), { wrapper });

    act(() => {
      result.current.handleGetOrderStatus();
    });

    expect(result.current.result).toBeDefined();
  });
});
