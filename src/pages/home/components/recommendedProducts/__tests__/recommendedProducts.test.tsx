import { render, screen, fireEvent } from '@testing-library/react';
import RecommendedProducts from '../recommendedProducts';
import { test, vi } from 'vitest';
import routes from '../../../../../utils/routes';
import store from '../../../../../redux/store';
import { Provider } from 'react-redux';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));
const navigateMock = vi.fn();

navigateMock.mockReturnValue(null);

describe('RecommendedProducts', () => {
  const data = {
    productImages: [{ url: 'image-url' }],
    details: 'Product details',
    id: 'product-id',
    category: 'product-category',
    ratings: 4,
    price: 10,
    bonus: 5,
    collectionId: 'collection-id',
    createdAt: '2023-06-01',
    expDate: '2023-06-30',
    expiredflag: false,
    name: 'Product Name',
    quantity: 1,
  };
  const handleshow = vi.fn();
  const MockElement = () => {
    return (
      <Provider store={store}>
        <RecommendedProducts index={1} showImage={handleshow} data={data} />
      </Provider>
    );
  };
  test('renders product details correctly', () => {
    render(<MockElement />);
    const productName = screen.getByText('Product Name');
    const productPrice = screen.getByText('$10');
    const addToCartButton = screen.getByText('Add to Cart');
    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(addToCartButton).toBeInTheDocument();
  });
  test('redirects to login route when token is not present', () => {
    render(<MockElement />);

    vi.mock('react-router-dom', () => ({
      useNavigate: () => navigateMock,
    }));

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    expect(navigateMock).toHaveBeenCalledWith(routes.login);
  });
});
