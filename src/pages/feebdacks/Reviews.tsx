import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { formatDate } from '../../utils/dateFormatting';
import fetchReviews from '../../hooks/fetchReviews';
import addReview from '../../hooks/reviewData';

interface ReviewItem {
  createdAt: string;
  feedback: string;
  id: string;
  productId: string;
  rating: string;
  updatedAt: string;
  userId: string;
  user: any;
}

interface ReviewsProps {
  productId?: string;
}
export const handleRateChange = (value: number, reviewObj: any, setReviewObj: any) => {
  setReviewObj({ ...reviewObj, rating: value.toString() });
};
const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const [reviewForm, setReviewForm] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewObj, setReviewObj] = useState({
    feedback: 'Your review',
    rating: '',
  });

  const token = useAppSelector((state) => state.token.value);

  useEffect(() => {
    fetchReviews(setReviews, productId);
  }, []);

  const handleRateChange = (value: number) => {
    setReviewObj({ ...reviewObj, rating: value.toString() });
  };

  return (
    <div className="bg-translucent2 py-8 flex flex-col gap-4 items-center p-4">
      <h1 className="text-dark font-bold">Top Reviews</h1>
      {reviews &&
        reviews.map((item: ReviewItem) => (
          <div className="flex gap-4 items-center w-full bg-translucent rounded-2xl p-4" key={item.createdAt}>
            <FontAwesomeIcon icon={faUser} className="h-4 rounded-3xl border p-2"/>
            <div className="bg-white flex flex-col gap-1 w-full rounded-2xl px-4 py-2">
              <div className="flex gap-2 items-center">
                <div className='text-bold font-medium'>{item.user.user_profile_datum?.names}</div>                
                <p className="text-xs text-gray">{formatDate(item.createdAt)}</p>
              </div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    color={index < parseInt(item.rating) ? 'orange' : 'black'}
                    className="text-xs"
                  />
                ))}
              </div>
              <h2 className="w-full text-md tracking-wide pt-3">{item.feedback}</h2>
            </div>
          </div>
        ))}
      <div className="bg-white w-full flex flex-col gap-4 items-start p-4">
        <button
          className="bg-orange px-8 py-3 rounded-xl"
          onClick={() => setReviewForm(!reviewForm)}
        >
          Add review
        </button>
        {reviewForm && (
          <form className="bg-translucent w-full flex flex-col justify-center items-center px-6 py-3 rounded-xl gap-2">
            <h1 className=''>Rate Product (Rating - {reviewObj.rating})</h1>
            {/* < */}
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  color={index < parseInt(reviewObj.rating) ? 'orange' : 'black'}
                  onClick={() => handleRateChange(index + 1)}
                  data-testid="rating-star"
                />
              ))}
            </div>
            <h1>Rate Products</h1>
            <textarea
              value={reviewObj.feedback}
              data-testid='add-revs'
              onChange={(e) => {
                setReviewObj({ ...reviewObj, feedback: e.target.value });
              }}
              rows={2}
              className="w-full px-6 py-4 tablet:w-[90%] my-2 rounded-lg ring-0 outline-none focus:ring-0 text-gray text-sm"
            >
        
            </textarea>
            <button
              className="bg-orange px-8 py-3 rounded-xl"
              onClick={(e) => {
                e.preventDefault();
                addReview(e, productId, reviewObj,setReviews, token);
              }}
            >
              Add review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reviews;
