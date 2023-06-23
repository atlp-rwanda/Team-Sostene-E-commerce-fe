import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Collection {
  name: string;
  id: string;
}

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const tokenOne = useAppSelector((state) => state.token.value);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}users/collections`, {
        headers: {
          Authorization: `Bearer ${tokenOne}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setCollections(response.data.data);
      })
      .catch(() => {
        setLoading(false);
        setError('An unexpected Error Occurred.');
      });
  }, [tokenOne]);

  return {
    loading,
    error,
    collections,
  };
};

export const useCreateCollection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = useAppSelector((state) => state.token.value);
  const handleCreate = (name: string) => {
    setLoading(true);
    setError('');
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}products/create-collection`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        toast.success(response.data.message);
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        if (error.response.data.code === 409) {
          setError('Collection Name Already Exists.');
        }
        setLoading(false);
        setError(
          error.response.data.error ||
            error.response.data.message ||
            'An unexpected error occurred.'
        );
      });
  };

  return {
    loading,
    handleCreate,
    error,
  };
};
