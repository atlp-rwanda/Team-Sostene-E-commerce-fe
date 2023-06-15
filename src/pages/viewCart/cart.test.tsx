import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import CartTable from './Cart';
import { vi } from 'vitest';
import store from '../../redux/store';

const handleGetCartMock = vi.fn();

describe('Testing CartTable', () => {
  test('should call handleGetCart', () => {
    vi.mock('./redux/hooks', () => ({
      useGetCart: () => ({
        result: { loading: false, data: { total: 0, products: [] } },
        handleGetCart: handleGetCartMock,
      }),
    }));

    render(
      <Provider store={store}>
        <CartTable />
      </Provider>
    );

    expect(handleGetCartMock).toHaveBeenCalled();
  });
});
