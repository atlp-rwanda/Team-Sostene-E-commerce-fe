import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  size: string;
  color: string;
  value: string;
  onclick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { size, color, value, onclick, type } = props;
  const buttonSize = styles[`size--${size || 'default'}`];
  const buttonColor = styles[`color--${color || 'default'}`];
  return (
    <button className={`${styles.btn} ${buttonSize} ${buttonColor}`} onClick={onclick} type={type}>
      {value}
    </button>
  );
};

export default Button;
