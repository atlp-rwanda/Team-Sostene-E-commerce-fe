import { render, screen } from '@testing-library/react';
import Icon from '../Icon';
import * as NotificationsHooks from '../hooks';
import { vi } from 'vitest';

describe('Testing', () => {
  test('Render component', () => {
    const data = () => {
      const count = 2;
      return {
        count,
      };
    };
    vi.spyOn(NotificationsHooks, 'useNotifications').mockImplementation(data);
    render(<Icon />);
    const isRendered = screen.getByTestId('notification-bell');
    expect(isRendered).toBeInTheDocument();
  });
});
