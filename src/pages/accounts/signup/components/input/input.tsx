import React from 'react';
import styles from './input.module.scss';

interface InputProps {
  size: string;
  textId: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}
const Input: React.FC<InputProps> = ({
  size,
  textId,
  placeholder,
  type,
  name,
  value,
  onChange,
}) => {
  const inputClassName = `${styles.width} ${
    size === 'long' ? styles.widthLong : styles.widthShort
  }`;

  return (
    <input
      name={name}
      data-testid={textId}
      type={type}
      placeholder={placeholder}
      value={value}
      className={`${inputClassName} ${styles.all}`}
      onChange={onChange}
    />
  );
};

export default Input;
