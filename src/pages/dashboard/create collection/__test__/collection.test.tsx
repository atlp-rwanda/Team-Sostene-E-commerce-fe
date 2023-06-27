import { fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import { vi } from 'vitest';
import CreateCollection from '../CreateCollection';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import Dashboard from '../../Dashboard';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Create collection', () => {
  test('Creating collection', () => {
    const axiosMock = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: {
        message: 'It worked!',
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <CreateCollection />
      </Provider>
    );
    const button = getByText('Create');
    fireEvent.click(button);
    expect(axiosMock).toBeCalled();
  });
  test('Creating collection with Error', () => {
    const axiosMock = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        data: {
          code: 409,
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <CreateCollection />
      </Provider>
    );
    const button = getByText('Create');
    fireEvent.click(button);
    expect(axiosMock).toBeCalled();
  });
  test('Creating collection with Error', () => {
    const axiosMock = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        data: {
          code: 400,
          message: '409',
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <CreateCollection />
      </Provider>
    );
    const button = getByText('Create');
    fireEvent.click(button);
    expect(axiosMock).toBeCalled();
  });
  test('Creating collection with Error', () => {
    const axiosMock = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        data: {
          code: 400,
          error: '409',
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <CreateCollection />
      </Provider>
    );
    const button = getByText('Create');
    fireEvent.click(button);
    expect(axiosMock).toBeCalled();
  });
  test('Creating collection with Error', () => {
    const axiosMock = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        data: {
          message: undefined,
        },
      },
    });
    const { getByText } = render(
      <Provider store={store}>
        <CreateCollection />
      </Provider>
    );
    const button = getByText('Create');
    fireEvent.click(button);
    expect(axiosMock).toBeCalled();
  });
  test(' getting collections with Error', () => {
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
  test(' getting collections with Error', () => {
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
