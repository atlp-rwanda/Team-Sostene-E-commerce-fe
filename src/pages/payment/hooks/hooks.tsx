/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useEffect, useState } from 'react';
import store from '../../../redux/store';
import jwtDecode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import { OrderObject, ShippingAddress, PaymentBody, DecodedToken } from '../types/types';

const useFetchOrder = (): {
  fetchOrder: (id: string) => Promise<void>;
  loading: boolean;
  order: OrderObject | null;
  error: Error | null;
} => {
  const [order, setOrder] = useState<OrderObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setOrder(res.data.order);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  return { fetchOrder, loading, order, error };
};

function decodeToken(token: string) {
  const decodedToken: DecodedToken = jwtDecode(token);
  return decodedToken;
}

const useGetShippingAddress = () => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [loads, setLoading] = useState<boolean>(true);
  const [errors, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${store.getState().token.value}`,
            },
          }
        );
        setShippingAddress(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    getAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.getState().token.value]);

  return { loads, errors, shippingAddress };
};

export default useGetShippingAddress;

const makePayment = async (rid: string, body: PaymentBody): Promise<any> => {
  const result = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}checkout/payment/${rid}`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${store.getState().token.value}`,
      },
    }
  );
  return result;
};

function replaceLoacation(url: string) {
  window.location.replace(url);
}
const useGetUrl = () => {
  const [stripeUrl, setUrl] = useState('');
  const [stripeloading, setStripeLoading] = useState(false);
  const [stripeError, setError] = useState<Error | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const myParam = queryParams.get('rid') || '';
  const stripeIntent = queryParams.get('payment_intent') || '';

  useEffect(() => {
    const fetchData = async () => {
      if (myParam) {
        setUrl(myParam);
      } else if (stripeIntent) {
        try {
          setStripeLoading(true);
          const result = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}checkout/redirect?payment_intent=${stripeIntent}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          setUrl(result.data.status.metadata.orderId);
          setStripeLoading(false);
        } catch (error) {
          setError(error as Error);
        }
      }
    };

    fetchData();
  }, [myParam, stripeIntent]);

  return { stripeloading, stripeError, stripeUrl };
};
export {
  useFetchOrder,
  makePayment,
  useGetShippingAddress,
  decodeToken,
  replaceLoacation,
  useGetUrl,
};
