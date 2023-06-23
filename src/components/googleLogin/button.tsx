import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { decodeToken, logInWithGoogle } from './hooks/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

interface GoogleBtnProps {
  width: string;
}
export interface GoogleResponse {
  clientId: string;
  credential: string;
  select_by: string;
}
export const googleSuccess = async (response: GoogleResponse): Promise<void> => {
  const res = decodeToken(response);
  await logInWithGoogle(res.email);
  window.location.href = '/';
};
export const googleFailure = (): void => {
  toast.error('Login was unsuccessful, Try Again !!');
};
const GoogleBtn: React.FC<GoogleBtnProps> = ({ width }) => {
  return (
    <GoogleOAuthProvider clientId="395839531143-fr3bqraq8qb4th9t6h3ctnnje00piafc.apps.googleusercontent.com">
      <Btn googleSuccess={googleSuccess} googleFailure={googleFailure} width={width} />
    </GoogleOAuthProvider>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Btn = (props: { googleSuccess: any; googleFailure: () => void; width: string }) => {
  const { googleSuccess, googleFailure, width } = props;
  return (
    <div className="ok" data-testid="google-login">
      <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} useOneTap width={width} />
    </div>
  );
};

export default GoogleBtn;
