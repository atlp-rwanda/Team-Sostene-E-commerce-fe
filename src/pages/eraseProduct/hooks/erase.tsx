import axios from 'axios';
import { useAppDispatch } from '../../../redux/hooks';
import store from '../../../redux/store';
import { removeProduct } from '../../../redux/slices/productSlice';
import { useState } from 'react';
import { clearProduct } from '../../../components/seller/components/sellerItems/sellerItemsFilters.slice';

interface ErrorData {
  response: {
    data: {
      code: number;
      message: string;
    };
  };
}

const useProductDelete = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<ErrorData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const deleteProduct = async (cid: string, pid: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}products/${cid}/delete/${pid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${store.getState().token.value}`,
          },
        }
      );
      setResponse(res.data);
      dispatch(removeProduct(pid));
      dispatch(clearProduct(pid));
      setLoading(false);
    } catch (error) {
      setError(error as ErrorData);
      setLoading(false);
    }
  };
  return { response, loading, error, deleteProduct };
};
export { useProductDelete };
