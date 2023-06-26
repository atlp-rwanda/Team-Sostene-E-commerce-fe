import { vi } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SellerItems from '../sellerItems';
import { render, screen } from '@testing-library/react';
import store from '../../../../../redux/store';

vi.mock('../../../../../redux/hooks');

describe('testing errors', function () {
  it('should test in case of errors', function () {
    const mockProducts = {
      product: null,
    };
    const mockLoading = false;
    const mockErrors = 'failed to fetch';
    (useAppSelector as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: mockLoading,
      errors: mockErrors,
    });
    (useAppDispatch as jest.Mock).mockReturnValue(vi.fn());
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SellerItems />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('failed to fetch')).toBeInTheDocument();
  });
});
