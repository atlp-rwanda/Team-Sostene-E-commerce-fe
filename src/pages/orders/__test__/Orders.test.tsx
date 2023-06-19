import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Order from '../Orders';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const OrdersMock = vi.fn();
const SingleOrderMock = vi.fn();

vi.mock('./trackOrder', () => ({
  default: OrdersMock,
}));

vi.mock('./viewSingleOrder', () => ({
  default: SingleOrderMock,
}));

describe('Render Order Component', () => {
  test('Render trackOrders', () => {
    render(
      <MemoryRouter initialEntries={['/trackOrders']}>
        <Routes>
          <Route path="/trackOrders" element={<Order />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test('Render singleOrder', () => {
    render(
      <MemoryRouter initialEntries={['/singleOrder']}>
        <Routes>
          <Route path="/singleOrder" element={<Order />} />
        </Routes>
      </MemoryRouter>
    );
  });
});
