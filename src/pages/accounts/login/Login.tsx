<<<<<<< HEAD
/* eslint-disable react-hooks/exhaustive-deps */
import './login.module.scss';
import './style.scss';
import { useLogin } from './hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import GoogleBtn from '../../../components/googleLogin/button';
import * as verify from '../../../helpers/auth';

function Login() {
  const { handleLogin, isLoggedIn } = useLogin();
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const formData = new FormData(formRef.current!);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    handleLogin({ email, password });
  };
  if (isLoggedIn.token === 'Code has been sent to your email') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const formData = new FormData(formRef.current!);
    navigate('/accounts/authenticate', { state: { email: formData.get('email') } });
  } else if (isLoggedIn.token !== '') {
    navigate('/');
  }
  if (isLoggedIn.error !== '') {
    toast.error(isLoggedIn.error);
  }
  useEffect(() => {
    if (verify.isLoggedIn()) {
      navigate('/');
    }
  }, []);
  return (
    <>
      {!verify.isLoggedIn() && (
        <div className="container">
          <form ref={formRef} className="form-body" data-testid="Login">
            <div>
              <h1>LOGIN</h1>
            </div>
            <div>
              <input
                name="email"
                className="input-field"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <input
                name="password"
                className="input-field"
                type="password"
                placeholder="Password"
              />
            </div>
            <div id="btn-section">
              <button onClick={handleSubmit}>{isLoggedIn.loading ? 'Loading' : 'Login'}</button>
              <Link to="/accounts/reset-password">
                <p className="forgot-pass-link">Forgot password</p>
              </Link>
              <GoogleBtn width="300" />
              <h3 className="signup-tag">
                Does not have an account? <Link to="/accounts/signup">Signup</Link>
              </h3>
            </div>
          </form>
          <div></div>
          {/* <ToastContainer /> */}
        </div>
      )}
    </>
  );
}

export default Login;
=======
import './login.module.scss';
import './style.scss';
import { useLogin } from './hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import GoogleBtn from '../../../components/googleLogin/button';

function Login() {
  const { handleLogin, isLoggedIn } = useLogin();
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const formData = new FormData(formRef.current!);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    handleLogin({ email, password });
  };
  if (isLoggedIn.token === 'Code has been sent to your email') {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const formData = new FormData(formRef.current!);
    navigate('/accounts/authenticate', { state: { email: formData.get('email') } });
  } else if (isLoggedIn.token !== '') {
    window.location.href = '/';
  }
  if (isLoggedIn.error !== '') {
    toast.error(isLoggedIn.error);
  }
  return (
    <div className="container">
      <form ref={formRef} className="form-body" data-testid="Login">
        <div>
          <h1>LOGIN</h1>
        </div>
        <div>
          <input name="email" className="input-field" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <input name="password" className="input-field" type="password" placeholder="Password" />
        </div>
        <div id="btn-section">
          <button onClick={handleSubmit}>{isLoggedIn.loading ? 'Loading' : 'Login'}</button>
          <Link to="/accounts/reset-password">
            <p className="forgot-pass-link">Forgot Password</p>
          </Link>
          <GoogleBtn width="300" />
          <h3 className="signup-tag">
            Does not have an account? <Link to="/accounts/signup">Signup</Link>
          </h3>
        </div>
      </form>
      <div></div>
      <ToastContainer />
    </div>
  );
}

export default Login;
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
