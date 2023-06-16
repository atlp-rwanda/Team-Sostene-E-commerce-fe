import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../cart/hooks';
import { ProtectedComponent } from '../roles/Protected';

interface CardData {
  image: string;
  name: string;
  id: string;
  price: number;
}

export default function ProductCard({ image, name, id, price }: CardData) {
  const { handleAddToCart } = useAddToCart();
  return (
    <div className="p-2 w-60 mx-5 flex items-center  flex-col">
      <Link
        to={`/product/${id}`}
        style={{ backgroundImage: `url(${image})` }}
        className="  h-48 w-full object-cover bg-cover bg-center rounded-md border border-translucent"
      ></Link>
      <div className="p-2 text-md text-black text-left w-full">{name}</div>
      <div className="px-2 text-md text-orange font-semibold text-left w-full">${price}</div>
      <div className="flex flex-row items-center justify-between w-full px-2">
        <Rating id={id} />
        <div>
          <ProtectedComponent
            replace={
              <Link to="/accounts/login" className="p-2 rounded-sm bg-orange text-xs">
                Add to cart
              </Link>
            }
          >
            <button
              onClick={() => handleAddToCart(id)}
              className="p-2 rounded-sm bg-orange text-xs"
            >
              Add to cart
            </button>
          </ProtectedComponent>
        </div>
      </div>
    </div>
  );
}

export const RatingStars = ({ rating }: { rating: number }) => {
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;

    for (let i = 0; i < totalStars; i++) {
      if (i < rating) {
        stars.push(<i key={i} data-testid="stars" className="fa fa-star" aria-hidden="true"></i>);
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        stars.push(
          <i key={i} data-testid="stars" className="fa fa-star-half-o" aria-hidden="true"></i>
        );
      } else {
        stars.push(<i key={i} data-testid="stars" className="fa fa-star-o" aria-hidden="true"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="text-orange flex flex-row items-center justify-between w-1/3 ">
      <div className="flex flex-row items-center text-xs phone:text-sm pt-1">{renderStars()}</div>
      <p className="text-black font-semibold p-1">({Math.floor(rating)})</p>
    </div>
  );
};

export const Rating = ({ id }: { id: string }) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}reviews/rating/${id}`);
        setRating(response.data.rating);
      } catch (error) {
        setRating(0);
      }
    };

    fetchRating();
  }, [id]);

  if (rating === null) {
    return <RatingStars rating={0} />;
  }

  return <RatingStars rating={rating} />;
};
