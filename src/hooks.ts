import { useDispatch } from 'react-redux';
import { setToken } from './redux/slices/tokenSlice';

export const useSetToken = () => {
  const dispatch = useDispatch();
  let isSet = false;
  const makeToken = (token: string) => {
    dispatch(setToken(token));
    isSet = true;
  };

  return {
    makeToken,
    isSet,
  };
};
