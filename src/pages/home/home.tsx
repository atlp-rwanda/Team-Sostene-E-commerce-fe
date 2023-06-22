import TopProducts from '../../components/Product/TopProducts';
import HomeCards from './components/IntroCards/HomeCards';
import HomeParallax from './components/parallax/homeParallax';
import ProductMountainSlider from './components/productMountainSlider/productMountainSlider';
import styles from './home.module.scss';
import useFetch from '../../hooks/useFetch';
import { BACKEND_URL } from '../../utils/constants';
import ProductCard from '../../components/Product/ProductCard';

export interface cardDetails {
  products: {
    productImages: { url: string }[];
    details?: string;
    id: string;
    category: string;
    ratings?: number;
    price: number;
    bonus: number;
    collectionId: string;
    createdAt?: string;
    expDate: string;
    expiredflag: boolean;
    name: string;
    quantity: number;
  }[];
  message: string;
  page: number;
  totalPages: number;
}

function Home() {
  const url = `${BACKEND_URL}/products/all?page=1&limit=10`;
  const { data } = useFetch(url);
  const instantData: cardDetails | null = data as cardDetails | null;
  const products = instantData?.products;

  return (
    <div className={styles.home}>
      <div className="wrapperHome">
        <div className="homeSlides" data-testid="home">
          <HomeParallax />
          <TopProducts />
        </div>
        <div className="newProducts">
          <div className="title">New Release</div>
          <div className="slides_of_Products">
            {products && <ProductMountainSlider imageData={products} />}
          </div>
        </div>

        {products && (
          <div className="recommendedProducts">
            <div className="title">Recommended Products</div>
            <div className="productsLists">
              {products.map((product) => (
                <div key={product.id} className="product">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={
                      product.productImages[1]?.url || 'https://i.ibb.co/LRz8tCM/Shop-Spree.png'
                    }
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="homeSlides homeCards">
          <HomeCards />
        </div>
      </div>
    </div>
  );
}

export default Home;
