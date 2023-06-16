/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import '../viewCart/cart.scss';
import { BACKEND_URL } from '../../utils/constants';
import { useAppSelector, useGetCart } from './redux/hooks';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import { Cart, CartProduct } from '../../utils/types/product';
import axios from 'axios';

function CartTable() {
  const [editPermission, setEditPermission] = useState(false);
  const [cartData, setCartData] = useState<Cart | null>();
  const [simpleLoading, setSimpleLoading] = useState(false);
  const [prodQuantity, setprodQuantity] = useState({ id: 'id', qty: 1 });
  const [messageErrorUpdate, setMessageErrorUpdate] = useState<Error | null>(null);
  const { handleGetCart, result } = useGetCart();

  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    handleGetCart();
  }, []);

  useEffect(() => {
    if (result.loading === false) {
      setCartData(result.data);
    }
  }, [result.loading, result.data]);

  const handlePermissionToEdit = () => {
    setEditPermission(true);
  };

  const handleDeleteItem = async (id: string) => {
    setprodQuantity({ id, qty: 1 });
    setSimpleLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/cart/${id}`, { headers });
      setSimpleLoading(false);
      handleGetCart();
    } catch (error) {
      setSimpleLoading(false);
      setMessageErrorUpdate(error as Error);
      setTimeout(() => {
        setMessageErrorUpdate(null);
      }, 3000);
    }
  };

  const handleChangeQuantiySingle = async (qty: number, id: string) => {
    setSimpleLoading(true);
    try {
      await axios.put(`${BACKEND_URL}/cart/update/${id}`, { quantity: qty }, { headers });
      setSimpleLoading(false);
      handleGetCart();
    } catch (error) {
      setSimpleLoading(false);
      setMessageErrorUpdate(error as Error);
      setTimeout(() => {
        setMessageErrorUpdate(null);
      }, 3000);
    }
  };

  const handleCHangeQuantiy = (id: string, quantity: number) => {
    if (cartData && cartData.products.length > 0) {
      cartData.products.filter((product: CartProduct) => {
        if (product.product.id === id) {
          setprodQuantity({ id, qty: quantity });
          if (quantity > 0) {
            handleChangeQuantiySingle(quantity, id);
          }
        }
      });
    }
  };

  const handleDoneWithUpdate = () => {
    setEditPermission(false);
    handleGetCart();
    setprodQuantity({ id: 'id', qty: 1 });
  };

  return (
    <div>
      {result.loading && (
        <div className="w-full p-2 py-64 text-center" data-testid="loading-spinnerCart">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      )}
      {cartData && cartData.products.length === 0 && (
        <div className="cardBox">
          <h1 className="cartEmpty">You have no products in your cart 🛒...</h1>
        </div>
      )}
      {cartData && cartData.products.length > 0 && (
        <div className="tableContainer_container">
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  {editPermission && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {cartData.products.map((item) => {
                  return (
                    item.quantity > 0 && (
                      <tr key={item.product.id}>
                        <td>
                          <img src={item.product.image} alt={item.product.name} />
                        </td>
                        <td>{item.product.name}</td>
                        <td>${item.product.price}</td>
                        <td className="qtyField">
                          {simpleLoading && prodQuantity.id === item.product.id && (
                            <small className="simpleLoading">
                              <i
                                className="fa fa-spinner fa-spin text-orange spinnerr"
                                aria-hidden="true"
                              ></i>
                            </small>
                          )}
                          {editPermission ? (
                            <input
                              type="number"
                              role="changeQuantity"
                              min={1}
                              value={
                                prodQuantity.id === item.product.id
                                  ? prodQuantity.qty
                                  : item.quantity
                              }
                              className="changeQuantity"
                              onChange={(e) =>
                                handleCHangeQuantiy(item.product.id, Number(e.target.value))
                              }
                            />
                          ) : (
                            item.quantity
                          )}
                          {messageErrorUpdate && prodQuantity.id === item.product.id && (
                            <small className="errorUpdate">{messageErrorUpdate.message}</small>
                          )}
                        </td>
                        <td>
                          $
                          {editPermission && prodQuantity.id === item.product.id
                            ? item.product.price * prodQuantity.qty
                            : item.product.price * item.quantity}
                        </td>
                        {editPermission && (
                          <td>
                            <button
                              className="delete"
                              onClick={() => handleDeleteItem(item.product.id)}
                            >
                              {simpleLoading && prodQuantity.id === item.product.id
                                ? 'Loading...'
                                : 'Delete'}
                            </button>
                          </td>
                        )}
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
          {editPermission && (
            <div className="actions">
              <button className="cancel" onClick={() => setEditPermission(false)}>
                Cancel
              </button>
              <button className="save" onClick={handleDoneWithUpdate}>
                Done
              </button>
            </div>
          )}
          {!editPermission && (
            <div className="permissionOffBtns actions">
              <Link to={routes.home} className="return-btn">
                Return To Shop
              </Link>
              <button className="update-btn" onClick={handlePermissionToEdit}>
                Update Cart
              </button>
            </div>
          )}
          <div className={editPermission ? 'bottomActions' : 'bottomActions bottomActions_center'}>
            <div className="cartTotal">
              <h1>Cart Total</h1>
              <div className="details">
                <h2>SubTotal: ${cartData?.total || ''}</h2>
                <h2>Total: ${cartData?.total || ''}</h2>
                <button onClick={() => setEditPermission(false)}>Proceed To Checkout</button>
              </div>
            </div>
            {editPermission && (
              <div className="btnDeleteBox">
                <button className=" delete">Clear All Items</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartTable;
