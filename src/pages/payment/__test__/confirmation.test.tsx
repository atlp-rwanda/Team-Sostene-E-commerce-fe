import { MemoryRouter } from 'react-router-dom';
import PaymentConfirmation from '../confirmation';
import * as hooks from '../hooks/hooks';
import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

vi.mock('../hooks/hooks', () => ({
  useFetchOrder: vi.fn(),
  useGetShippingAddress: vi.fn(),
  useGetUrl: vi.fn(),
  replaceLoacation: vi.fn(),
  decodeToken: vi.fn(),
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

const Mockcontainer = () => {
  return (
    <MemoryRouter initialEntries={[`/route?param=12345432`]}>
      <PaymentConfirmation />
    </MemoryRouter>
  );
};

describe('tesing rendering of confirm page', function () {
  vi.spyOn(hooks, 'useGetUrl').mockReturnValue({
    stripeloading: false,
    stripeError: null,
    stripeUrl: 'url_link',
  });

  vi.spyOn(hooks, 'decodeToken').mockResolvedValue({
    username: 'princo',
    email: 'princo@example.com',
    status: 'BUYER',
  });
  it('should render confirm page', function () {
    vi.spyOn(hooks, 'useFetchOrder').mockReturnValue({
      loading: false,
      order: {
        totalPrice: 3000,
        createdAt: '23',
        shippingId: '1234565432',
        products: [
          {
            product: {
              id: '123456',
              image: 'imageurl',
              name: 'testproduct',
              price: 0,
            },
          },
        ],
        id: '1234trew23',
        status: 'succeeded',
        userId: '234rewy543',
        updatedAt: '123453qwer',
      },
      error: null,
      fetchOrder: vi.fn(),
    });
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: false,
      errors: null,
      shippingAddress: {
        shippingAddress: {
          city: 'kigali',
          country: 'rwanda',
          postalCode: '250',
          streetAddress: 'kn9',
          phoneNumber: '0782222222',
        },
      },
    });
    render(<Mockcontainer />);
    const element = screen.getByText('PAYMENT SUCCESSFULL');
    expect(element).toBeInTheDocument();
  });

  it('should render confirm page', function () {
    vi.spyOn(hooks, 'useFetchOrder').mockReturnValue({
      loading: false,
      order: {
        totalPrice: 5000,
        createdAt: '23',
        shippingId: '123456543255',
        products: [
          {
            product: {
              id: '1234567',
              image: 'imageurl',
              name: 'testproducts',
              price: 0,
            },
          },
        ],
        id: '1234trew23',
        status: 'failed',
        userId: '234rewy543s',
        updatedAt: '123453qwers',
      },
      error: null,
      fetchOrder: vi.fn(),
    });
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: false,
      errors: null,
      shippingAddress: {
        shippingAddress: {
          city: 'kigali',
          country: 'rwanda',
          postalCode: '250',
          streetAddress: 'kn9',
          phoneNumber: '0782222222',
        },
      },
    });
    render(<Mockcontainer />);
    const element = screen.getByText('PAYMENT FAILED');
    expect(element).toBeInTheDocument();
  });

  it('should render loading spin', function () {
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: true,
      errors: null,
      shippingAddress: {
        shippingAddress: {
          city: 'kigali',
          country: 'rwanda',
          postalCode: '250',
          streetAddress: 'kn9',
          phoneNumber: '0782222222',
        },
      },
    });
    render(<Mockcontainer />);
    const element = screen.getByTestId('button-loader');
    expect(element).toBeInTheDocument();
  });

  it('should render error page', function () {
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: false,
      errors: null,
      shippingAddress: {
        shippingAddress: null,
      },
    });
    render(<Mockcontainer />);
    const element = screen.getByText('Not Found');
    expect(element).toBeInTheDocument();
  });

  it('should test error', function () {
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: false,
      errors: new Error('failed'),
      shippingAddress: {
        shippingAddress: null,
      },
    });
    render(<Mockcontainer />);
    const element = screen.getByText('Not Found');
    expect(element).toBeInTheDocument();
  });

  it('should test displaying order contents', function () {
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: false,
      errors: new Error('failed'),
      shippingAddress: {
        shippingAddress: null,
      },
    });
    render(<Mockcontainer />);
    const element = screen.getByText('Not Found');
    expect(element).toBeInTheDocument();
  });
  it('should test redirect to home ', async function () {
    vi.spyOn(hooks, 'useGetShippingAddress').mockReturnValue({
      loads: false,
      errors: null,
      shippingAddress: {
        shippingAddress: {
          city: 'kigali',
          country: 'rwanda',
          postalCode: '250',
          streetAddress: 'kn9',
          phoneNumber: '0782222222',
        },
      },
    });
    render(<Mockcontainer />);
    const button = screen.getByText('DONE');
    fireEvent.click(button);
    const navigate = useNavigate;
    await waitFor(() => {
      expect(navigate).toBeCalled;
    });
  });
});
