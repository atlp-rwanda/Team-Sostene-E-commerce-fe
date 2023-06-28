import { useEffect, useState } from 'react';
import Handler from '../search/components/Handler';
import { PRODUCT } from '../../components/Product/redux/getTopProductsSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NoResult } from '../search/Search';

const useCategories = (category: string, min: string, max: string) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<PRODUCT[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }products/search?key=${category}&minPrice=${min}&maxPrice=${max}`
      )
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('An unexpected Error Occurred');
        setLoading(false);
      });
  }, [category, min, max]);

  return {
    loading,
    products,
    error,
  };
};

export default function Categories() {
  const { cat } = useParams<string>();
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('100000000');
  const { products, loading, error } = useCategories(cat || '', min, max);
  return (
    <div className="w-full">
      <div className="w-full border-b border-translucent p-2 py-5 flex flex-col md:flex-row justify-between">
        <p className="text-lg">{cat}</p>
        <div className="flex flex-row mt-5 md:mt-0">
          <div className="flex flex-row justify-center items-center">
            <p className="mr-1">Min:</p>
            <input
              type="number"
              data-testid="min"
              onChange={(e) => setMin(e.target.value)}
              className="mr-2 p-1 focus:outline-none border-b border-translucent w-1/3"
            />
            <p className="mr-1">Max:</p>
            <input
              type="number"
              data-testid="max"
              onChange={(e) => setMax(e.target.value)}
              className="mr-2 p-1  focus:outline-none border-b border-translucent w-1/3"
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="w-full p-32 py-56 flex items-center justify-center text-center">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      ) : error !== '' ? (
        <p className=" w-full text-center pb-80">{error}</p>
      ) : products.length === 0 ? (
        <NoResult query={cat || ''} />
      ) : (
        <Handler title="" products={products} />
      )}
    </div>
  );
}
