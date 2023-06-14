import ProductCard from '../../../components/Product/ProductCard';
import { Result } from '../redux/searchSlice';

interface HandlerProps {
  title: string;
  products: Result[];
}

export default function Handler({ title, products }: HandlerProps) {
  return (
    <div className="min-h-screen p-2 py-5 flex flex-col justify-start items-start text-white text-center bg-slate-400 sm:p-8">
      <div className="w-full text-black text-start text-2xl mb-5">{title}</div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.productImages[0]?.url || 'https://i.ibb.co/LRz8tCM/Shop-Spree.png'}
            name={product.name}
            price={product.price}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
}
