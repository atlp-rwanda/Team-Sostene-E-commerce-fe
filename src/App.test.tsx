import { describe, it, expect, vi } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

vi.mock('darkreader', () => ({
  enable: vi.fn(),
  disable: vi.fn(),
  setFetchMethod: vi.fn(),
}));

describe('App Component', () => {
  it('renders learn react link', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
    );

    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();
  });
});
