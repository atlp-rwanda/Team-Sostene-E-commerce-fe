import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SellerItems from '../sellerItems';
import { Provider } from 'react-redux';
import store from '../../../../../redux/store';
import '@testing-library/jest-dom/extend-expect';
import { it, describe, vi, beforeEach, expect } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

vi.mock('axios');

const mockAdapter = new MockAdapter(axios);
const Mockcontainer = () => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <SellerItems />
      </Provider>
    </MemoryRouter>
  );
};

describe('SellerItems', () => {
  beforeEach(() => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
  });
  it('displays the title headings and the input elements', async () => {
    render(<Mockcontainer />);
    expect(screen.getAllByTestId('loading').length).toBeGreaterThan(0);
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search Item');
      expect(searchInput).toBeInTheDocument();
      expect(screen.getByTestId('pagesId')).toBeInTheDocument();
    });
  });
  it('renders card items', async () => {
    await act(async () => render(<Mockcontainer />));
    const pageElement = screen.getByRole('changePage');
    const searchElement = screen.getByRole('getSearchTest');
    fireEvent.change(searchElement, { target: { value: 'test' } });
    fireEvent.change(pageElement, { target: { value: 2 } });

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'filterSearch/setSearch',
        payload: 'test',
      });
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'filterSearch/setPage',
        payload: 2,
      });
    });
  });
});
const data = {
  products: [
    {
      productImages: [
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' },
      ],
      id: 'string',
      category: 'furnitures',
      price: 700,
      bonus: 100,
      collectionId: '12312hgujh12',
      expDate: '2020-01-02',
      expiredflag: false,
      name: 'Attractors',
      quantity: 10,
    },
    {
      productImages: [
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' },
        { url: 'www.test.com' },
      ],
      id: 'string1',
      category: 'night',
      price: 1200,
      bonus: 100,
      collectionId: '12312hgujh12',
      expDate: '2020-01-02',
      expiredflag: false,
      name: 'Happy homes',
      quantity: 10,
    },
  ],
  message: 'string message',
  page: 1,
  totalPages: 2,
};
describe('render Seller items components with data successfully', () => {
  it('loads the data on mounts', async () => {
    const url = `https://team-sostene-e-commerce-bn-production-f4c1.up.railway.app/products/all?page=1&limit=10`;
    mockAdapter.onGet(url).reply(200, data);
    await act(async () => render(<Mockcontainer />));
    waitFor(() => {
      expect(screen.getByText('Happy homes')).toBeInTheDocument();
      expect(screen.getByText('Attractors')).toBeInTheDocument();
      expect(screen.getByText('Out of 2 Pages')).toBeInTheDocument();
    });
  });

  it('renders card items filtered', async () => {
    const url = `https://team-sostene-e-commerce-bn-production-f4c1.up.railway.app/products/all?page=1&limit=10`;
    mockAdapter.onGet(url).reply(200, data);

    await act(async () => render(<Mockcontainer />));
    const searchElement = screen.getByRole('getSearchTest');
    fireEvent.change(searchElement, { target: { value: 'Attractors' } });

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'filterSearch/setSearch',
      payload: 'Attractors',
    });

    waitFor(() => {
      expect(screen.getByText('Attractors')).toBeInTheDocument();
    });
  });
});
