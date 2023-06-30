import React from 'react';
import styles from './popUpMaker.module.scss';
import OutsideClickHandler from 'react-outside-click-handler';

interface Props {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetCart?: () => void;
  deleteCollectionId?: string;
  collectionName?: string;
  card?: {
    productImages: { url: string }[];
    details?: string;
    id: string;
    category: string;
    ratings?: number;
    price: number;
    bonus: number;
    collectionId: string;
    createdAt?: string;
    expDate: string;
    expiredflag: boolean;
    name: string;
    quantity: number;
  };
}

interface PropsDetails extends Props {
  Component: React.ComponentType<Props>;
}

export default function PopUpMaker(props: PropsDetails) {
  const { Component, setIsPopupOpen } = props;
  return (
    <div className={styles.popUpMaker} data-testid="popUpMakerId">
      <div className="content" data-testid="testOutsideClickHandler">
        <OutsideClickHandler onOutsideClick={() => setIsPopupOpen(false)}>
          <div className="closeBtn" onClick={() => setIsPopupOpen(false)}>
            <img src="./svgs/closeBtn.svg" alt="Icon" className="icon" />
          </div>
          <Component {...props} />
        </OutsideClickHandler>
      </div>
    </div>
  );
}
