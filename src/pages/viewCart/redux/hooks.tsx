import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import store from '../../../redux/store';
import { getCart } from '../redux/getCartSlice';

export const useGetCart = () => {
  const result = useAppSelector((state) => state.getCart);
  const dispatch = useAppDispatch();

  const handleGetCart = () => {
    const token = store.getState().token.value || '';
    dispatch(getCart({ token }));
  };
  return {
    result,
    handleGetCart,
  };
};
