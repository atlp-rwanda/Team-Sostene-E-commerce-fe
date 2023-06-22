import React, { ChangeEvent } from 'react';
import styles from './Reusable.module.scss';
import loader from '/svgs/spinner.svg';

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
