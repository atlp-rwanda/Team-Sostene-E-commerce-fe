<<<<<<< HEAD
import React, { ChangeEvent } from 'react';
import styles from './Reusable.module.scss';
import loader from '/svgs/spinner.svg';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  color?: string;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading_state?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { size, color, text, onClick, type, loading_state, ...restProps } = props;
  const buttonSize = styles[`size--${size || 'default'}`];
  const buttonColor = styles[`color--${color || 'primary'}`];

  return (
    <div className={styles.reusableBtn}>
      <button
        className={`${styles.btn} ${buttonSize} ${buttonColor}`}
        onClick={onClick}
        type={type || 'submit'}
        disabled={loading_state}
        {...restProps}
      >
        {loading_state ? (
          <img src={loader} style={{ height: '25px', margin: 'auto' }} alt="loader" />
        ) : (
          text
        )}
      </button>
    </div>
  );
};

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  textId: string;
  label: string;
  value?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  mode?: 'email' | 'numeric' | 'decimal'; // you may add more here
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = (props) => {
  const { type, label, value, onChange, name, id, textId, placeholder, ...restProps } = props;

  return (
    <div className={`${styles.inputBox}`}>
      <input
        type={type || 'text'}
        name={name || 'field'}
        id={name || id || 'field'}
        value={value}
        data-testid={textId}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />
      <label>{label}</label>
    </div>
  );
};

interface ErrorBoxProps {
  message: string;
}

export const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
  const { message } = props;

  return (
    <div className={`${styles.errors}`}>
      <div className={`${styles.errorMessage}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export const SpinnerLoading = () => {
  return (
    <div className="w-full p-2 text-center">
      <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
    </div>
  );
};

export const EmptyCart = () => {
  return (
    <div className="h-full w-full p-10 flex flex-col justify-center items-center">
      <img
        className="w-[20%] despktop:w-[25%] laptop:w-[30%] tablet:w-[50%] phone:w-[60%] sm:w-full"
        src="/images/empty_cart.png"
        alt="empty cart"
      />
      <p className="py-10 text-xl desktop:text-2xl desktop:py-12 font-normal text-center sm:text-lg">
        You have no products in your cart
      </p>
      <Link to="/" className="w-96 desktop:w-[30%] sm:w-56">
        <Button text="Go to shop" size="full" data-testid="go-to-shop" />
      </Link>
    </div>
  );
};
=======
import React, { ChangeEvent } from 'react';
import styles from './Reusable.module.scss';
import loader from '/svgs/spinner.svg';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  color?: string;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading_state?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { size, color, text, onClick, type, loading_state, ...restProps } = props;
  const buttonSize = styles[`size--${size || 'default'}`];
  const buttonColor = styles[`color--${color || 'primary'}`];

  return (
    <button
      className={`${styles.btn} ${buttonSize} ${buttonColor}`}
      onClick={onClick}
      type={type || 'submit'}
      disabled={loading_state}
      {...restProps}
    >
      {loading_state ? (
        <img src={loader} style={{ height: '25px', margin: 'auto' }} alt="loader" />
      ) : (
        text
      )}
    </button>
  );
};

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  textId: string;
  label: string;
  value?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  mode?: 'email' | 'numeric' | 'decimal'; // you may add more here
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = (props) => {
  const { type, label, value, onChange, name, id, textId, placeholder, ...restProps } = props;

  return (
    <div className={`${styles.inputBox}`}>
      <input
        type={type || 'text'}
        name={name || 'field'}
        id={name || id || 'field'}
        value={value}
        data-testid={textId}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />
      <label>{label}</label>
    </div>
  );
};

interface ErrorBoxProps {
  message: string;
}

export const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
  const { message } = props;

  return (
    <div className={`${styles.errors}`}>
      <div className={`${styles.errorMessage}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export const SpinnerLoading = () => {
  return (
    <div className="w-full p-2 text-center">
      <i className="fa fa-spinner fa-spin text-orange" aria-hidden="true"></i>
    </div>
  );
};

export const EmptyCart = () => {
  return (
    <div className="h-full w-full p-10 flex flex-col justify-center items-center">
      <img
        className="w-[20%] despktop:w-[25%] laptop:w-[30%] tablet:w-[50%] phone:w-[60%] sm:w-full"
        src="/images/empty_cart.png"
        alt="empty cart"
      />
      <p className="py-10 text-xl desktop:text-2xl desktop:py-12 font-normal text-center sm:text-lg">
        You have no products in your cart
      </p>
      <Link to="/" className="w-96 desktop:w-[30%] sm:w-56">
        <Button text="Go to shop" size="full" data-testid="go-to-shop" />
      </Link>
    </div>
  );
};
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
