<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import NoticationPane from '../notificationPane';
import * as NotificationsHooks from '../hooks';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

describe('Testing', () => {
  test('Render component', () => {
    const data = () => {
      const count = 2;
      const notifications = [
        {
          id: '0f1548b0-b7ce-49e3-a2ef-baffffd383aa',
          notificationId: '6e5791fe-1ff3-429b-a9c4-97adbc0183a6',
          title: 'Password update',
          message: 'Password is changed successfully',
          level: 'low',
          read: false,
          date: '2023-05-03T14:50:07.544Z',
        },
        {
          id: '0f1548b0-b7ce-49e3-a2ef-baffffd383aa',
          notificationId: '05e61ebf-9a6e-46e1-b2b5-1419c7b36013',
          title: 'Password update',
          message: 'Password is changed successfully',
          level: 'low',
          read: false,
          date: '2023-05-03T14:51:02.595Z',
        },
      ];
      const loading = false;
      return {
        count,
        notifications,
        loading,
      };
    };
    vi.spyOn(NotificationsHooks, 'useNotifications').mockImplementation(data);
    render(
      <Provider store={store}>
        <NoticationPane />
      </Provider>
    );
    const isRendered = screen.getByTestId('notifications-pane');
    expect(isRendered).toBeInTheDocument();
  });
});
=======
import { render, screen } from '@testing-library/react';
import NoticationPane from '../notificationPane';
import * as NotificationsHooks from '../hooks';
import { vi } from 'vitest';

describe('Testing', () => {
  test('Render component', () => {
    const data = () => {
      const count = 2;
      const notifications = [
        {
          id: '0f1548b0-b7ce-49e3-a2ef-baffffd383aa',
          notificationId: '6e5791fe-1ff3-429b-a9c4-97adbc0183a6',
          title: 'Password update',
          message: 'Password is changed successfully',
          level: 'low',
          read: false,
          date: '2023-05-03T14:50:07.544Z',
        },
        {
          id: '0f1548b0-b7ce-49e3-a2ef-baffffd383aa',
          notificationId: '05e61ebf-9a6e-46e1-b2b5-1419c7b36013',
          title: 'Password update',
          message: 'Password is changed successfully',
          level: 'low',
          read: false,
          date: '2023-05-03T14:51:02.595Z',
        },
      ];
      const loading = false;
      return {
        count,
        notifications,
        loading,
      };
    };
    vi.spyOn(NotificationsHooks, 'useNotifications').mockImplementation(data);
    render(<NoticationPane />);
    const isRendered = screen.getByTestId('notifications-pane');
    expect(isRendered).toBeInTheDocument();
  });
});
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
