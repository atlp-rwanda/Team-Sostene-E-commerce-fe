import { Link, Route, Routes } from 'react-router-dom';
import styles from './dashboard.module.scss';
import CreateCollection, { Collections } from './create collection/CreateCollection';
import { useCollections } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import routes from '../../utils/routes';
import AddProductToCollection from './addProductToCollection/addProductToCollection';
import OutsideClickHandler from 'react-outside-click-handler';
import { setCollectionsList } from './collections.slice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center flex-row">
      <div className="w-11/12 tablet:w-4/5 p-2 pt-10">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/create-collection" element={<CreateCollection />}></Route>
          <Route path="/addProduct/:cid/:cname" element={<AddProductToCollection />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export function Main() {
  const { loading, collections } = useCollections();
  const [ShowCollectionsList, setShowCollectionsList] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loading === false && dispatch(setCollectionsList([...collections]));
  }, [collections, loading]);

  const { collectionsList } = useAppSelector((state) => state.collectionsReducers);

  const handleAddProductToCollection = () => {
    collectionsList?.length > 0
      ? setShowCollectionsList(true)
      : toast.error('No collection available! Create a collection first!');
  };

  return (
    <div className={styles.dashboardHeader}>
      <div className="flex flex-wrap gap-1 pb-10 border-b border-b-translucent justify-evenly">
        <Link
          to="/dashboard/create-collection"
          className="w-32 h-32 flex flex-col cursor-pointer rounded-md border border-translucent hover:bg-translucent transition items-center justify-center p-5 text-center bg-white"
        >
          <i className="fa fa-plus-circle text-3xl text-orange" aria-hidden="true"></i>
          <p>Create Collection</p>
        </Link>
        <div
          className="w-32 h-32 flex flex-col cursor-pointer rounded-md border border-translucent hover:bg-translucent transition items-center justify-center p-5 text-center bg-white"
          onClick={handleAddProductToCollection}
          role="addProductsCollection"
        >
          <i className="fa fa-plus text-3xl text-orange" aria-hidden="true"></i>
          <p className="text-md">Add product</p>
        </div>
      </div>
      {ShowCollectionsList && (
        <OutsideClickHandler onOutsideClick={() => setShowCollectionsList(false)}>
          <div className="collectionsWrapper">
            <div className="collectionsList">
              <span
                className="closepopUp"
                role="closePopup"
                onClick={() => setShowCollectionsList(false)}
              >
                <img src="/svgs/closeBtn.svg" alt="Icon" className="icon" />
              </span>
              <div className="choose_collectios my-3">Choose a collection</div>
              {loading && (
                <p className="w-full flex items-center p-2 text-center justify-center">
                  <i className="fa fa-circle-o-notch fa-spin text-orange" aria-hidden="true"></i>
                </p>
              )}
              {collectionsList?.length > 0 &&
                collectionsList.map((singleCollection, index) => {
                  return (
                    <Link
                      to={routes.addProduct(singleCollection.id, singleCollection.name)}
                      key={index}
                      className="singleCollection"
                    >
                      - {singleCollection.name}
                    </Link>
                  );
                })}
            </div>
          </div>
        </OutsideClickHandler>
      )}
      <Collections />
    </div>
  );
}
