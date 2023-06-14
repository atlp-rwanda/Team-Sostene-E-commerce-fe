import { render } from '@testing-library/react';
import Accounts from '../../Accounts';
import { MemoryRouter } from 'react-router-dom';

describe('Render Accounts Component', () => {
  test('Render accounts', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/accounts/reset-password/']}>
        <Accounts />
      </MemoryRouter>
    );
    const isRendered = getByTestId('accounts');
    expect(isRendered).toBeInTheDocument();
  });
});
