import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { AccountsLoader, ButtonLoader } from '../Loaders/Loaders';

describe('Testing Loaders', () => {
  test('Accounts Loader', () => {
    const { getByTestId } = render(<AccountsLoader />);
    const isIn = getByTestId('accounts-loader');
    expect(isIn).toBeInTheDocument();
  });
  test('Button Loader', () => {
    const { getByTestId } = render(<ButtonLoader />);
    const isInButton = getByTestId('button-loader');
    expect(isInButton).toBeInTheDocument();
  });
});
