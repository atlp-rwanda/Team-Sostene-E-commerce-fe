import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import store from '../../redux/store';
import { addToCart } from './redux/addToCartSlice';
import { getCartData } from './redux/cartDataSlice';

export const useAddToCart = () => {
  const result = useAppSelector((state) => state.addToCart);
  const dispatch = useAppDispatch();
  const handleAddToCart = (id: string) => {
    const token = store.getState().token.value || '';
    dispatch(addToCart({ id, token }));
  };
  return {
    result,
    handleAddToCart,
  };
};

export const useGetCartData = () => {
  const data = useAppSelector((state) => state.cartData);
  const cart = useAppSelector((state) => state.addToCart);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.value) || '';
  useEffect(() => {
    dispatch(getCartData({ token }));
  }, [dispatch, token, cart]);
  return data;
};
