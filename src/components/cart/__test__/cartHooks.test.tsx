/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from 'react-redux';
import store from '../../../redux/store'; // Import the actual Redux store
import { useAddToCart } from '../hooks';
import { act, renderHook } from '@testing-library/react';

describe('useAddToCart', () => {
  test('should handleAddToCart correctly', () => {
    const wrapper = (props: { children: any }) => (
      <Provider store={store}>{props.children}</Provider>
    );

    const { result } = renderHook(() => useAddToCart(), { wrapper });

    const id = '5866c875-9730-4a3b-b0db-0eb9d66f8123';

    act(() => {
      result.current.handleAddToCart(id);
    });

    expect(result.current.result).toBeDefined();
  });
});
