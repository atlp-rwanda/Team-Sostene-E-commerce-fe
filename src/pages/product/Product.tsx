import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Product, getProduct } from './redux/productSlice';
import ScrollToTop from './ScrollToTop';
import { useAddToCart } from '../../components/cart/hooks';
import Reviews from '../feebdacks/Reviews';

export default function ProductPage() {
  const { id } = useParams<string>();
  const result = useProductData(id || '');
  return (
    <div data-testid="product-page" className="w-full mt-20">
      <ScrollToTop />
      <div className="w-full flex justify-center flex-row">
        {result.loading ? (
          <div className="w-full p-32 py-56 flex items-center justify-center text-center">
            <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
          </div>
        ) : (
          ''
        )}
        {result.error != '' ? <p>{result.error}</p> : ''}
        {result.product && !result.loading ? <Main product={result.product} /> : ''}
        {result.product && !result.loading ? <Main product={result.product} productId={id} /> : ''}
        </div>
      <ParallaxBanner
        text="Elevate your lifestyle with these recommended gems."
        image="https://wallpaperboat.com/wp-content/uploads/2019/09/autumn-forest-Wallpaper.jpg"
        link="browse"
      />
            <Reviews productId={id} />
    </div>

  );
}

function toDateFormat(date: string) {
  const dateFormatted = new Date(date);
  return dateFormatted.toLocaleDateString();
}

export function Main({ product }: { product: Product; productId?: string }) {
  const { handleAddToCart } = useAddToCart();
  const createdAt = toDateFormat(product.createdAt);
  const expAt = toDateFormat(product.expDate);
  return (
    <div className="w-full tablet:w-5/6 mb-10 flex items-start justify-between border-b border-b-translucent flex-col tablet:flex-row">
      <Preview images={product.productImages || [{ url: '' }]} />
      <div className=" w-full tablet:w-1/2">
        <div className="p-5 tablet:p-10  flex flex-col">
          <p className="text-3xl ">{product.name}</p>
          <div className="w-full flex flex-row justify-start items-center">
            <p className="text-xl text-md my-3 text-orange font-semibold text-left">
              ${product.price}
            </p>
            <p className="text-xs bg-orange text-black p-1 ml-5 opacity-70">
              with bonus: {product.bonus}%
            </p>
          </div>
          <p className="text-md p-1 border-b border-b-translucent">Category: {product.category}</p>
          <p className="text-sm my-3 italic ">
            mfg.: {createdAt}, exp.: {expAt}
          </p>
          <div className="p-2 flex flex-row items-end justify-start text-xl w-2/3">
            <p className="p-1 text-sm text-center flex justify-center items-center  h-5 rounded-sm bg-orange text-black">
              {product.quantity}
            </p>
            <p className="text-sm ml-1">Left in Stock</p>
          </div>
          <p className="text-md py-2 border-b max-h-80 px-5 overflow-scroll border-b-translucent font-light">
            {product.description}
          </p>
          <div className="w-full flex items-center py-5 justify-start border-b border-b-translucent">
            <button
              onClick={() => handleAddToCart(product.id)}
              className="p-3 cursor-pointer bg-orange text-white mr-5"
            >
              BUY NOW
            </button>
            <button className="p-3 cursor-pointer bg-white text-orange border border-translucent">
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SmallImage = ({ image, onSelect }: { image: string; onSelect: (img: string) => void }) => {
  return (
    <div
      onMouseEnter={() => onSelect(image)}
      className=" w-full flex items-center justify-center cursor-pointer"
    >
      <img src={image} alt="image small " className="w-ful hover:opacity-50 border-translucent" />
    </div>
  );
};

const MainImage = ({ image }: { image: string }) => {
  return (
    <div className=" flex items-center justify-center">
      <img src={image} className="w-full" />
    </div>
  );
};

const Preview = ({ images }: { images: { url: string }[] }) => {
  const initialImage = images[0] ? images[0] : { url: 'https://i.ibb.co/LRz8tCM/Shop-Spree.png' };
  const [main, setMain] = useState<string>(initialImage.url);
  const handelSetMain = (main: string) => {
    setMain(main);
  };
  return (
    <div className="w-full tablet:w-1/2 ">
      <div className="p-2 w-full flex  overflow-x-auto flex-col items-center justify-center">
        <div className="p-2 w-full h-80 overflow-scroll flex items-center justify-center border border-translucent rounded-md">
          <MainImage image={main || initialImage.url} />
        </div>
        <div className="w-full overflow-x-scroll tablet:grid flex-row">
          <div className="w-full max-h-40 p-2 grid grid-cols-4 gap-2 justify-between flex-row  tablet:grid tablet:overflow-y-scroll tablet:grid-cols-5">
            {images.length != 0
              ? images.map((img, index) => (
                  <SmallImage onSelect={handelSetMain} key={index} image={img.url} />
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export const useProductData = (id: string) => {
  const result = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  return result;
};

export function ParallaxBanner({
  text,
  link,
  image,
}: {
  text: string;
  link: string;
  image: string;
}) {
  return (
    <div
      className="w-full p-5 justify-center object-center flex flex-wrap items-center"
      style={{
        background: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <p className="mx-5 text-white text-xl text-center pb-5">{text}</p>
      <Link to={`/${link}`}>
        <p className="p-3 bg-orange">Start exploring now!</p>
      </Link>
    </div>
  );
}
