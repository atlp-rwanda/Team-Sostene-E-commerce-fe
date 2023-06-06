import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './cart.module.scss';
import { useState } from 'react';
import { useGetCartData } from './hooks';
import { CART } from './redux/cartDataSlice';
import imageReplacement from '../../assets/ImageReplacement.png';
import { Link } from 'react-router-dom';

function CartBox(props: { cart: CART; loading: boolean; error: string }) {
  const { loading, error, cart } = props;
  return (
    <div className="w-64 bg-white absolute top-12 right-10">
      <div className="p-2 bg-orange flex flex-row justify-between items-center">
        <p className="font-semibold">Cart</p>
        <Link to="/cart" className={styles.link}>
          Go To Cart
        </Link>
      </div>
      <div className={styles.cart__container}>
        {error != '' ? <p>{error}</p> : ''}
        {loading ? <p className=" bg-orange my-1 p-1 h-1 rounded animate-pulse"></p> : ''}
        <div className={styles.cart__scroll}>
          {cart.products.map((item, index) => (
            <CartItem
              key={index}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              image={item.product.image}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between p-2 bg-orange">
        <div className="">Total Price</div>
        <div className="text-md font-bold">${cart.total}</div>
      </div>
    </div>
  );
}

export function CartItem(props: { name: string; price: number; quantity: number; image: string }) {
  const { name, price, quantity, image } = props;
  const img = image === '' ? imageReplacement : image;
  return (
    <div className={styles.item}>
      <div className={styles.item__image}>
        <img src={img} alt="image" />
      </div>
      <div className={styles.item__des}>
        <div className={styles.item__name}>{name}</div>
        <div className={styles.item__num}>
          <div className={styles.item__price}>{price}</div>
          <div className={styles.item__qty}>x{quantity}</div>
        </div>
      </div>
    </div>
  );
}

export function CartIcon() {
  const [view, setView] = useState(false);
  const response = useGetCartData();
  const { loading, cart, error } = response;
  const num = cart.products.length;
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
      {view ? <CartBox cart={cart} loading={loading} error={error} /> : ''}
    </div>
  );
}

export default CartBox;
