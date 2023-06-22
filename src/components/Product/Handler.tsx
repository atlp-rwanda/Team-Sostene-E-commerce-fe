import { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { PRODUCT, fetchTopProducts } from './redux/getTopProductsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface HandlerProps {
  title: string;
  products: PRODUCT[];
}

export const useTopProducts = () => {
  const products = useAppSelector((state) => state.topProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return products;
};

export default function Handler(props: HandlerProps) {
  const { title, products } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollToStart = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 200,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToEnd = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10 text-black flex flex-col p-1">
        <div className="flex justify-between">
          <div className="">
            <p className="w-full text-left text-xl pb-4 pl-8 title">{title}</p>
          </div>
        </div>
        <div className="flex-1 flex overflow-auto smooth-scroll" ref={containerRef}>
          <div
            onClick={handleScrollToStart}
            data-testid="left"
            className="left-0 mt-2 absolute z-2 p-1 h-72 flex justify-center items-center cursor-pointer text-gray-300 bg-translucent"
          >
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div
            onClick={handleScrollToEnd}
            data-testid="right"
            className="right-0 mt-2 absolute z-2 p-1 h-72 flex justify-center items-center cursor-pointer text-gray-300 bg-translucent"
          >
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
          <div className="p-2 w-full flex flex-row justify-start min-w-min">
            {products
              ?.slice(0, 10)
              .reverse()
              .map((product, index) => (
                <div key={index} className="w-60 mx-3">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={
                      product.productImages[0]?.url || 'https://i.ibb.co/LRz8tCM/Shop-Spree.png'
                    }
                    price={product.price}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
