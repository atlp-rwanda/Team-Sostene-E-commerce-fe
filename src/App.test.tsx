import { describe, it, expect } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

describe('App Component', () => {
  it('renders learn react link', async () => {
    await act(async () =>
      render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    );

    const linkElement = screen.getByText('Contact');
    expect(linkElement).toBeInTheDocument();
  });
});
