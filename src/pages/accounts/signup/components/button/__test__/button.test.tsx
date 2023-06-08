import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../button';

describe('Button Element', () => {
  it('renders the button component', () => {
    render(
      <Button size="large" color="primary" value="Click me" onclick={vi.fn()} type="button" />
    );

    const buttonElement = screen.getByText('Click me') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(buttonElement).toHaveClass('_btn_1bb70a _size--large_1bb70a _color--primary_1bb70a');
    expect(buttonElement.tagName).toBe('BUTTON');
    expect(buttonElement).toHaveAttribute('type', 'button');
    fireEvent.click(buttonElement);
  });
});
