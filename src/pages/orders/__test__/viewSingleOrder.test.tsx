import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { setToken } from '../../../redux/slices/tokenSlice';
import ViewSingleOrder from '../viewSingleOrder';
import axios from 'axios';
import { vi } from 'vitest';

describe('testing get single order', () => {
  test('Should render single order component', () => {
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: {
          products: [],
        },
      },
    });
    store.dispatch(setToken('initialTokenValue'));
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ViewSingleOrder />
        </BrowserRouter>
      </Provider>
    );
    const component = getByTestId('single-order');
    expect(mockAxios).toBeCalled();
    expect(component).toBeInTheDocument();
  });
});
