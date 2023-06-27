import { toast } from 'react-toastify';
import { useProductDelete } from './hooks/erase';
import { useEffect, useState } from 'react';
import { Button } from '../../components/reusables/Reusable';
import Modal from 'react-modal';
import styles from './main.module.scss';
import React from 'react';
import { ButtonLoader } from '../../components/Loaders/Loaders';

interface DeleteProps {
  cid: string;
  pid: string;
  status: () => void;
}
const DeleteProduct: React.FC<DeleteProps> = (props) => {
  const { cid, pid, status } = props;
  const { error, loading, deleteProduct } = useProductDelete(); // add also response ,loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionID, setcollectionID] = useState('');
  const [productId, setproductId] = useState('');

  const openModal = (cid: string, pid: string) => {
    setcollectionID(cid);
    setproductId(pid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (cid: string, pid: string) => {
    closeModal();
    await deleteProduct(cid, pid);
  };
  useEffect(() => {
    if (loading) {
      status();
    }
  }, [loading, error, status]);
  if (loading) {
    return (
      <div className={styles.loading}>
        <ButtonLoader />
      </div>
    );
  } else if (error) {
    toast.error(error.response.data.message);
  }
  return (
    <div className="test">
      <div className="main_delete">
        <img
          src="./svgs/delete.svg"
          alt="Delete icon"
          className="delete_icon"
          onClick={() => {
            openModal(cid, pid);
          }}
          data-testid="delete_image"
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className={`${styles.modal} modal_div`}
      >
        <h2 className="text">Confirm Delete</h2>
        <p className="text">Are you sure you want to delete this product?</p>
        <div className={styles.btn_container}>
          <Button
            size="small"
            onClick={() => {
              handleDelete(collectionID, productId);
            }}
            text={'Delete'}
            className={`${styles.delete} ${styles.button} deleteParent`}
          />
          <Button
            size="small"
            onClick={closeModal}
            text={'Cancel'}
            className={`${styles.cancel} ${styles.button} cancelParent`}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
