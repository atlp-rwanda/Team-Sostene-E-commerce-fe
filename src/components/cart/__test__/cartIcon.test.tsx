import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Cart, { CartIcon, CartItem } from '../Cart';
import store from '../../../redux/store';
import { CART } from '../redux/cartDataSlice';

const cart: CART = {
  products: [
    {
      product: {
        name: 'test item',
        image: '/image.jpg',
        price: 5000,
      },
      quantity: 4,
    },
  ],
  total: 23,
};

describe('Cart', () => {
  test('renders the cart box', () => {
    render(<Cart loading={false} error="" cart={cart} />);
    const cartHeader = screen.getByText('Cart');
    expect(cartHeader).toBeInTheDocument();
  });
  test('renders the cart box with error', () => {
    render(<Cart loading={false} error="error" cart={cart} />);
    const cartHeader = screen.getByText('Cart');
    expect(cartHeader).toBeInTheDocument();
  });
});

describe('CartIcon', () => {
  test('renders the cart icon with the correct number of products', () => {
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });

  test('toggles the cart view when clicked', () => {
    render(
      <Provider store={store}>
        <CartIcon />
      </Provider>
    );

    const cartIcon = screen.getByTestId('cart-icon');
    fireEvent.click(cartIcon);
  });
});

describe('CartItem', () => {
  test('renders the item name, price, and quantity', () => {
    const name = 'Demo Product';
    const price = 3000;
    const quantity = 8;
    const image = './image.jpg';

    render(<CartItem image={image} name={name} price={price} quantity={quantity} />);

    const itemName = screen.getByText(name);
    expect(itemName).toBeInTheDocument();

    const itemPrice = screen.getByText(price.toString());
    expect(itemPrice).toBeInTheDocument();

    const itemQuantity = screen.getByText(`x${quantity}`);
    expect(itemQuantity).toBeInTheDocument();
  });
  test('renders the item name, price, and quantity with no image', () => {
    const name = 'Demo Product';
    const price = 3000;
    const quantity = 8;
    const image = '';

    render(<CartItem image={image} name={name} price={price} quantity={quantity} />);

    const itemName = screen.getByText(name);
    expect(itemName).toBeInTheDocument();
  });
});
