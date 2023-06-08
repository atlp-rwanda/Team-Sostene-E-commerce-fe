import { render, waitFor } from '@testing-library/react';
import Accounts from '../Accounts';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, test, expect } from 'vitest';
import routes from '../../../utils/routes';
import store from '../../../redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

const MockElement = () => {
  library.add(fab, fas);
  return (
    <Provider store={store}>
      <Accounts />
    </Provider>
  );
};

describe('Render Accounts Component', () => {
  test('Render TFA ', async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[routes.authenticate]}>
        <MockElement />
      </MemoryRouter>
    );
    const isRendered = getByTestId('accounts');
    expect(isRendered).toBeInTheDocument();
    await waitFor(() => {
      const isRendereds = getByTestId('tfa');
      expect(isRendereds).toBeInTheDocument();
    });
  });

  test('Render signup', async () => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter initialEntries={[routes.signup]}>
        <MockElement />
      </MemoryRouter>
    );
    const isRendered = getByTestId('accounts');
    expect(isRendered).toBeInTheDocument();
    await waitFor(() => {
      const isRenderedSignUp = getByTestId('signup');
      const isRenderedpass = getByTestId('pass');
      const createAccountText = getByRole('heading', { level: 1 });
      expect(isRenderedSignUp).toBeInTheDocument();
      expect(isRenderedpass).toBeInTheDocument();
      expect(createAccountText).toBeInTheDocument();
    });
  });
});
