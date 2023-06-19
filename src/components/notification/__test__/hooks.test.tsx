import io from 'socket.io-client';
import { useNotifications } from '../hooks';
import { Mock, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

vi.mock('socket.io-client');

it('updates notification count when receiving new notifications', async () => {
  const mockSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  (io as Mock).mockReturnValue(mockSocket);
  const TestComponent = () => {
    const { count } = useNotifications();
    return <p data-testid="test">{count}</p>;
  };
  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
  const joinedData = { msg: 'Joined Mocking' };
  const newNotification: { read: boolean } = { read: false };
  const notificationMockData = [{ read: false }];
  act(() => {
    (mockSocket.on as Mock).mock.calls[0][1](joinedData);
    (mockSocket.on as Mock).mock.calls[1][1](notificationMockData);
    (mockSocket.on as Mock).mock.calls[2][1](newNotification);
  });
  expect(screen.getByTestId('test')).toBeInTheDocument();
});

it('updates notifications when receiving new notifications', async () => {
  const mockSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  (io as Mock).mockReturnValue(mockSocket);
  const TestComponent = () => {
    const { notifications } = useNotifications();
    return (
      <div data-testid="test-noti">
        {notifications.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.message}</div>
            <div>
              <div>{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
  const joinedData = { msg: 'Joined Mocking' };
  const newNotification: { read: boolean } = { read: false };
  const notificationMockData = [{ read: false }];
  act(() => {
    (mockSocket.on as Mock).mock.calls[0][1](joinedData);
    (mockSocket.on as Mock).mock.calls[1][1](notificationMockData);
    (mockSocket.on as Mock).mock.calls[2][1](newNotification);
  });
  expect(screen.getByTestId('test-noti')).toBeInTheDocument();
});
