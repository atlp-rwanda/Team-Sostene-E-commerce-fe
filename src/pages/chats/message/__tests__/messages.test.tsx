import { render } from '@testing-library/react';
import Message from '../message';
import { makeBgLogo } from '../message';
import { test } from 'vitest';

describe('makeBgLogo', () => {
  test('returns the correct logo for a name with two words', () => {
    const name = 'John Doe';
    const expectedLogo = 'JD';

    const result = makeBgLogo(name);

    expect(result).toBe(expectedLogo);
  });

  test('returns the correct logo for a name with a single word', () => {
    const name = 'Alice';
    const expectedLogo = 'A';
    const result = makeBgLogo(name);
    expect(result).toBe(expectedLogo);
  });

  test('returns an empty string if the name is empty', () => {
    const name = '';
    const expectedLogo = '';

    const result = makeBgLogo(name);

    expect(result).toBe(expectedLogo);
  });
});

describe('Messages', () => {
  test('renders without errors', () => {
    const message = {
      userId: '1',
      username: 'John Doe',
      message: 'Hello, world!',
      date: '2023-06-23T10:00:00Z',
    };
    const own = false;

    const { getByTestId, getByText } = render(<Message message={message} own={own} />);
    expect(getByTestId('messages')).toBeInTheDocument();
    expect(getByText('Hello, world!')).toBeInTheDocument();
  });
});
