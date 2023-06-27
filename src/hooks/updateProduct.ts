/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { profileInterface } from '../pages/editProfiles/Main/profileSlice';
// import { addProfile } from '../pages/editProfiles/redux/userProfile';
import { BACKEND_URL } from '../utils/constants';

interface productDetails {
  productImages: { url: string }[];
  id: string;
  category: string;
  price: number;
  bonus: number;
  collectionId: string;
  createdAt: string;
  expDate: string;
  expiredflag: boolean;
  name: string;
  quantity: number;
  description: string;
}
export const useFetchProduct = (pid: string) => {
  const [data, setData] = useState<productDetails>({
    name: '',
    productImages: [{ url: '' }], // Update the initial state declaration
    id: '',
    category: '',
    price: 0,
    bonus: 0,
    collectionId: '',
    createdAt: '',
    expDate: '',
    expiredflag: false,
    quantity: 0,
    description: '',
  });
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const tokenOne = useAppSelector((state) => state.token.value);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/products/${pid}`, {
          headers: {
            Authorization: `Bearer ${tokenOne}`,
          },
        });
        setLoading(false);
        setData(response.data);
      } catch (error) {
        setLoading(false);
        setError(error as Error);
      }
    };
    getData();
  }, []);
  return {
    loading,
    data,
    error,
  };
};

export default useFetchProduct;
