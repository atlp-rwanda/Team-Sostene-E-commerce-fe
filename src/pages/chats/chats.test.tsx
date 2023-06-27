import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import Chats from './chats';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { setMessageChat } from './chats.slice';

const useStateMock = vi.fn();

const MockElement = () => {
  library.add(fab, fas);

  return (
    <MemoryRouter initialEntries={['/chats']}>
      <Provider store={store}>
        <Chats />
      </Provider>
    </MemoryRouter>
  );
};

describe('Chats page', () => {
  beforeEach(() => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
  });
  test('renders chat page in the app', async () => {
    useStateMock.mockReturnValue(['', vi.fn()]);

    render(<MockElement />);
    expect(screen.getByTestId('chatsFrame')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.change(screen.getByRole('typingBox') as HTMLTextAreaElement, {
      target: { value: 'hello world' },
    });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith(setMessageChat('hello world'));
  });

  test('Calls handle submit but no action as it is empty string', async () => {
    useStateMock.mockReturnValue(['', vi.fn()]);

    render(<MockElement />);

    const typingBox = screen.getByRole('typingBox');
    fireEvent.change(screen.getByRole('typingBox') as HTMLTextAreaElement, {
      target: { value: '' },
    });
    fireEvent.keyDown(typingBox, { key: 'Enter', code: 'Enter' });
    expect(store.dispatch).toHaveBeenCalledWith(setMessageChat(''));
  });
});
