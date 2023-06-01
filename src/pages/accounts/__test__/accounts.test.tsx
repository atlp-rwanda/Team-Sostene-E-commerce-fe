import { render } from '@testing-library/react';
import Accounts from '../Accounts';
import { MemoryRouter } from 'react-router-dom';

describe('Render Accounts Component', () => {
  test('Render TFA ', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/authenticate']}>
        <Accounts />
      </MemoryRouter>
    );
    const isRendered = getByTestId('accounts');
    expect(isRendered).toBeInTheDocument();
  });
});
