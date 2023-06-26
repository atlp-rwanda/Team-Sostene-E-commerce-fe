import { render, screen } from '@testing-library/react';
import Empty from '../empty';
import { vi } from 'vitest';

describe('testing empty component', function () {
  it('shpuld render empty component', function () {
    render(<Empty store={'No products'} data={'products'} reset={vi.fn()} />);
    expect(screen.getByText('No products')).toBeInTheDocument();
  });
});
