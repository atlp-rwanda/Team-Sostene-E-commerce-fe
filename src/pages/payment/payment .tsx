import styles from './payment.module.scss';
import all from '../../../public/images/160-1604068_index-of-catalog-logos-visa-mastercard-american-express.png';
import { InputWithLabel, Button } from '../../components/reusables/Reusable';
import { useFetchOrder, makePayment, replaceLoacation } from './hooks/hooks';
import { useLocation } from 'react-router';
import { ButtonLoader } from '../../components/Loaders/Loaders';
import { useFormik } from 'formik';
import { validationSchema } from './Schema/validationSchema';
import { useRef, useState, useEffect, ChangeEvent } from 'react';
import Page404 from '../page404/page404';

const Payment = () => {
  const [isPending, setisPending] = useState(false);
  const errorDiv = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const queryParameter = new URLSearchParams(location.search);
  const myParam = queryParameter.get('rid') || '';
  const { fetchOrder, order, loading, error } = useFetchOrder();
  useEffect(() => {
    fetchOrder(myParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myParam]);

  async function handle(values: {
    expMonth: string;
    cvc: string;
    expYear: string;
    cardNumber: string;
  }) {
    errorDiv.current && (errorDiv.current.textContent = '');
    setisPending(true);
    try {
      await makePayment(myParam, values);
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.message) {
        errorDiv.current && (errorDiv.current.textContent = error.response.data.message);
        setisPending(false);
      } else if (error.response.data.Message) {
        replaceLoacation(error.response.data.Action);
        setisPending(false);
      } else {
        errorDiv.current && (errorDiv.current.textContent = error.message);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvc: '',
    },
    validationSchema,
    onSubmit: (values: { cardNumber: string; expMonth: string; expYear: string; cvc: string }) => {
      setisPending(true);
      handle(values);
    },
  });
  const handlecardNumber = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const numericValue = value.replace(/\D/g, ''); // Removing non-numeric characters
    const maxLength = 16;
    const truncatedValue = numericValue.slice(0, maxLength); // Truncate the value if it exceeds the maximum length
    formik.setFieldValue(name, truncatedValue);
    formik.setFieldTouched(evt.target.name, true, false);
  };
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldTouched(event.target.name, true, false);
    formik.handleChange(event);
  };
  if (loading) {
    return (
      <div className={styles.loading}>
        <ButtonLoader />
      </div>
    );
  } else if (error) {
    return (
      <div className="error_page">
        <Page404 />
      </div>
    );
  }
  return (
    <div className={styles.payment}>
      <div className={styles.total}>
        <p>{`$ ${order?.totalPrice}`}</p>
      </div>
      <div className={styles.form}>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className={styles.heading}>
            <div className={styles.text}>
              <h1 className={styles.header}>Payments</h1>
              <p className={styles.mini}>Pay with different cards</p>
            </div>
            <img src={all} alt="" className={styles.visa_logo} />
          </div>
          <div className={styles.error_message} ref={errorDiv} data-testid="error_div"></div>
          <InputWithLabel
            type="text"
            label="CARD NUMBER"
            name="cardNumber"
            id="cardNumber"
            textId="cardNumber"
            value={formik.values.cardNumber}
            onChange={handlecardNumber}
            mode={'numeric'}
            placeholder="1234   1234   1234   1234"
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <div className={styles.text_error} data-testid="div3">
              {formik.errors.cardNumber}
            </div>
          )}
          <div className={styles.date}>
            <div className={styles.month}>
              <InputWithLabel
                type="text"
                label="EXP-MONTH"
                name="expMonth"
                id="expMonth"
                textId="expMonth"
                value={formik.values.expMonth}
                onChange={handleFieldChange}
                placeholder="MM"
              />
              {formik.touched.expMonth && formik.errors.expMonth && (
                <div className={styles.text_error} data-testid="div3">
                  {formik.errors.expMonth}
                </div>
              )}
            </div>
            <div className={styles.year}>
              <InputWithLabel
                type="text"
                label="EXP-YEAR"
                name="expYear"
                id="expYear"
                textId="expYear"
                value={formik.values.expYear}
                onChange={handleFieldChange}
                placeholder="YYY"
              />
              {formik.touched.expYear && formik.errors.expYear && (
                <div className={styles.text_error} data-testid="div3">
                  {formik.errors.expYear}
                </div>
              )}
            </div>
          </div>
          <div className={styles.cvc}>
            <div className={styles.input}>
              <InputWithLabel
                type="text"
                label="CVC"
                name="cvc"
                id="cvc"
                textId="cvc"
                value={formik.values.cvc}
                onChange={handleFieldChange}
                placeholder="CVC"
              />
              {formik.touched.cvc && formik.errors.cvc && (
                <div className={styles.text_error} data-testid="div3">
                  {formik.errors.cvc}
                </div>
              )}
            </div>
            <p>3 to 4 Digits</p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button size="full" type="submit" loading_state={isPending} text={'PAY NOW'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
