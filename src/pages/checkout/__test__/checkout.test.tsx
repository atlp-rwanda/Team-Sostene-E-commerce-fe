import { fireEvent, render, waitFor } from '@testing-library/react';
import Checkout from '../Checkout';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { useCheckout } from '../hooks';
import { setToken } from '../../../redux/slices/tokenSlice';
import { setCart } from '../../viewCart/redux/getCartSlice';
import { EmptyCart } from '../../../components/reusables/Reusable';

describe('Testing Rendering of checkout pages', () => {
  test('Should render checkout component', () => {
    store.dispatch(
      setCart({
        loading: false,
        message: 'Cart data updated successfully.',
        error: '',
        data: {
          products: [
            {
              product: {
                id: '34ee753c-5c83-40a0-97f8-17579cab0518',
                image:
                  'http://res.cloudinary.com/duuznxvqs/image/upload/v1685144543/kvdvcfezpm0cluslxowh.png',
                name: 'Color furniture',
                price: 1200,
              },
              quantity: 2,
            },
          ],
          total: 2400,
        },
      })
    );
    store.dispatch(
      setToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxZDMxM2M1LTgxNjctNGNhNy04NGQ1LWVkNTJiNDY1ZjJkYyIsInVzZXJuYW1lIjoib3JkZXJVc2VyIiwiZW1haWwiOiJvcmRlcnVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiQlVZRVIiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE2ODc2NzkzMzF9.j0PDuoZK5YmPpyGWeeA89w1C51hVyKKEmiezDHVKJP0'
      )
    );

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = getByText('Confirm order');
    fireEvent.click(submitButton);

    const title = getByText('Contact Information');
    expect(title).toBeInTheDocument();
    const title1 = getByText('Shipping Information');
    expect(title1).toBeInTheDocument();
    fireEvent.change(getByTestId('email-address'), { target: { value: 'test@mail.com' } });
    expect(getByTestId('email-address')).toBeInTheDocument();
  });
  test('Should render checkout component empty cart', () => {
    store.dispatch(setToken('initialTokenValue'));
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <EmptyCart />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = getByTestId('go-to-shop');
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    const title = getByText('You have no products in your cart');
    expect(title).toBeInTheDocument();
  });
});

describe('Testing submitting with errors', () => {
  test('show errors', async () => {
    store.dispatch(
      setToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxZDMxM2M1LTgxNjctNGNhNy04NGQ1LWVkNTJiNDY1ZjJkYyIsInVzZXJuYW1lIjoib3JkZXJVc2VyIiwiZW1haWwiOiJvcmRlcnVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiQlVZRVIiLCJzdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE2ODc2NzkzMzF9.j0PDuoZK5YmPpyGWeeA89w1C51hVyKKEmiezDHVKJP0'
      )
    );
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkout />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = getByText('Confirm order');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(getByText('Phone number is required')).toBeInTheDocument();
      expect(getByText('First name is required')).toBeInTheDocument();
      expect(getByText('Last name is required')).toBeInTheDocument();
    });
  });
});

describe('Testing checkout hook', () => {
  test('Testing useCheckout', () => {
    const TestComponent = () => {
      const { handleSubmit } = useCheckout();

      const checkoutDetails = {
        email: 'test@example.com',
        lastName: 'examplelname',
        firstName: 'examplefname',
        postalCode: '00000',
        phoneNumber: '099999999',
        streetAddress: 'kkkk8988',
        city: 'Kigali',
        country: 'Rwanda',
        token: 'exampleTok!en',
      };

      const handleFormSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleSubmit(checkoutDetails);
      };

      return (
        <div>
          <form onSubmit={handleFormSubmit} data-testid="email-form">
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
    store.dispatch(setToken('initialTokenValue'));
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TestComponent />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.submit(getByTestId('email-form'));
    expect(getByTestId('email-form')).toBeInTheDocument();
  });
});
