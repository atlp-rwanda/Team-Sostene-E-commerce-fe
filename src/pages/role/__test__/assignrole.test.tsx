import { fireEvent, render } from '@testing-library/react';
import AssignRole, { DisableButtons, RoleButtons, UserRow } from '../AssignRole';
import { vi } from 'vitest';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

describe('Testing Assign Role Page', () => {
  test('Testing useRow', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserRow id="1234" email="test email" username="test" role="test" status="ACTIVE" />
      </Provider>
    );
    expect(getByTestId('user-row')).toBeInTheDocument();
  });
  test('Testing useRow', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <UserRow id="1234" email="test email" username="test" role="test" status="INACTIVE" />
      </Provider>
    );
    expect(getByTestId('user-row')).toBeInTheDocument();
  });
  test('Testing Buttons click role', () => {
    const mockPatch = vi.spyOn(axios, 'patch').mockResolvedValueOnce({
      id: '12345',
      email: 'e@mail.com',
      username: 'testing',
      role: 'Buyer',
      status: 'ACTIVE',
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <RoleButtons id="12345" />
      </Provider>
    );
    fireEvent.click(getByTestId('role-btn'));
    expect(mockPatch).toBeCalled();
  });
  test('Testing Buttons click role with error', () => {
    const mockPatch = vi.spyOn(axios, 'patch').mockRejectedValueOnce({});
    const { getByTestId } = render(
      <Provider store={store}>
        <RoleButtons id="12345" />
      </Provider>
    );
    fireEvent.click(getByTestId('role-btn'));
    expect(mockPatch).toBeCalled();
  });
  test('Testing get users Page with users', () => {
    const mockGet = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        users: [
          {
            id: '12345',
            email: 'e@mail.com',
            username: 'testing',
            role: 'Buyer',
            status: 'ACTIVE',
          },
          {
            id: '67890',
            email: 'another@mail.com',
            username: 'another',
            role: 'Seller',
            status: 'ACTIVE',
          },
        ],
      },
    });
    render(
      <Provider store={store}>
        <AssignRole />
      </Provider>
    );
    expect(mockGet).toBeCalled();
  });
  test('Testing get users Page with 500 Error', () => {
    const mockGet = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          error: 'Error',
        },
      },
    });
    render(
      <Provider store={store}>
        <AssignRole />
      </Provider>
    );
    expect(mockGet).toBeCalled();
  });
  test('Testing get users Page with Error', () => {
    const mockGet = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          error: 'Error',
        },
      },
    });
    render(
      <Provider store={store}>
        <AssignRole />
      </Provider>
    );
    expect(mockGet).toBeCalled();
  });
  test('Testing get users Page with any error', () => {
    const mockGet = vi.spyOn(axios, 'get').mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          error: 'Error',
        },
      },
    });
    render(
      <Provider store={store}>
        <AssignRole />
      </Provider>
    );
    expect(mockGet).toBeCalled();
  });

  test('Testing Buttons disable account', () => {
    const mockPatch = vi.spyOn(axios, 'patch').mockResolvedValueOnce({
      id: '12345',
      email: 'e@mail.com',
      username: 'testing',
      role: 'Buyer',
      status: 'ACTIVE',
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <DisableButtons id="12345" status="ACTIVE" />
      </Provider>
    );
    fireEvent.click(getByTestId('role-btn'));
    expect(mockPatch).toBeCalled();
  });
  test('Testing Buttons disable account with error', () => {
    const mockPatch = vi.spyOn(axios, 'patch').mockRejectedValueOnce({});
    const { getByTestId } = render(
      <Provider store={store}>
        <DisableButtons id="12345" status="ACTIVE" />
      </Provider>
    );
    fireEvent.click(getByTestId('role-btn'));
    expect(mockPatch).toBeCalled();
  });
});
