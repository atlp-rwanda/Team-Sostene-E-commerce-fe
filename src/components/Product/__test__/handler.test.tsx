import axios from 'axios';
import { PRODUCT, fetchTopProducts } from '../redux/getTopProductsSlice';
import { vi } from 'vitest';
import productCategoryReducer from '../redux/getTopProductsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import Handler from '../Handler';
import { BrowserRouter } from 'react-router-dom';
import { Rating, RatingStars } from '../ProductCard';

describe('Testing Handler And Slice', () => {
  test('clicking left and right buttons', () => {
    const mockProducts: PRODUCT[] = [
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
      {
        id: '123',
        category: '',
        collectionId: '',
        createdAt: '',
        expDate: '',
        quantity: 2,
        bonus: 2,
        updatedAt: '',
        expiredflag: true,
        name: 'test',
        productImages: [
          {
            url: '',
            id: '',
            productId: '',
            createdAt: '',
            updatedAt: '',
          },
        ],
        price: 200,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollTo = function scrollTo() {};
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Handler title="Test Title" products={mockProducts} />
        </BrowserRouter>
      </Provider>
    );
    const leftButton = screen.getByTestId('left');
    const rightButton = screen.getByTestId('right');

    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();

    fireEvent.click(leftButton);
    fireEvent.click(rightButton);
  });
});

describe('productSlice', () => {
  test('testing fetchTopProducts', async () => {
    const data = {
      code: 200,
      message: 'search list',
      products: [
        {
          id: '5866c875-9730-4a3b-b0db-0eb9d66f8123',
          name: 'Demo Products',
          price: 3000,
          category: 'Drinks',
          expDate: '01-07-2023',
          bonus: 10,
          quantity: 10,
          collectionId: '73fe79bd-3675-48a6-9dbe-f7ac855a5590',
          expiredflag: true,
          createdAt: '2023-05-02T16:05:53.580Z',
          updatedAt: '2023-05-07T23:38:16.701Z',
          productImages: [],
        },
      ],
    };
    const getSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      status: 200,
      data,
    });
    const store_two = configureStore({
      reducer: productCategoryReducer,
    });
    await store_two.dispatch(fetchTopProducts());
    expect(getSpy).toBeCalled();
  });
  test('testing fetchTopProducts with error', async () => {
    const postSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'error',
        },
      },
    });
    const store_two = configureStore({
      reducer: productCategoryReducer,
    });
    await store_two.dispatch(fetchTopProducts());
    expect(postSpy).toBeCalled();
  });
  test('testing fetchTopProducts with error', async () => {
    const postSpy = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          message: undefined,
        },
      },
    });
    const store_two = configureStore({
      reducer: productCategoryReducer,
    });
    await store_two.dispatch(fetchTopProducts());
    expect(postSpy).toBeCalled();
  });
});

describe('Testing Stars', () => {
  test('Stars', () => {
    render(<RatingStars rating={2} />);
    const stars = screen.getAllByTestId('stars');
    expect(stars[0]).toBeInTheDocument();
  });
  test('Stars', () => {
    render(<RatingStars rating={2.5} />);
    const stars = screen.getAllByTestId('stars');
    expect(stars[0]).toBeInTheDocument();
  });
  test('Testing rating function', () => {
    vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        rating: 5,
      },
    });
    const DemoComponent = () => {
      return <p data-testid="star">{Rating({ id: '12345' })}</p>;
    };
    const { getByTestId } = render(<DemoComponent />);
    expect(getByTestId('star')).toBeInTheDocument();
  });
});
