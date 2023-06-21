import axios from 'axios';
import fetchReviews from './fetchReviews';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const AddReview = async (
  e: React.FormEvent,
  productId: any,
  reviewObj: object,
  setReviews: Function,
  token:any
) => {

  e.preventDefault();
  try {
    const response = await axios.post(`${BACKEND_URL}reviews/${productId}`, reviewObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const review = response.data.data;
    console.log(review);
    
    fetchReviews(setReviews, productId);
  } catch (error) {
    console.log('Error adding review:', error);
  }
};
export default AddReview;
