import { useEffect, useState } from 'react';
import { useCollections, useCreateCollection } from '../../../hooks/hooks';
import styles from './createCollection.module.scss';
import { useNavigate } from 'react-router-dom';
import PopUpMaker from '../../../designComponents/popupMaker/popUpMaker';
import DeleteAcollection from '../deleteCollection/deleteCollection';
import { useAppSelector } from '../../../redux/hooks';
import { setCollectionsList } from '../collections.slice';
import { useDispatch } from 'react-redux';

export default function CreateCollection() {
  const { handleCreate, error, loading } = useCreateCollection();
  const [collectionNameCreate, setCollectionNameCreate] = useState('');
  const [errorCreate, setErrorCreate] = useState('');
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (collectionNameCreate.trim().length !== 0) {
      handleCreate(collectionNameCreate.trim());
      setCollectionNameCreate('');
    } else {
      setErrorCreate('Invalid Valid Collection name');
    }
  };

  return (
    <div className="w-full h-96 flex items-start pt-20 justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-fade border-2 border-fade shadow-sm rounded px-8 pt-6 pb-8 mb-4"
        >
          {error && <p className=" text-red text-sm font-semibold">{error}</p>}
          {errorCreate !== '' && <p className=" text-red text-sm font-semibold">{errorCreate}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Enter collection name
            </label>
            <input
              value={collectionNameCreate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              onChange={(e) => setCollectionNameCreate(e.target.value)}
              type="text"
              role="collectionInput"
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-orange hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {loading ? (
                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Collections() {
  const { loading, error, collections } = useCollections();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteCollectionId, setDeleteCollectionId] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [deleteWarning, setDeleteWarning] = useState(false);

  useEffect(() => {
    loading === false && dispatch(setCollectionsList([...collections]));
  }, [collections, loading]);

  const { collectionsList } = useAppSelector((state) => state.collectionsReducers);

  const handleDeleteCollection = async (cid: string, cname: string) => {
    setDeleteCollectionId(cid);
    setCollectionName(cname);
    setDeleteWarning(true);
  };

  return (
    <div className="w-full border-2 p-2 mt-10 border-fade" id={styles.collectionBox}>
      <div className="w-full text-2xl">Your collections</div>
      <div className="w-full p-5 flex flex-wrap gap-2 grid-cols-2">
        {deleteWarning && (
          <PopUpMaker
            Component={DeleteAcollection}
            setIsPopupOpen={setDeleteWarning}
            deleteCollectionId={deleteCollectionId}
            collectionName={collectionName}
          />
        )}
        {loading ? (
          <p className="w-full flex items-center p-2 text-center justify-center">
            <i className="fa fa-circle-o-notch fa-spin text-orange" aria-hidden="true"></i>
          </p>
        ) : error != '' ? (
          <p>{error}</p>
        ) : collectionsList.length > 0 ? (
          collectionsList.map((collection, index) => (
            <button
              key={index}
              className="p-1 px-4 cursor-pointer rounded my-2 w-auto items-center text-center bg-orange text-white collectionBtn"
            >
              <span
                className="name"
                role="navigateToCollection"
                onClick={() =>
                  navigate(`/sellerItems?cid=${collection.id}&cname=${collection.name}`)
                }
              >
                {collection.name}
              </span>
              <span
                className="delete"
                role="deleteConnection"
                onClick={() => handleDeleteCollection(collection.id, collection.name)}
              >
                <img src="/svgs/closeBtn.svg" alt="Icon" className="icon" />
              </span>
            </button>
          ))
        ) : (
          <div className="p-2">No collections created yet.</div>
        )}
      </div>
    </div>
  );
}
