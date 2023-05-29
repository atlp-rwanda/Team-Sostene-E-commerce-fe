import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { tfaVerify } from './redux/tfaSlice';
import { useLocation } from 'react-router-dom';

export const useTwoFactor = () => {
  const location = useLocation();
  const data = location.state;
  return data.email;
};

export const useVerifyEmail = () => {
  const isVerified = useAppSelector((state) => state.twoFactor);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = (email: string, code?: string) => {
    const data = {
      email,
      code: code || '',
    };
    dispatch(tfaVerify(data)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    });
  };
  return {
    handleSubmit,
    isVerified,
  };
};
