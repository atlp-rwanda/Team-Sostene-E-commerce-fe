import { useEffect } from 'react';
import '../viewCart/cart.scss';
import { useGetCart } from './redux/hooks';

function CartTable() {
  const { handleGetCart, result } = useGetCart();
  useEffect(() => {
    handleGetCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return result.loading ? (
    <div className="w-full p-2 py-64 text-center">
      <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
    </div>
  ) : result.data.products.length === 0 ? (
    <div className="cardBox">
      <h1>You have no products in your cart 🛒...</h1>
    </div>
  ) : (
    <div>
      <div className="tableContainer">
        <table className="cart-table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {result.data.products.map((item) => (
              <tr key={item.product.id}>
                <td>
                  <img src={item.product.image} alt={item.product.name} />
                </td>
                <td>{item.product.name}</td>
                <td>${item.product.price}</td>
                <td>{item.quantity}</td>
                <td>${item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="return-btn">Return To shop</button>
      <button className="update-btn">Update Cart</button>
      <div className="cartTotal">
        <h1>Cart Total</h1>
        <div className="details">
          <h2>SubTotal: ${result.data.total}</h2>
          <h2>Total: ${result.data.total}</h2>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartTable;
