import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import LoadingSpinner from './loadingSpinner';

describe('loading component', () => {
  it('renders the loading component', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    const loading = screen.getByRole('img');
    expect(loading).toHaveAttribute('src', 'https://media.tenor.com/0JK1fHxqYGEAAAAi/loading.gif');
  });
});
