import { useState } from 'react';
import PopUpMaker from '../../../../designComponents/popupMaker/popUpMaker';
import PreviewCard from '../previewCard/previewCard';
import RatingsCounter from '../../../../designComponents/ratingsCounter/ratingsCounter';
import styles from './cardItem.module.scss';

interface cardDetails {
  product: {
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
}

export default function CardItem(props: cardDetails) {
  const { product } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  product.ratings = 4;

  const handlePreviewCard = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className={styles.cardItem} data-testid="cardItemId">
      {isPopupOpen && (
        <PopUpMaker Component={PreviewCard} card={product} setIsPopupOpen={setIsPopupOpen} />
      )}
      <div className="cardContent" onClick={handlePreviewCard}>
        <div className="discount">30%</div>
        <div className="delete">
          <img src="./svgs/delete.svg" alt="Delete icon" className="icon" />
        </div>
        <div className="image">
          {product.productImages && (
            <img src={product.productImages[0]?.url} alt="Delete icon" className="imageProduct" />
          )}
        </div>
        <div className="title">{product.name}</div>
        <div className="prices">
          <span className="newPrice">${product.price}</span>
        </div>
        <div className="ratingsCard">
          {product.ratings && <RatingsCounter rating={product.ratings} />}
        </div>
      </div>
    </div>
  );
}
