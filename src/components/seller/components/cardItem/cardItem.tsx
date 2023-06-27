import { useEffect, useState } from 'react';
import PopUpMaker from '../../../../designComponents/popupMaker/popUpMaker';
import PreviewCard from '../previewCard/previewCard';
import RatingsCounter from '../../../../designComponents/ratingsCounter/ratingsCounter';
import styles from './cardItem.module.scss';
import DeleteProduct from '../../../../pages/eraseProduct/main';
import React from 'react';
import axios from 'axios';

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
  const [loading, setloading] = useState(false);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setloading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}reviews/rating/${product.id}`
        );
        if (response.data.rating) {
          setRating(response.data.rating);
        } else {
          setRating(0);
        }
        setloading(false);
      } catch (error) {
        setRating(0);
        setloading(false);
      }
    };
    product.id != '' && fetchRating();
    // if (product.id != '') {
    //   fetchRating();
    // }
  }, [product.id]);

  const handlePreviewCard = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLDivElement;
    if (
      !clickedElement.classList.contains('delete_icon') &&
      !clickedElement.classList.contains('cancelParent') &&
      !clickedElement.classList.contains('ReactModal__Overlay') &&
      !clickedElement.classList.contains('ReactModal__Content') &&
      !clickedElement.classList.contains('_btn_container_1oe6r_32') &&
      !clickedElement.classList.contains('deleteParent') &&
      !clickedElement.classList.contains('text')
    ) {
      setIsPopupOpen(true);
      return;
    }
  };
  function disable() {
    setIsPopupOpen(false);
  }
  return (
    <div className={styles.cardItem} data-testid="cardItemId">
      {isPopupOpen && (
        <PopUpMaker card={product} Component={PreviewCard} setIsPopupOpen={setIsPopupOpen} />
      )}
      <div className="cardContent" onClick={handlePreviewCard}>
        <div
          className="flex"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'absolute',
            width: '95%',
            margin: '5px',
          }}
        >
          <div className="discount">30%</div>
          <div className={styles.delete}>
            <DeleteProduct cid={product.collectionId} pid={product.id} status={disable} />
          </div>
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
        <div className="ratingsCard">{!loading && <RatingsCounter rating={rating} />}</div>
      </div>
    </div>
  );
}
