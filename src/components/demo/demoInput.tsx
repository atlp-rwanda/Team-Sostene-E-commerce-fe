import React from 'react';
import styles from './input.module.scss';

interface InputProps {
  size: string;
}
const DemoInput: React.FC<InputProps> = ({ size }) => {
  const inputClassName = `${styles.width} ${
    size === 'long' ? styles.widthLong : styles.widthShort
  }`;
  return (
    <div>
      <input placeholder="email" className={inputClassName} type="text" />
    </div>
  );
};

export default DemoInput;
