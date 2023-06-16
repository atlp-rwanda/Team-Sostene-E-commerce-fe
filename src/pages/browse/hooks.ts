import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGetRow = (query: string) => {
  const [products, stProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`)
      .then((response) => {
        setLoading(false);
        stProducts(response.data.products);
      })
      .catch(() => {
        setLoading(false);
        setError('An Unexpected Error Occurred.');
      });
  }, [query]);

  return { error, products, loading };
};
