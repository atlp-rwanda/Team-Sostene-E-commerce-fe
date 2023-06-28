import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { vi } from 'vitest';
import Categories from '../Categories';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = () => {
    return { cat: 'shoes' };
  };
  return {
    ...(actual as object),
    useParams: () => navigate,
  };
});

describe('Testing render of categories', () => {
  test('Testing when all is well', () => {
    const spyAxios = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        products: [
          {
            id: '321',
            category: '',
            collectionId: '',
            createdAt: '',
            expDate: '',
            quantity: 2,
            bonus: 2,
            updatedAt: '',
            expiredflag: false,
            name: 'test',
            price: 200,
            productImages: [
              {
                url: '',
                id: '',
                productId: '',
                createdAt: '',
                updatedAt: '',
              },
            ],
          },
        ],
      },
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Categories />
        </Provider>
      </BrowserRouter>
    );
    const min = screen.getByTestId('min');
    const max = screen.getByTestId('max');
    fireEvent.change(min, { target: { value: '0' } });
    fireEvent.change(max, { target: { value: '10000' } });
    expect(spyAxios).toBeCalled();
  });
  test('Testing when there is 0 products', () => {
    const spyAxios = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        products: [],
      },
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Categories />
        </Provider>
      </BrowserRouter>
    );
    const min = screen.getByTestId('min');
    const max = screen.getByTestId('max');
    fireEvent.change(min, { target: { value: '0' } });
    fireEvent.change(max, { target: { value: '10000' } });
    expect(spyAxios).toBeCalled();
  });
  test('Testing when there is an error', () => {
    const spyAxios = vi.spyOn(axios, 'get').mockRejectedValueOnce({});
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Categories />
        </Provider>
      </BrowserRouter>
    );
    const min = screen.getByTestId('min');
    const max = screen.getByTestId('max');
    fireEvent.change(min, { target: { value: '0' } });
    fireEvent.change(max, { target: { value: '10000' } });
    expect(spyAxios).toBeCalled();
  });
});
