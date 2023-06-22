/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Payment from '../payment ';
import { vi } from 'vitest';
import * as hooks from '../hooks/hooks';

vi.mock('../hooks/hooks', () => ({
  useFetchOrder: vi.fn(),
  makePayment: vi.fn(),
  replaceLoacation: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = vi.fn();
  const FakeLocation = () => {
    const rid = '123456';
    const search = `?rid=${rid}`;
    const location = { search };
    return location;
  };
  const FakeNavigate = vi.fn(() => navigate);
  return {
    ...(actual as object),
    useLocation: FakeLocation,
    useNavigate: FakeNavigate,
  };
});
vi.spyOn(hooks, 'useFetchOrder').mockReturnValue({
  loading: false,
  order: {
    totalPrice: 3000,
    createdAt: '23',
    shippingId: '1234565432',
    products: [],
    id: '1234trew23',
    status: 'pending',
    userId: '234rewy543',
    updatedAt: '123453qwer',
  },
  error: null,
  fetchOrder: vi.fn(),
});

const Mockcontainer = () => {
  return (
    <MemoryRouter initialEntries={[`/route?param=12345432`]}>
      <Payment />
    </MemoryRouter>
  );
};

describe('renders loading state when data is loading', function () {
  it('should test loading component', async function () {
    vi.spyOn(hooks, 'useFetchOrder').mockReturnValue({
      loading: true,
      order: null,
      error: null,
      fetchOrder: vi.fn(),
    });
    render(<Mockcontainer />);
    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });
  it('should test error component', async function () {
    const mockError = new Error('something went wrong');
    vi.spyOn(hooks, 'useFetchOrder').mockReturnValue({
      loading: false,
      order: null,
      error: mockError,
      fetchOrder: vi.fn(),
    });
    render(<Mockcontainer />);
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});

describe('tesing the component after loading', function () {
  let card: Node | Window,
    year: Node | Window,
    month: Node | Window,
    cvc: Node | Window,
    formElement: Node | Window;
  const Month = new Date().getMonth() + 1;
  const Year = new Date().getFullYear();
  beforeEach(() => {
    vi.spyOn(hooks, 'useFetchOrder').mockReturnValue({
      loading: false,
      order: {
        totalPrice: 3000,
        createdAt: '23',
        shippingId: '1234565432',
        products: [],
        id: '1234trew23',
        status: 'pending',
        userId: '234rewy543',
        updatedAt: '123453qwer',
      },
      error: null,
      fetchOrder: vi.fn(),
    });
    render(<Mockcontainer />);
    card = screen.getByTestId('cardNumber');
    month = screen.getByTestId('expMonth');
    year = screen.getByTestId('expYear');
    cvc = screen.getByTestId('cvc');
    formElement = screen.getByText('PAY NOW');
  });
  it('should test the payment component', async function () {
    expect(screen.getByText('CARD NUMBER')).toBeInTheDocument();
    expect(screen.getByText('EXP-MONTH')).toBeInTheDocument();
    expect(screen.getByText('EXP-YEAR')).toBeInTheDocument();
    expect(screen.getByText('CVC')).toBeInTheDocument();
  });

  it('should test the form validation', async function () {
    fireEvent.click(formElement);
    await waitFor(() => {
      expect(screen.getByText('Card number is required')).toBeInTheDocument();
    });
  });
  it('should test expiration condition', async function () {
    fireEvent.change(card, { target: { value: '4242424242424242' } });
    fireEvent.change(month, { target: { value: '1' } });
    fireEvent.change(year, { target: { value: Year } });
    fireEvent.change(cvc, { target: { value: '4242' } });
    fireEvent.click(formElement);
    await waitFor(() => {
      expect(screen.getByText('The selected month is in the past')).toBeInTheDocument();
    });
  });

  it('should test success payment', async function () {
    vi.spyOn(hooks, 'makePayment').mockResolvedValue({
      data: 'payment successfull',
    });
    fireEvent.change(card, { target: { value: '4242424242424242' } });
    fireEvent.change(month, { target: { value: `${Month}` } });
    fireEvent.change(year, { target: { value: `${Year}` } });
    fireEvent.change(cvc, { target: { value: '4242' } });
    fireEvent.click(formElement);
    await waitFor(() => {
      expect(useNavigate).toBeCalled;
    });
  });
});

describe('eeeee', function () {
  const currentMonth = new Date().getMonth() + 1;
  const ThisYear = new Date().getFullYear();
  let card: Node | Window,
    year: Window | Node,
    month: Window | Node,
    cvc: Node | Window,
    formElement: Node | Window;
  let errorDiv: any;
  beforeEach(() => {
    render(<Mockcontainer />);
    card = screen.getByTestId('cardNumber');
    month = screen.getByTestId('expMonth');
    year = screen.getByTestId('expYear');
    cvc = screen.getByTestId('cvc');
    formElement = screen.getByText('PAY NOW');
    errorDiv = screen.getByTestId('error_div');
  });

  it('should test fail payment', async function () {
    vi.spyOn(hooks, 'makePayment').mockRejectedValue({
      response: {
        data: {
          message: 'Payment failed',
        },
      },
    });
    fireEvent.change(card, { target: { value: '4000000000009995' } });
    fireEvent.change(month, { target: { value: `${currentMonth}` } });
    fireEvent.change(year, { target: { value: `${ThisYear}` } });
    fireEvent.change(cvc, { target: { value: '4242' } });
    fireEvent.click(formElement);
    await waitFor(() => {
      expect(errorDiv.textContent).toBe('Payment failed');
    });
  });

  it('redirect to confirmation', async function () {
    vi.spyOn(hooks, 'makePayment').mockRejectedValue({
      response: {
        data: {
          Message: 'require action',
          Action: 'redirect link',
        },
      },
    });
    const replaceSpy = vi.spyOn(hooks, 'makePayment');
    fireEvent.change(card, { target: { value: '4000000000009995' } });
    fireEvent.change(month, { target: { value: `${currentMonth}` } });
    fireEvent.change(year, { target: { value: `${ThisYear}` } });
    fireEvent.change(cvc, { target: { value: '4242' } });
    fireEvent.click(formElement);
    await waitFor(() => {
      expect(replaceSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('redirect to confirmation', async function () {
    vi.spyOn(hooks, 'makePayment').mockRejectedValue({
      message: 'failed',
      response: {
        data: {
          Action: null,
        },
      },
    });
    fireEvent.change(card, { target: { value: '4000000000009995' } });
    fireEvent.change(month, { target: { value: `${currentMonth}` } });
    fireEvent.change(year, { target: { value: `${ThisYear}` } });
    fireEvent.change(cvc, { target: { value: '4242' } });
    fireEvent.click(formElement);
    await waitFor(() => {
      expect(errorDiv.textContent).toBe('failed');
    });
  });
});
