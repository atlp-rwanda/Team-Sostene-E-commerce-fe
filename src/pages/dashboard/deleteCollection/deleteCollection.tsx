import styles from './deleteCollection.module.scss';
import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../utils/constants';
import { useAppSelector } from '../../../redux/hooks';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCollectionsList } from '../collections.slice';

interface PropsInterface {
  deleteCollectionId?: string;
  collectionName?: string;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteAcollection(props: PropsInterface) {
  const { setIsPopupOpen, deleteCollectionId, collectionName } = props;
  const [error, setError] = useState<Error | null>(null);
  const [simpleLoading, setSimpleLoading] = useState(false);
  const [data, setData] = useState();
  const { collectionsList } = useAppSelector((state) => state.collectionsReducers);

  const dispatch = useDispatch();

  const token = useAppSelector((state) => state.token.value);

  const handleClearCollection = async () => {
    const collectionRemain = collectionsList?.filter(
      (collection) => collection.id !== deleteCollectionId
    );
    setSimpleLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(`${BACKEND_URL}/products/${deleteCollectionId}/delete`, {
        headers,
      });
      setData(response.data);
      setSimpleLoading(false);
      dispatch(setCollectionsList([...collectionRemain]));
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 3000);
    } catch (error) {
      setSimpleLoading(false);
      setError(error as Error);
    }
  };

  return (
    <div className={styles.delete_collection}>
      {data ? toast.success(`Collection ${collectionName} has been deleted Successfully!`) : null}
      {error && <div className="message error">{error.message}</div>}
      <div className="explanation">
        <div className="title">Are you sure, you want to delete this collection?</div>
        <div className="details">
          Note that, This action can not be undone! Deleting your collection will erase all products
          added to this collection.
        </div>
      </div>
      <div className="actionsBox">
        <button className="btnx cancel" role="cancel" onClick={() => setIsPopupOpen(false)}>
          Cancel
        </button>
        <button className="btnx clear" role="deleteBtn" onClick={handleClearCollection}>
          {simpleLoading ? 'Loading...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
