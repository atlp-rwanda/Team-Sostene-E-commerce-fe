import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import {
  initialStateProductInterface,
  initialStateProducts,
  setProduct,
} from '../pages/dashboard/addProductToCollection/addProduct.slice';

export const usePostProductToDB = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const token = useAppSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const handleAddToDB = async (cid: string, product: initialStateProductInterface) => {
    try {
      setLoading(true);
      const formData = new FormData();
      for (const img of product.image) {
        formData.append('image', img.file);
      }
      formData.append('productName', product.productName);
      formData.append('productPrice', String(product.productPrice));
      formData.append('quantity', String(product.quantity));
      formData.append('expDate', String(product.expDate));
      formData.append('category', product.category);
      formData.append('bonus', String(product.bonus));
      formData.append('description', product.description);
      const resp = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}products/collection/${cid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(resp.data);
      dispatch(setProduct(initialStateProducts.product));
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };

  return {
    handleAddToDB,
    isLoading,
    data,
    error,
  };
};
