/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import store from '../redux/store';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}
const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const fetchData = async (): Promise<void> => {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${store.getState().token.value}`,
        },
      });
      if (response.status === 401) {
        navigate('/accounts/login');
      }
      setData(response?.data);
      setLoading(false);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
