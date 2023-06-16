import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from '../Search';
import { vi } from 'vitest';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = () => {
    return { query: 'shoes' };
  };
  return {
    ...(actual as object),
    useParams: () => navigate,
  };
});

describe('Testing Search Component', () => {
  test('Testing search', () => {
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValue({
      response: {
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
      },
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    expect(mockAxios).toBeCalled();
  });
  test('Testing search with empty [] ', () => {
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValue({
      response: {
        data: {
          products: [],
        },
      },
    });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    expect(mockAxios).toBeCalled();
  });
});
