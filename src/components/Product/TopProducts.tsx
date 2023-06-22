import Handler, { useTopProducts } from './Handler';

export default function TopProducts() {
  const products = useTopProducts();
  return (
    <div className="w-full">
      {products.loading && (
        <div className="w-full p-2 text-center">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      )}
      {products.products && products.products.length > 0 && (
        <Handler title="Top Products" products={products.products} />
      )}
    </div>
  );
}
