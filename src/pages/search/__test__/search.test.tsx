import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from '../Search';
import { vi } from 'vitest';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { searchProduct } from '../redux/searchSlice';

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
  it('review should fail with status 500', async () => {
    const store = configureStore({
      reducer: searchReducer,
    });
    const postSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error.',
        },
      },
    });
    // const id = '66d5250c-158d-11ee-be56-0242ac120002'
    const query = 'any';
    await store.dispatch(searchProduct(query));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`
    );
  });
  it('should dispatch search action correctly', async () => {
    const store = configureStore({
      reducer: searchReducer,
    });
    const postSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error.',
        },
      },
    });
    const query = 'any';
    // const id = '66d5250c-158d-11ee-be56-0242ac120002'
    await store.dispatch(searchProduct(query));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`
    );
  });
  it('should dispatch search action correctly', async () => {
    const store = configureStore({
      reducer: searchReducer,
    });
    const errorMessage = 'Some error message';
    const getSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          message: errorMessage,
        },
      },
    });
    const query = 'any';
    try {
      await store.dispatch(searchProduct(query));
    } catch (error) {
      const rejectedValue = store.getState().error;
      expect(rejectedValue).toEqual(errorMessage);
    }
    expect(getSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`
    );
  });
  it('review should fail with status 500', async () => {
    const store = configureStore({
      reducer: searchReducer,
    });
    const postSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error.',
        },
      },
    });
    const query = 'any';
    await store.dispatch(searchProduct(query));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`
    );
  });
});
