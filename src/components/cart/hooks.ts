import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import store from '../../redux/store';
import { addToCart } from './redux/addToCartSlice';
import { useGetCart } from '../../pages/viewCart/redux/hooks';

export const useAddToCart = () => {
  const { handleGetCart } = useGetCart();

  const result = useAppSelector((state) => state.addToCart);
  const dispatch = useAppDispatch();
  const handleAddToCart = (id: string) => {
    const token = store.getState().token.value || '';
    dispatch(addToCart({ id, token }));
    handleGetCart();
  };
  return {
    result,
    handleAddToCart,
  };
};
