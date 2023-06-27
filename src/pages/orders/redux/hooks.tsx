import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import store from '../../../redux/store';
import { getOrder } from './trackOrderSlice';

export const useGetOrderStatus = () => {
  const result = useAppSelector((state) => state.getOrderStatus);
  const dispatch = useAppDispatch();

  const handleGetOrderStatus = () => {
    const token = store.getState().token.value || '';
    dispatch(getOrder({ token }));
  };
  return {
    result,
    handleGetOrderStatus,
  };
};
export { useAppDispatch, useAppSelector };
