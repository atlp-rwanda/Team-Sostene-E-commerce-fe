import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import NotFoundSearch from './notFoundSearch';

describe('NotFoundSearch', () => {
  it('renders the NotFoundSearch component correctly', () => {
    const resetMock = () => vi.fn();
    const { getByText, getAllByRole } = render(
      <NotFoundSearch btnText="Reset" reset={resetMock} />
    );

    expect(getByText('Not Found')).toBeInTheDocument();
    expect(
      getByText('Missed what you are looking for? Don’t worry! You can try again with another way!')
    ).toBeInTheDocument();
    expect(getByText('Reset')).toBeInTheDocument();

    fireEvent.click(getByText('Reset'));
    const images = getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
  });
  it('renders the NotFoundSearch component correctly', () => {
    const resetMock = () => vi.fn();
    const { getByText, getAllByRole, getByTestId } = render(
      <NotFoundSearch btnText="Reset" component={true} reset={resetMock} />
    );
    expect(getByText('Not Found')).toBeInTheDocument();
    expect(
      getByText('Missed what you are looking for? Don’t worry! You can try again with another way!')
    ).toBeInTheDocument();

    fireEvent.click(getByText('Reset'));
    const images = getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    expect(getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
    const className = getByTestId('404Page');
    expect(className.className).toBe('container component');
  });
});
