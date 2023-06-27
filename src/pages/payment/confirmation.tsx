import { useNavigate } from 'react-router-dom';
import all from '../../../public/svgs/Vector.svg';
import styles from './confirm.module.scss';
import { decodeToken, useFetchOrder, useGetShippingAddress, useGetUrl } from './hooks/hooks';
import { ButtonLoader } from '../../components/Loaders/Loaders';
import store from '../../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/reusables/Reusable';
import Page404 from '../page404/page404';
import { useEffect } from 'react';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const { stripeError, stripeUrl } = useGetUrl();
  const { fetchOrder, loading, order, error } = useFetchOrder();
  useEffect(() => {
    stripeUrl && fetchOrder(stripeUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeUrl]);
  const { loads, errors, shippingAddress } = useGetShippingAddress();

  const redirect = () => {
    navigate('/');
  };

  if (loading || loads) {
    return (
      <div className={styles.loading}>
        <ButtonLoader />
      </div>
    );
  } else if (error || errors || stripeError) {
    return (
      <div className="error_page">
        <Page404 />
      </div>
    );
  } else if (!shippingAddress?.shippingAddress) {
    return (
      <div className="error_page">
        <Page404 />
      </div>
    );
  }
  const products = order?.products.map((item, key) => {
    return (
      <p key={key}>
        {item.product.name} :${item.product.price}
      </p>
    );
  });
  const user = decodeToken(store.getState().token.value || '');
  return (
    <div className={styles.confirm}>
      <div className={styles.upper}>
        <img src={all} alt="" className={styles.logo} />

        {order?.status == 'succeeded' ? (
          <div className="up">
            <p>
              Hi <span>{user.username}</span>, Congratulations
            </p>
            <h3 className={styles.success}>
              PAYMENT SUCCESSFULL{' '}
              <span>
                <FontAwesomeIcon icon="circle-check" className={`${styles.settings}`} />
              </span>
            </h3>
          </div>
        ) : (
          <div className="up">
            <p>
              Hi <span>{user.username}</span>, Sorry !
            </p>
            <h3 className={styles.failed}>
              PAYMENT FAILED{' '}
              <span>
                <FontAwesomeIcon icon="circle-xmark" className={`${styles.failed}`} />
              </span>
            </h3>
          </div>
        )}

        <h1>{`Total:$${order?.totalPrice}`}</h1>
      </div>

      <div className={styles.lower}>
        <p>
          <span>Order ID : </span> {order?.id}
        </p>
        <div className={styles.products}>
          <span>Products:</span>
          {products}
        </div>
        <p>
          <span>Payment status :</span> <span>{order?.status}</span>
        </p>
        <p>
          {' '}
          <span>Shipping Address : </span>{' '}
        </p>
        {
          <div className="shipping">
            <p style={{ marginTop: '5px' }}>Country : {shippingAddress?.shippingAddress.country}</p>
            <p>City : {shippingAddress?.shippingAddress.city}</p>
            <p>Postal Code : {shippingAddress?.shippingAddress.postalCode}</p>
            <p>Street Address : {shippingAddress?.shippingAddress.streetAddress}</p>
            <p>Phone Number : {shippingAddress?.shippingAddress.phoneNumber}</p>
          </div>
        }
      </div>
      <div className={styles.buttonWrapper}>
        <Button size="full" type="submit" text={'DONE'} onClick={redirect} />
      </div>
    </div>
  );
};

export default PaymentConfirmation;
