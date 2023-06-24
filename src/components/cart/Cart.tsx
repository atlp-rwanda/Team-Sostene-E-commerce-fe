import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './cart.module.scss';
import { useState } from 'react';
import { CART } from './redux/cartDataSlice';
import imageReplacement from '/images/ImageReplacement.png';
import { Link } from 'react-router-dom';
import { useGetCart } from '../../pages/viewCart/redux/hooks';
import { Rating } from '../Product/ProductCard';

function CartBox(props: { cart: CART; loading: boolean; error: string }) {
  const { loading, error, cart } = props;
  return (
    <div className="w-64 bg-white absolute z-30 top-12 right-10 border-translucent border">
      <div className="p-2 bg-orange flex flex-row justify-between items-center ">
        <p className="font-semibold">Cart</p>
        <Link to="/cart" className={styles.link}>
          Go To Cart
        </Link>
      </div>
      <div className={styles.cart__container}>
        {error != '' ? <p>{error}</p> : ''}
        {loading ? (
          <p className="flex items-center justify-center py-2">
            <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
          </p>
        ) : (
          <div className={styles.cart__scroll}>
            {cart.products.map((item, index) => (
              <CartItem
                key={index}
                id={item.product.id}
                name={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                image={item.product.image}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-between p-2 bg-orange">
        <div className="">Total Price</div>
        <div className="text-md font-bold">${cart?.total}</div>
      </div>
    </div>
  );
}

export function CartItem(props: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}) {
  const { name, price, quantity, image, id } = props;
  const img = image === '' ? imageReplacement : image;
  return (
    <div className="flex flex-row items-start justify-between p-1 border border-translucent my-1">
      <div className="mr-2">
        <img src={img} className="w-20" alt="image" />
      </div>
      <div className="flex flex-col w-full justify-start h-full">
        <div className="text-xs font-semibold">{name}</div>
        <div className=" text-xs  ">
          <Rating id={id} />
        </div>
        <div className={styles.item__num}>
          <div className={styles.item__price}>${price}</div>
          <div className="">x{quantity}</div>
        </div>
      </div>
    </div>
  );
}

export function CartIcon() {
  const [view, setView] = useState(false);
  const { result } = useGetCart();
  const { loading, data, error } = result;
  const num = data.products.length;
  return (
    <div className="px-2 cursor-pointer">
      <div data-testid="cart-icon" onClick={() => setView((prev) => !prev)}>
        {num != 0 ? (
          <div className="bg-orange rounded-full top-0 absolute ml-3 mt-2 w-4 h-4 flex items-center justify-center text-xs">
            {num}
          </div>
        ) : (
          ''
        )}
        <FontAwesomeIcon icon="cart-shopping" />
      </div>
      {view && (
        <div
          className="w-screen h-screen z-20 absolute left-0 top-0"
          onClick={() => setView(false)}
        ></div>
      )}
      {view && <CartBox cart={data} loading={loading} error={error} />}
    </div>
  );
}

export default CartBox;
