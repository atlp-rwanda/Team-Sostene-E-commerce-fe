import { render, screen, fireEvent } from '@testing-library/react';
import CartTable from './Cart';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { describe, expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constants';

vi.mock('axios');
const cartData = {
  products: [
    {
      product: {
        id: '1',
        name: 'Product 1',
        price: 10,
        image: 'image-url-1',
      },
      quantity: 2,
    },
    {
      product: {
        id: '2',
        name: 'Product 2',
        price: 15,
        image: 'image-url-2',
      },
      quantity: 1,
    },
  ],
  total: 35,
};

vi.mock('./redux/hooks', async () => {
  const actual = await vi.importActual('./redux/hooks');
  return {
    actual,
    useAppSelector: vi.fn(),
    useGetCart: vi.fn(() => ({
      handleGetCart: vi.fn(),
      result: { loading: false, data: cartData },
    })),
  };
});

describe('CartTable', () => {
  test('renders cart table with products', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartTable />
        </Provider>
      </BrowserRouter>
    );
    const product1Name = screen.getByText('Product 1');
    const product2Name = screen.getByText('Product 2');
    expect(product1Name).toBeInTheDocument();
    expect(product2Name).toBeInTheDocument();
    expect(screen.getByText('IMAGE')).toBeInTheDocument();
    expect(screen.getByText('SubTotal: $35')).toBeInTheDocument();
    expect(screen.getByText('Proceed To Checkout')).toBeInTheDocument();
    expect(screen.getByText('Cart Total')).toBeInTheDocument();
  });

  test('calls handleChangeQuantiySingle when quantity input is changed', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartTable />
        </Provider>
      </BrowserRouter>
    );
    const updateBtn = screen.getByText('Update Cart');
    fireEvent.click(updateBtn);
    const quantityInput = screen.getAllByRole('changeQuantity');
    quantityInput.forEach(async (input) => {
      expect(input).toBeInTheDocument();
      fireEvent.change(input, { target: { value: 1 } });
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining(`${BACKEND_URL}/cart/update/1`),
        expect.objectContaining({
          quantity: 1,
        }),
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer null',
          },
        })
      );
    });
  });
  test('calls handleDeleteItem when delete button is clicked', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartTable />
        </Provider>
      </BrowserRouter>
    );
    const updateBtn = screen.getByText('Update Cart');
    fireEvent.click(updateBtn);
    expect(screen.getByText('Clear All Items')).toBeInTheDocument();
    const deleteBnts = screen.getAllByText('Delete');
    expect(deleteBnts.length).toBeGreaterThan(0);
    deleteBnts.forEach(async (btn) => {
      fireEvent.click(btn);
      expect(screen.getAllByText('Loading...').length).toBeGreaterThan(0);
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining(`${BACKEND_URL}/cart/1`),
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer null',
          },
        })
      );
    });
  });

  test('Calls handleDoneWithUpdate, when clicks on done Btn', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CartTable />
        </Provider>
      </BrowserRouter>
    );
    const updateBtn = screen.getByText('Update Cart');
    fireEvent.click(updateBtn);
    const done = screen.getByText('Done');
    expect(done).toBeInTheDocument();
    fireEvent.click(done);
    expect(screen.getByText('Update Cart')).toBeInTheDocument();
  });
});
