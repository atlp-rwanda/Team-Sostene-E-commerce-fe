import jwtDecode, { JwtPayload } from 'jwt-decode';
import { setToken } from '../../../redux/slices/tokenSlice';
import axios from 'axios';
import store from '../../../redux/store';
import { GoogleResponse } from '../button';

interface DecodedToken extends JwtPayload {
  email: string;
}

export function decodeToken(response: GoogleResponse) {
  const decodedToken: DecodedToken = jwtDecode(response.credential);
  return decodedToken;
}

export async function logInWithGoogle(email: string) {
  const body = {
    user: { email },
  };
  const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/google/success`, body, {
    headers: { 'Content-Type': 'application/json' },
  });
  store.dispatch(setToken(res.data.token));
  localStorage.setItem('authenticationMethod', 'google');
}
