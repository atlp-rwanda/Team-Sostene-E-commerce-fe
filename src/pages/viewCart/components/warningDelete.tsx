import React, { useState } from 'react';
import styles from './warningDelete.module.scss';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/constants';
import { useAppSelector } from '../../../redux/hooks';
import { toast } from 'react-toastify';

interface Props {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetCart?: () => void;
}

export default function WarningDelete(props: Props) {
  const { setIsPopupOpen, handleGetCart } = props;
  const [error, setError] = useState<Error | null>(null);
  const [simpleLoading, setSimpleLoading] = useState(false);
  const token = useAppSelector((state) => state.token.value);

  const handleClearCart = async () => {
    setSimpleLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`${BACKEND_URL}/cart/clear`, { headers });
      setSimpleLoading(false);
      handleGetCart ? handleGetCart() : null;
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 3000);
    } catch (error) {
      setSimpleLoading(false);
      setError(error as Error);
    }
  };

  if (error) {
    toast(error.message);
  }

  return (
    <div className={styles.warningDelete}>
      <div className="explanation">
        <div className="title">Are you sure, you want to clear your cart Products?</div>
        <div className="details">
          Please note that this action is irreversible. Deleting your cart will empty it completely,
          and you will need to start your purchase process from scratch.
        </div>
      </div>
      <div className="actionsBox">
        <button className="btnx cancel" onClick={() => setIsPopupOpen(false)}>
          Cancel
        </button>
        <button className="btnx clear" onClick={handleClearCart}>
          {simpleLoading ? 'Loading...' : 'Clear'}
        </button>
      </div>
    </div>
  );
}
