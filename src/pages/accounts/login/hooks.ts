import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { login } from './redux/loginSlice';
import 'react-toastify/dist/ReactToastify.css';

export const useLogin = () => {
  const isLoggedIn = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogin = (user: { email: string; password: string }) => {
    const data = {
      email: user.email,
      password: user.password,
    };
    if (!isValidEmail(data.email)) {
      toast.error('Please enter valid email');
    } else if (!isStrongPassword(data.password)) {
      toast.error(
        'Password should be at least 5 characters long and contain uppercase and lowercase'
      );
    } else {
      dispatch(login(data));
    }
  };

  return {
    isLoggedIn,
    handleLogin,
  };
};

export function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (pattern.test(email)) {
    return true;
  } else {
    return false;
  }
}
export function isStrongPassword(password: string): boolean {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  return pattern.test(password);
}
export { login };
