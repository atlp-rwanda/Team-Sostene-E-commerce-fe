import Input from '../input';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('Input element', () => {
  it('renders the input component', async () => {
    render(
      <Input
        size="long"
        textId="input-text"
        placeholder="Enter something"
        type="text"
        name="myInput"
        value=""
        onChange={vi.fn()}
        className="my-input"
      />
    );

    const inputElement = screen.getByTestId('input-text') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter something');
    expect(inputElement).toHaveAttribute('name', 'myInput');
    expect(inputElement).toHaveClass('_width_459d69 _widthLong_459d69 _all_459d69');

    fireEvent.change(inputElement, { target: { value: 'Hello, World!' } });
    await waitFor(() => {
      expect(inputElement.value).toBe('');
    });
  });
});
