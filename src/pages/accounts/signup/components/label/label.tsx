import React from 'react';
import styles from './label.module.scss';

interface LabelProps {
  value: string;
  size: string;
  color: string;
}

const Label: React.FC<LabelProps> = ({ value, size, color }) => {
  const labelSize = styles[`size--${size || 'small'}`];
  const labelColor = styles[`color--${color || 'primary'}`];

  return <p className={`${labelSize} ${labelColor}`}>{value}</p>;
};

export default Label;
