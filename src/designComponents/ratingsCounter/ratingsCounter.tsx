import styles from './ratingsCounter.module.scss';

const starIcon = '/svgs/star.svg';
const starIconRated = '/svgs/starRated.svg';

interface rating {
  rating: number;
}
export default function RatingsCounter(props: rating) {
  const { rating } = props;
  return (
    <div className={styles.ratingsCounter}>
      {rating >= 0 && (
        <div className="ratings">
          {rating === 0 && (
            <div className="ratingBox">
              {[1, 2, 3, 4, 5].map((rating: number) => {
                return <img src={starIcon} key={rating} alt="Star" className="startImage" />;
              })}
            </div>
          )}
          {rating === 1 && (
            <div className="ratingBox">
              <img src={starIconRated} alt="Star" className="startImage" />
              {[1, 2, 3, 4].map((rating: number) => {
                return <img src={starIcon} key={rating} alt="Star" className="startImage" />;
              })}
            </div>
          )}
          {rating === 2 && (
            <div className="ratingBox">
              {[1, 2].map((rating: number) => {
                return <img src={starIconRated} key={rating} alt="Star" className="startImage" />;
              })}
              {[1, 2, 3].map((rating: number) => {
                return <img src={starIcon} key={rating} alt="Star" className="startImage" />;
              })}
            </div>
          )}
          {rating === 3 && (
            <div className="ratingBox">
              {[1, 2, 3].map((rating: number) => {
                return <img src={starIconRated} key={rating} alt="Star" className="startImage" />;
              })}
              {[1, 2].map((rating: number) => {
                return <img src={starIcon} key={rating} alt="Star" className="startImage" />;
              })}
            </div>
          )}
          {rating === 4 && (
            <div className="ratingBox">
              {[1, 2, 3, 4].map((rating: number) => {
                return <img src={starIconRated} key={rating} alt="Star" className="startImage" />;
              })}
              <img src={starIcon} alt="Star" className="startImage" />
            </div>
          )}
          {rating >= 5 && (
            <div className="ratingBox">
              {[1, 2, 3, 4, 5].map((rating: number) => {
                return <img src={starIconRated} key={rating} alt="Star" className="startImage" />;
              })}
            </div>
          )}
          <div className="ratingNumber" data-testid="rateNumber">
            ({rating})
          </div>
        </div>
      )}
    </div>
  );
}
