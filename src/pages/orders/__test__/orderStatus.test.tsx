import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Orders from '../trackOrder';
import { vi } from 'vitest';
import store from '../../../redux/store';

const handleGetOrderStatusMock = vi.fn();

describe('Testing Orders component', () => {
  test('should call handleGetOrderStatus', () => {
    vi.mock('../redux/hooks', () => ({
      useGetOrderStatus: () => ({
        result: { loading: false, data: { orders: [] } },
        handleGetOrderStatus: handleGetOrderStatusMock,
      }),
    }));

    render(
      <Provider store={store}>
        <Router>
          <Orders />
        </Router>
      </Provider>
    );

    expect(handleGetOrderStatusMock).toHaveBeenCalled();
  });
});
