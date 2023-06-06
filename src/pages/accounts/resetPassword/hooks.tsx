import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { forgotPassword, resetPassword } from './redux/resetPasswordSlice';

export const useForgotPassword = () => {
  const isSent = useAppSelector((state) => state.forgotPassword);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: { email: string }) => {
    const response = await dispatch(forgotPassword({ email: values.email }));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/accounts/reset-password/sent');
    }
  };
  return {
    isSent,
    handleSubmit,
  };
};

export const useResetPassword = () => {
  const isReset = useAppSelector((state) => state.resetPassword);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: { password: string }, token: string) => {
    const response = await dispatch(resetPassword({ password: values.password, token: token }));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/accounts/reset-password/success');
    }
  };
  return {
    isReset,
    handleSubmit,
  };
};
