import styles from './empty.module.scss';
import crate from '../../../public/images/empty page.png';
import React from 'react';

interface emptyData {
  store: string;
  data: string;
  reset: () => void;
}

const Empty: React.FC<emptyData> = (props) => {
  const { store, data, reset } = props;
  return (
    <div className={styles.empty_state}>
      <img src={crate} alt="" />
      <h3 className="">No {data}</h3>
      <p>
        There have been no {data} in this {store} yet
      </p>
      <button onClick={reset}>Add {data}</button>
    </div>
  );
};

export default Empty;
