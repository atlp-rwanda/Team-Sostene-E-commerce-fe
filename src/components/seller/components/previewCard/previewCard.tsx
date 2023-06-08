import Carouselslider from '../../../../designComponents/carouselslider/carouselslider';
import styles from './previewCard.module.scss';

interface cardProp {
  card: {
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

export default function PreviewCard(props: cardProp) {
  const { card } = props;

  return (
    <div className={styles.previewCard} data-testid="previewCardId">
      <div className="contentPreview">
        <div className="actionBts">
          <img src="./svgs/editBtn.svg" alt="Icon" className="icon iconEdit" />
          <img src="./svgs/deleteBtn.svg" alt="Icon" className="icon iconDelete" />
        </div>
        <div className="carouselBox" data-testid="carouselId">
          <Carouselslider images={card.productImages} />
        </div>
        <div className="simpleDetails">
          <div className="pricing">
            <div className="h6">
              <span className="h5">New Price: </span>${card.price}
            </div>
            <div className="h6">
              <span className="h5">Discount: </span>$30%
            </div>
          </div>
          <div className="h3">{card.name}</div>
          {card.ratings && (
            <div className="h6">
              <span className="h5">Ratings: </span>${card.ratings}
            </div>
          )}
        </div>
        {card.details && (
          <div className="details">
            <div className="detailHead">Details: </div>
            <div className="body">{card.details} </div>
          </div>
        )}
      </div>
    </div>
  );
}
