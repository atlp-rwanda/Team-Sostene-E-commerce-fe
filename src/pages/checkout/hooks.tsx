import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { checkout } from './redux/checkoutSlice';

export const useCheckout = () => {
  const token = useAppSelector((state) => state.token.value) || '';
  const isSuccess = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    streetAddress: string;
    country: string;
    city: string;
    postalCode: string;
  }) => {
    const response = await dispatch(
      checkout({
        token,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        streetAddress: values.streetAddress,
        country: values.country,
        city: values.city,
        postalCode: values.postalCode,
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      const order = response.payload;
      navigate(`/payment?rid=${order.id}`);
    }
  };
  return {
    isSuccess,
    handleSubmit,
  };
};
