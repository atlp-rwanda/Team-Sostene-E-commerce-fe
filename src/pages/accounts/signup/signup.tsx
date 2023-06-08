/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Input from './components/input/input';
import styles from './signup.module.scss';
import { SignupData, signup } from '../../../redux/slices/signup';
import { useAppDispatch } from '../../../redux/hooks';
import loader from '../../../assets/spinner.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import routes from '../../../utils/routes';

function Signup() {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: any) => state.signup.loading);
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const validate = useRef<HTMLDivElement | null>(null);
  const errorDiv = validate.current;

  const [formData, setFormData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    if (formData.username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      if (errorDiv) {
        errorDiv.textContent = 'Username must be at least 3 characters';
      }
      return;
    }

    if (formData.email === '') {
      setEmailError('Email is required.');
      if (errorDiv) {
        errorDiv.textContent = 'Email is required.';
      }
      return;
    }

    if (formData.password === '') {
      setPasswordError('Password is required.');
      if (errorDiv) {
        errorDiv.textContent = 'Password is required.';
      }
      return;
    }
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      setPasswordError(
        'Password must be at least 8 characters long, include at least one uppercase letter, and at least one numeric digit.'
      );
      if (errorDiv) {
        errorDiv.textContent =
          'Password must be at least 8 characters long, include at least one uppercase letter, and at least one numeric digit.';
      }
      return;
    }
    dispatch(signup(formData))
      .unwrap()
      .then((res) => {
        res;
      })
      .catch((error) => error);
  };

  return (
    <div className={styles.container}>
      <h1>Create an account</h1>
      <h3>Enter your details below</h3>
      <form onSubmit={handleSubmit} data-testid="signup">
        <div ref={validate} className={styles.error}></div>

        <Input
          name={'username'}
          textId="name"
          placeholder={'Name'}
          value={formData.username}
          onChange={handleInputChange}
          className={usernameError ? 'error' : ''}
          size={'long'}
          type={'text'}
        />
        <Input
          name={'email'}
          textId="email"
          placeholder={'Email or Phone Number'}
          value={formData.email}
          onChange={handleInputChange}
          className={emailError ? 'error' : ''}
          size={'long'}
          type={'text'}
        />
        <Input
          name={'password'}
          textId="pass"
          placeholder={'Password'}
          value={formData.password}
          onChange={handleInputChange}
          className={passwordError ? 'error' : ''}
          size={'long'}
          type={'password'}
        />

        <div className="btn_wrapper">
          <button
            className="btnSignup"
            data-testid="signup-form"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <img src={loader} style={{ height: '25px' }} alt="loader" />
            ) : (
              'Create an account'
            )}
          </button>
        </div>
        <h2>
          Already have an account? <Link to={routes.login}>Login</Link>
        </h2>
      </form>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
