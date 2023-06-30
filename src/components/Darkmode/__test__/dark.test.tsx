import { render, fireEvent } from '@testing-library/react';
import { DarkButton } from '../DarkButton';
import { vi } from 'vitest';

vi.mock('darkreader', () => ({
  enable: vi.fn(),
  disable: vi.fn(),
  setFetchMethod: vi.fn(),
}));

describe('DarkButton', () => {
  test('renders without error', () => {
    render(<DarkButton />);
  });

  test('initial state is false and checkbox is unchecked', () => {
    const { getByTestId } = render(<DarkButton />);
    const darkButton = getByTestId('dark-button') as HTMLInputElement;
    expect(darkButton.checked).toBe(false);
  });

  test('toggle dark mode when checkbox is clicked', () => {
    const { getByTestId } = render(<DarkButton />);
    const darkButton = getByTestId('dark-button') as HTMLInputElement;
    fireEvent.click(darkButton);
    expect(darkButton.checked).toBe(true);
    fireEvent.click(darkButton);
    expect(darkButton.checked).toBe(false);
  });
});
