/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Key, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReverseProtectedComponent } from '../../../../components/roles/Protected';

export default function HomeCards() {
  return (
    <div className="w-full my-5 justify-center flex flex-wrap items-center gap-3">
      <Categories title="Top picks for you" query="m" />
      <ReverseProtectedComponent replace={<AnimatedCard />}>
        <JoinUsCard />
      </ReverseProtectedComponent>
      <Categories title="Amazing deals" query="car" />
      <CategoryCard text="Mobile phones & Tablets" />
      <Categories title="Trending clothes" query="clothing" />
    </div>
  );
}

const useFetch = (query: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async (query: string) => {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`)
        .then((response) => {
          setProducts(response.data.products);
          setLoading(false);
        })
        .catch(() => {
          setError('Network Error.');
          setLoading(false);
        });
    };
    fetchProducts(query);
  }, [query]);

  return {
    loading,
    error,
    products,
  };
};

export function Categories({ query, title }: { query: string; title: string }) {
  const { products, loading, error } = useFetch(query);
  return (
    <div className="w-80 border bg-white border-translucent">
      <p className="p-2 ">{title}</p>
      {error != '' ? (
        <div className="w-full p-32 flex items-center justify-center text-center">
          <p>{error}</p>
        </div>
      ) : (
        ''
      )}
      {loading ? (
        <div className="w-full p-32 flex items-center justify-center text-center">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 items-center place-content-center">
          {products?.slice(0, 4).map((product: any, index: Key | null | undefined) => (
            <div key={index} className="w-full p-2">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.productImages[0]?.url || 'https://i.ibb.co/LRz8tCM/Shop-Spree.png'}
                  className="max-h-32"
                  alt=""
                />
              </Link>
              <p className="text-sm px-2">{product.name}</p>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex bg-orange flex-col p-2 items-center justify-center">
        <a className="w-full text-white">See More</a>
      </div>
    </div>
  );
}

export function AnimatedCard() {
  return (
    <div data-testid="animated-card" className="w-80 bg-orange border border-translucent">
      <img className="w-full" src="https://i.ibb.co/cF8W7YY/Shop-Spree.gif" alt="animated" />
    </div>
  );
}

export function JoinUsCard() {
  return (
    <div data-testid="joinus-card" className="w-80 bg-orange border border-translucent">
      <img
        className="w-full"
        src="https://us.123rf.com/450wm/deagreez/deagreez2202/deagreez220200172/181380951-photo-of-good-mood-young-stunning-girl-shopaholic-buy-purchase-black-friday-discount-isolated-on.jpg?ver=6"
        alt="animated"
      />
      <div className="w-full flex flex-col p-5 items-center justify-center">
        <p className=" font-semibold text-white w-full text-center my-3">
          Become a valued member of our ecommerce family.
        </p>
        <Link to="accounts/signup" className="p-2 px-5 bg-white rounded-md">
          Join Us
        </Link>
      </div>
    </div>
  );
}

export function CategoryCard({ text }: { text: string }) {
  return (
    <div className="w-80 bg-orange border border-translucent">
      <p className="p-2 text-white">{text}</p>
      <img
        className="w-full"
        src="https://www.three.co.uk/blog/iphone-13-vs-iphone-12-the-key-differences/_jcr_content/root/container/container-main-section/column-left/image_copy_copy.coreimg.png/1679586746292/iphone-13.png"
        alt="animated"
      />
      <div className="w-full flex flex-col p-2 items-center justify-center">
        <Link to={`/category/${text}`} className="w-full text-white">
          See More
        </Link>
      </div>
    </div>
  );
}
