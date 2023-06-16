import { Route, Routes } from 'react-router-dom';
import Handler from '../../components/Product/Handler';
import { useGetRow } from './hooks';
import { ParallaxBanner } from '../product/Product';

export default function Browse() {
  return (
    <div className="pt-10 py-5">
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export function Main() {
  return (
    <div className="">
      <Row query="Mobile Phones & Tablets" />
      <Row query="Computer & Laptops" />
      <ParallaxBanner
        image="https://wallpapercave.com/wp/wp5256714.jpg"
        text={`Get the most out of your shopping experience by signing up with us. As a member, you'll enjoy perks like early access to sales, exclusive product launches, and a personalized shopping feed. Don't miss out!`}
        link="accounts/signup"
      />
      <Row query="Clothing" />
      <Row query="Mens Fashion" />
    </div>
  );
}

export function Row({ query }: { query: string }) {
  const { error, products, loading } = useGetRow(query);
  return (
    <div className="px-5">
      {error != '' ? <p>{error}</p> : ''}
      {loading ? (
        <div className="w-full p-32 py-56 flex items-center justify-center text-center">
          <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
        </div>
      ) : (
        <Handler title={query} products={products} />
      )}
    </div>
  );
}
