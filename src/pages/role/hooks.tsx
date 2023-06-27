import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { getUsers } from './redux/assignRolesSlice';

export const useFetchUsers = () => {
  const token = useAppSelector((state) => state.token.value) || '';
  const isFetched = useAppSelector((state) => state.getUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsers({ token }));
  }, [dispatch, token]);

  return isFetched;
};
