import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchProduct } from './redux/searchSlice';

type hooKParam = {
  query?: string;
};

export const useSearchProducts = ({ query }: hooKParam) => {
  const result = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(searchProduct(query || ''));
  }, [dispatch, query]);

  return result;
};
