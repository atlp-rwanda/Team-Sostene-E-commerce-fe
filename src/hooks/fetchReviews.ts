import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const FetchReviews = async (setReviews: Function, productId: any) => {
    try {
      const response = await axios.get(`${BACKEND_URL}reviews/${productId}`);
      console.log('fetched revvvviiwwes', response.data.data);
      setReviews(response.data.data);
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };
export default FetchReviews;