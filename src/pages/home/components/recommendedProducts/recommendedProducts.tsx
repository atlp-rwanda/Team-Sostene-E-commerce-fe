import styles from './recommendedProducts.module.scss';
import { useNavigate } from 'react-router-dom';
import routes from '../../../../utils/routes';
import { useAddToCart } from '../../../../components/cart/hooks';
import { useAppSelector } from '../../../../redux/hooks';

interface ProductsProps {
  data: {
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
  };
  showImage: (index: number, initial: boolean | undefined, id: string) => void;
  index: number;
}
export default function RecommendedProducts(props: ProductsProps) {
  const { data, showImage, index } = props;
  const { handleAddToCart } = useAddToCart();

  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token.value);
  const handleRedirectUser = (id: string) => (token ? handleAddToCart(id) : navigate(routes.login));

  return (
    <div className={styles.recommendedProducts}>
      <div
        className="imageBg"
        onClick={() => showImage(index, false, data.id)}
        style={{
          backgroundImage: `url("${data.productImages[2]?.url || data.productImages[0]?.url}")`,
        }}
      ></div>
      <div className="bottom">
        <div className="name">{data.name}</div>
        <div className="btns">
          <div className="price btn">${data.price}</div>
          <div className="action btn" onClick={() => handleRedirectUser(data.id)}>
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
