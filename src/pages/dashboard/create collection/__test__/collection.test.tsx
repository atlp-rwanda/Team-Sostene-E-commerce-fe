import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { vi } from 'vitest';
import CreateCollection from '../CreateCollection';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import Dashboard from '../../Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { Collections } from '../CreateCollection';

describe('Testing Create collection', () => {
  test('Creating collection', () => {
    const axiosMock = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        message: 'It worked!',
      },
    });
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <CreateCollection />
        </Provider>
      </BrowserRouter>
    );
    const button = getByText('Create');
    const collectionInput = getByRole('collectionInput');
    expect(collectionInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.change(collectionInput, { target: { value: 'test' } });
    fireEvent.click(button);
    expect(axiosMock).toBeCalled();
  });

  test('Creating collection with Error', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <CreateCollection />
        </Provider>
      </BrowserRouter>
    );
    const button = getByText('Create');
    const collectionInput = getByRole('collectionInput');
    expect(getByText('Enter collection name')).toBeInTheDocument();
    expect(collectionInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.change(collectionInput, { target: { value: '' } });
    fireEvent.click(button);
    expect(getByText('Invalid Valid Collection name')).toBeInTheDocument();
  });
  test('getting collections with error', () => {
    const axiosMock = vi.spyOn(axios, 'get').mockRejectedValueOnce({});
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(axiosMock).toBeCalled();
  });
  test(' getting collections with success', () => {
    const axiosMock = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        data: [
          {
            id: '12345',
            name: 'collection',
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(axiosMock).toBeCalled();
  });
});

describe('Testing get collection', () => {
  test(' getting collections  with warnings if wanna delete one', async () => {
    const axiosMock = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        data: [
          {
            id: '12345',
            name: 'collection',
          },
          {
            id: '1235445',
            name: 'collection 2',
          },
        ],
      },
    });

    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Collections />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(axiosMock).toBeCalled();
      const deleteBtn = getAllByRole('deleteConnection');
      const name = getByText('Your collections');
      expect(deleteBtn.length).toBeGreaterThan(0);
      expect(name).toBeInTheDocument();
      deleteBtn.forEach((btn) => {
        fireEvent.click(btn);
        expect(getByText('Are you sure, you want to delete this collection?')).toBeInTheDocument();
      });
    });
  });
  test(' getting collections with navigate to colections', async () => {
    const axiosMock = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        data: [
          {
            id: '12345',
            name: 'collection',
          },
        ],
      },
    });

    const { getByText, getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Collections />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(axiosMock).toBeCalled();
      const deleteBtn = getByRole('navigateToCollection');
      const name = getByText('collection');
      expect(deleteBtn).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      fireEvent.click(deleteBtn);
      expect(name).toBeInTheDocument();
    });
  });

  test('getting empty collection message', async () => {
    const axiosMock = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        data: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Collections />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(axiosMock).toBeCalled();
      const name = getByText('No collections created yet.');
      expect(name).toBeInTheDocument();
    });
  });
});
