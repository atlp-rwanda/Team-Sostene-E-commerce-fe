import { render, screen } from '@testing-library/react';
import Label from '../label';
import { it, expect } from 'vitest';

it('renders the label component', () => {
  render(<Label value="My Label" size="large" color="secondary" />);

  const labelElement = screen.getByText('My Label') as HTMLLabelElement;
  expect(labelElement).toBeInTheDocument();
  expect(labelElement).toHaveClass('_size--large_c2768b _color--secondary_c2768b');
  expect(labelElement.tagName).toBe('P');
});
